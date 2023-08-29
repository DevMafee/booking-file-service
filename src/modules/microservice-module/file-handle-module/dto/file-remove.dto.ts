export class FileRemoveDto{
  fileName: string | string[];
  constructor(partial: Partial<FileRemoveDto>) {
    Object.assign(this, partial)
  }
}
