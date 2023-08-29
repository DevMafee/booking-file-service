import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FileReadDto {
  @ApiProperty({ type: String, nullable:false, required:true })
  @IsString()
  @IsNotEmpty()
  fileName: string;
}
