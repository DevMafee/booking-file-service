import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { CustomInternalServerException } from './customInternalServerException';
import { ValidationException } from './validationException';
import { ParamValidationException } from './paramValidationException';

export class CustomException extends HttpException {
  /**
   * Instantiate a `CustomInternalServerException` Exception.
   *
   * @example
   * //using in service
   * `try{
   *    // throw new HttpException('Try Again!',HttpStatus.BAD_REQUEST)
   *    // throw new BadRequestException('Bad request')
   *    // throw new ForbiddenException('Access dined')
   *    throw new ValidationException([{
   *          field: 'slug',
   *          message: "Slug already exist. "
   *    }])
   * }catch(error){
   *   throw new CustomException(error);
   * }
   * `
   *
   */
  constructor(error) {
    if (error instanceof HttpException === false) {
      if (error?.errno === 1451) {
        throw new BadRequestException(
          'This data used anywhere. You can not remove this parent data.',
        );
      }
      throw new CustomInternalServerException(error);
    } else if (error instanceof ValidationException) {
      throw error;
    } else if (error instanceof ParamValidationException) {
      throw error;
    }
    super(error, error.status);
  }
}
