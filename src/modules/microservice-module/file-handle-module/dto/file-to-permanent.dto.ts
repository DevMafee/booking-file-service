export class FileToPermanentDto{
  fileName: string | string[];
  constructor(partial: Partial<FileToPermanentDto>) {
    Object.assign(this, partial)
  }
}
