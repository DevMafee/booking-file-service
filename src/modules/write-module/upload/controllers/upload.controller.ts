import {
  BadRequestException,
  Controller,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PayloadResponseDTO } from '../../../../common/dto/payload-response.dto';
import { v4 as uuidv4 } from 'uuid';

import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { RedisConnector } from '../../../../common/redis/connect';
export const editFileName = async (req, file, callback) => {
  const fileExtName = extname(file.originalname);
  const fileName = new Date().getTime() + '-' + uuidv4() + fileExtName;
  //crate redis instance
  const redis = await RedisConnector.getInstance();
  const key = 'fileUpload:' + req['_token'] + ':' + fileName;
  await redis.setEx(
    key,
    Number(process.env.TEMP_FILE_ALLOW_MINUTES) * 60,
    fileName,
  );
  callback(null, `${fileName}`);
};
export const fileFilter = async (req, file, callback) => {
  const keyPattern = 'fileUpload:' + req['_token'] + ':*';
  //create redis instance
  const redis = await RedisConnector.getInstance();

  const getAllKeys = await redis.keys(keyPattern);
  if (
    getAllKeys.length > parseInt(process.env.MAX_FILE_ALLOW_IN_SHORT_PERIOD)
  ) {
    return callback(
      new BadRequestException(
        `Too Many File Requests. Wait for ${process.env.TEMP_FILE_ALLOW_MINUTES} min`,
      ),
    );
  }
  if (
    !file.originalname
      .toLowerCase()
      .match(/\.(jpg|jpeg|png|gif|pdf|doc|docx|xlsx|csv)$/)
  ) {
    return callback(
      new BadRequestException(
        'Only image or pdf or doc or excel files are allowed!',
      ),
      false,
    );
  }
  callback(null, true);
};
@Controller('v1/upload')
export class UploadController {
  @Post('/')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files/temp',
        filename: editFileName,
      }),
      fileFilter: fileFilter,
      limits: {
        files: 5, // allow up to 1 files per request,
        fieldSize: Number(process.env.FILE_MAX_SIZE || 10),
      },
    }),
  )
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async fileUpload(@UploadedFile() file: Express.Multer.File) {
    return new PayloadResponseDTO({
      statusCode: HttpStatus.OK,
      message: 'File has been successfully uploaded.',
      data: {
        fileName: file.filename,
      },
    });
  }
}
