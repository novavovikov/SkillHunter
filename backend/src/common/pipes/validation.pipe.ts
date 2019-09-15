import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { HttpMessageType } from '../../constants/exception'

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  static toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object]
    return !types.includes(metatype)
  }

  static isEmpty(value: any) {
    return !Object.keys(value).length
  }

  static isNotUnique(value: any) {
    return !Object.keys(value).length
  }

  async transform(value: any, metadata: ArgumentMetadata) {
    if (value instanceof Object && ValidationPipe.isEmpty(value)) {
      throw new HttpException(
        {
          message: 'BODY_ERROR',
          type: HttpMessageType.error,
          statusCode: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST
      )
    }

    const { metatype } = metadata
    if (!metatype || !ValidationPipe.toValidate(metatype)) {
      return value
    }

    const object = plainToClass(metatype, value)
    const errors = await validate(object)
    if (errors.length > 0) {
      throw new HttpException(
        {
          message: 'NOT_VALID',
          type: HttpMessageType.warning,
          statusCode: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST
      )
    }

    return value
  }
}
