export class FileIsExistsDto{
  fileName: string;
  constructor(partial: Partial<FileIsExistsDto>) {
    Object.assign(this, partial)
  }
}
