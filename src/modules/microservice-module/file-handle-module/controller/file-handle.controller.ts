import {
  BadRequestException,
  Controller,
  Get,
  UseFilters,
} from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { MsResponseDto } from '../../shared/response/response.dto';
import { CustomException } from '../../shared/exceptions/customException';
import { ValidationException } from '../../shared/exceptions/validationException';
import { RpcCustomException } from '../../shared/exceptions/rpcCustomException';
import { FileToPermanentDto } from '../dto/file-to-permanent.dto';
import { ReadService } from '../../../read-module/read/services/read.service';
import { FileHandleService } from '../services/file-handle.service';
import { ExceptionFilter } from '../../shared/filter/rpc-exception-v2.filter';
import { FileIsExistsDto } from '../dto/file-is-exists.dto';
import { FileRemoveDto } from '../dto/file-remove.dto';

enum Patterns {
  FILE_IS_EXISTS = 'FILE_IS_EXISTS',
  PERMANENT_FILE_IS_EXISTS = 'PERMANENT_FILE_IS_EXISTS',
  TEMP_FILE_IS_EXISTS = 'TEMP_FILE_IS_EXISTS',
  FILE_TO_PERMANENT = 'FILE_TO_PERMANENT',
  FILE_TO_PERMANENT_IF_TEMP_EXISTS = 'FILE_TO_PERMANENT_IF_TEMP_EXISTS',
  FILE_REMOVE_IF_EXISTS = 'FILE_REMOVE_IF_EXISTS',
}

@Controller()
export class FileHandleController {
  constructor(private readonly fileHandleService: FileHandleService) {}

  @MessagePattern(Patterns.FILE_IS_EXISTS)
  async fileIsExists(data: FileIsExistsDto): Promise<any> {
    try {
      const fileIsExists = await this.fileHandleService.fileIsExists(data);
      if (!fileIsExists) {
        throw new RpcCustomException('File not found', 404);
      }
      return new MsResponseDto({
        status: true,
        statusCode: 200,
        data: {},
      });
    } catch (error) {
      throw new CustomException(error);
    }
  }
  @MessagePattern(Patterns.PERMANENT_FILE_IS_EXISTS)
  async permanentFileIsExists(data: FileIsExistsDto): Promise<any> {
    try {
      const permanentFileIsExists =
        await this.fileHandleService.permanentFileIsExists(data);
      if (!permanentFileIsExists) {
        throw new RpcCustomException('File not found', 404);
      }
      return new MsResponseDto({
        status: true,
        statusCode: 200,
        data: {},
      });
    } catch (error) {
      throw new CustomException(error);
    }
  }

  @MessagePattern(Patterns.TEMP_FILE_IS_EXISTS)
  async tempFileIsExists(data: FileIsExistsDto): Promise<any> {
    try {
      const tempFileIsExists = await this.fileHandleService.tempFileIsExists(
        data,
      );
      if (!tempFileIsExists) {
        throw new RpcCustomException('File not found', 404);
      }
      return new MsResponseDto({
        status: true,
        statusCode: 200,
        data: {},
      });
    } catch (error) {
      throw new CustomException(error);
    }
  }

  @MessagePattern(Patterns.FILE_TO_PERMANENT)
  async fileToPermanent(data: FileToPermanentDto): Promise<any> {
    try {
      await this.fileHandleService.fileToPermanent(data);
      return new MsResponseDto({
        status: true,
        statusCode: 200,
        data: {},
      });
    } catch (error) {
      throw new CustomException(error);
    }
  }

  @MessagePattern(Patterns.FILE_TO_PERMANENT_IF_TEMP_EXISTS)
  async fileToPermanentIfTempExists(data: FileToPermanentDto): Promise<any> {
    try {
      await this.fileHandleService.fileToPermanentIfTempExists(data);
      return new MsResponseDto({
        status: true,
        statusCode: 200,
        data: {},
      });
    } catch (error) {
      throw new CustomException(error);
    }
  }
  @MessagePattern(Patterns.FILE_REMOVE_IF_EXISTS)
  async fileRemoveIfExists(data: FileRemoveDto): Promise<any> {
    try {
      await this.fileHandleService.fileRemoveIfExists(data);
      return new MsResponseDto({
        status: true,
        statusCode: 200,
        data: {},
      });
    } catch (error) {
      throw new CustomException(error);
    }
  }
}
