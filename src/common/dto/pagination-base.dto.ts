import { ApiProperty } from '@nestjs/swagger';

export default abstract class PaginationBaseDTO {
  @ApiProperty({ type: Number, description: 'Page Number', default: 1 })
  page: number;

  @ApiProperty({ type: Number, description: 'Data Limit', default: 10 })
  limit: number;
}
