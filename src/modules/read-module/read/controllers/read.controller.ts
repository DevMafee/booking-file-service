import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { ReadService } from '../services/read.service';
import { DtoValidationPipe } from '../../../../common/pipes/dtoValidation.pipe';
import { FileReadDto } from '../dto/file-read.dto';
import { createReadStream } from 'fs';

@Controller('v1/read')
@ApiTags('Admin User')
export class ReadController {
  constructor(private readonly readService: ReadService) {}

  @Get('/:fileName')
  async findAll(
    @Param(new DtoValidationPipe()) params: FileReadDto,
    @Res() res: Response,
  ) {
    const filePath = await this.readService.read(params);
    const file = createReadStream(filePath);
    file.pipe(res);
  }
}
