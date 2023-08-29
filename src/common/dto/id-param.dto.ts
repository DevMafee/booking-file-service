import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class IdParamDto {
  @ApiProperty({ type: String, description: 'ID', required: true })
  @IsString()
  @MinLength(10)
  @MaxLength(200)
  @IsNotEmpty()
  id: string;
}
