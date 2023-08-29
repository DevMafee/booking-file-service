import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { StatusTypeEnum } from '../enums/status/status.enum';

export class StatusChangeDto {
  @ApiProperty({
    type: Number,
    description: 'Status',
    default: StatusTypeEnum.ACTIVE,
  })
  @IsEnum(StatusTypeEnum, { message: 'Status Should be 0 or 1' })
  status: number;
}
