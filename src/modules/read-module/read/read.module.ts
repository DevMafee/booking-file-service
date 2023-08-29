import { Module } from '@nestjs/common';
import {ReadController} from "./controllers/read.controller";
import {ReadService} from "./services/read.service";

@Module({
  imports: [
  ],
  controllers: [
    ReadController
  ],
  providers: [
    ReadService
  ],
})
export class ReadModule {}
