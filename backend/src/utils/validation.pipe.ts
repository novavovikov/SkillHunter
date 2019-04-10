import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  static toValidate (metatype): boolean {
    const types = [String, Boolean, Number, Array, Object]
    return !types.includes(metatype)
  }

  static isEmpty (value: any) {
    return !Object.keys(value).length
  }

  static isNotUnique (value: any) {
    return !Object.keys(value).length
  }

  async transform (value: any, metadata: ArgumentMetadata) {
    if (value instanceof Object && ValidationPipe.isEmpty(value)) {
      throw new HttpException(
        'BODY_ERROR',
        HttpStatus.BAD_REQUEST,
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
        'NOT_VALID',
        HttpStatus.BAD_REQUEST
      )
    }

    return value
  }
}
