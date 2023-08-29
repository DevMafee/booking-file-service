export class MsResponseDto {
  status: boolean;
  statusCode: number;
  message: string;
  data: Record<string, unknown>;
  metaData: {
    page: number,
    totalPage: number,
    totalCount: number,
    limit: number,
  }
  constructor(partial: Partial<MsResponseDto>) {
    Object.assign(this, partial)
    if(!partial.statusCode){
      this.statusCode = partial.statusCode
    }
  }
}
