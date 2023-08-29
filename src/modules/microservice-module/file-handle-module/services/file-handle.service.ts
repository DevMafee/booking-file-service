import { Injectable, NotFoundException } from '@nestjs/common';
import { FileToPermanentDto } from '../dto/file-to-permanent.dto';
import { RpcCustomException } from '../../shared/exceptions/rpcCustomException';
import { CustomException } from '../../shared/exceptions/customException';
import { FileIsExistsDto } from '../dto/file-is-exists.dto';
import { join } from 'path';
import { existsSync, unlink } from 'fs';
import * as mv from 'mv';
import { RedisConnector } from '../../../../common/redis/connect';
import { FileRemoveDto } from '../dto/file-remove.dto';

@Injectable()
export class FileHandleService {
  async fileIsExists(data: FileIsExistsDto) {
    try {
      if (!existsSync(join(process.cwd(), '/files/' + data.fileName))) {
        const keyPattern = `fileUpload:*:${data.fileName}`;
        //create redis instance
        const redis = await RedisConnector.getInstance();
        const getAllKeys = await redis.keys(keyPattern);

        if (getAllKeys.length === 0) return false;

        if (!existsSync(join(process.cwd(), '/files/temp/' + data.fileName)))
          return false;
      }
      return true;
    } catch (error) {
      throw new CustomException(error);
    }
  }
  async permanentFileIsExists(data: FileIsExistsDto) {
    try {
      if (!existsSync(join(process.cwd(), '/files/' + data.fileName)))
        return false;
      return true;
    } catch (error) {
      throw new CustomException(error);
    }
  }
  async tempFileIsExists(data: FileIsExistsDto) {
    try {
      const keyPattern = `fileUpload:*:${data.fileName}`;
      //create redis instance
      const redis = await RedisConnector.getInstance();
      const getAllKeys = await redis.keys(keyPattern);

      if (getAllKeys.length === 0) return false;

      if (!existsSync(join(process.cwd(), '/files/temp/' + data.fileName)))
        return false;

      return true;
    } catch (error) {
      return false;
    }
  }
  async fileToPermanent(dataList: FileToPermanentDto) {
    try {
      const list = Array.isArray(dataList) ? dataList : [dataList];
      for (const data of list) {
        const tempFileIsExists = await this.tempFileIsExists(data);
        if (!tempFileIsExists) {
          throw new RpcCustomException('File not found', 404);
        }
      }
      for (const data of list) {
        mv(
          join(process.cwd(), '/files/temp/' + data.fileName),
          join(process.cwd(), '/files/' + data.fileName),
          { mkdirp: true },
          async function (err) {
            if (err) throw new RpcCustomException('File not moved', 404);
            else {
              const keyPattern = 'fileUpload:*' + data.fileName + '*';
              //crate redis instance
              const redis = await RedisConnector.getInstance();

              const getAllKeys = await redis.keys(keyPattern);
              //delete keys
              for (const key of getAllKeys) {
                redis.del(key);
              }
            }
          },
        );
      }
      return true;
    } catch (error) {
      throw new CustomException(error);
    }
  }
  async fileToPermanentIfTempExists(dataList: FileRemoveDto) {
    try {
      const list = Array.isArray(dataList) ? dataList : [dataList];
      for (const data of list) {
        const check = await this.tempFileIsExists(data);
        if (check) {
          mv(
            join(process.cwd(), '/files/temp/' + data.fileName),
            join(process.cwd(), '/files/' + data.fileName),
            { mkdirp: true },
            async function (err) {
              console.log('error', err);
            },
          );
        }
      }
      return true;
    } catch (error) {
      throw new CustomException(error);
    }
  }
  async fileRemoveIfExists(fileRemoveDto: FileRemoveDto) {
    try {
      const list = Array.isArray(fileRemoveDto.fileName)
        ? fileRemoveDto.fileName
        : [fileRemoveDto.fileName];
      for (const fileName of list) {
        const check = await this.permanentFileIsExists(
          new FileIsExistsDto({ fileName }),
        );
        if (check) {
          unlink(join(process.cwd(), '/files/' + fileName), (err) => {
            console.log('error', err);
          });
        }
      }
      return true;
    } catch (error) {
      throw new CustomException(error);
    }
  }
}
