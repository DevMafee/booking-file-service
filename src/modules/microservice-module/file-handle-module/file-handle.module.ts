import { Module } from '@nestjs/common';
import { FileHandleController } from './controller/file-handle.controller';
import { FileHandleService } from './services/file-handle.service';

@Module({
  imports: [],
  controllers: [FileHandleController],
  providers: [FileHandleService],
})
export class FileHandleModule {}
