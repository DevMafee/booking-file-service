export class IMetadata {
  public readonly page: number;
  public readonly totalCount: number;
  public readonly totalPage?: number;
  public readonly limit: number;
}

export class MetadataDTO extends IMetadata {
  constructor(
    public readonly page: number,
    public readonly totalCount: number,
    public readonly limit: number,
  ) {
    super();
  }
}

export class PayloadDTO {
  constructor(public readonly list: any[], public readonly details: any) {}
}

export class PayloadResponseDTO {
  public statusCode: number;
  public message?: string;
  public metadata?: IMetadata;
  public data?: Record<any, any> | Record<string, any>[];

  constructor(
    private response: {
      statusCode: number;
      message?: string;
      metadata?: IMetadata;
      data?: Record<any, any> | any[];
    },
  ) {
    const metadata = response.metadata;

    this.statusCode = response.statusCode;
    if(metadata){
      const totalPage = Math.ceil(metadata.totalCount / metadata.limit);
      this.metadata = {
        ...metadata,
        totalPage: totalPage,
      };
    }
    this.message = response.message || '';
    this.data = response.data || {};
  }
}
