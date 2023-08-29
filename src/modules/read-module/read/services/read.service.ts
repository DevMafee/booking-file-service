import { Injectable, NotFoundException } from '@nestjs/common';
import { FileReadDto } from '../dto/file-read.dto';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class ReadService {
  async read(params: FileReadDto): Promise<string> {
    try {
      let filePath = join(process.cwd(), '/files/temp/' + params.fileName);
      if (!existsSync(filePath)) {
        filePath = join(process.cwd(), '/files/' + params.fileName);
        if (!existsSync(filePath)) {
          throw new NotFoundException("Sorry can't find the file!");
        }
      }
      return filePath;
    } catch (error) {
      throw new NotFoundException("Sorry can't find the file!");
    }
  }
}
