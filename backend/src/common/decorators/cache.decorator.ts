import { CacheService } from '../../modules/cache/cache.service'
import {
  CacheManagerOptions,
  InternalServerErrorException,
} from '@nestjs/common'
import 'reflect-metadata'
import { switchMap, tap } from 'rxjs/operators'
import { from, Observable, of } from 'rxjs'

type Cacheable<T> = (...args) => Observable<T>

export function Cache<T>(options?: CacheManagerOptions) {
  return (
    target: any,
    methodName: string,
    descriptor: TypedPropertyDescriptor<Cacheable<T>>
  ) => {
    const originalMethod = descriptor.value
    const className = target.constructor.name

    descriptor.value = function(...args: any[]) {
      const cache = this.cacheService
      if (!cache || !(cache instanceof CacheService)) {
        throw new InternalServerErrorException(
          'Target Class should inject CacheService'
        )
      } else {
        const cacheKey = `${className}:${methodName}:${args
          .map(a => JSON.stringify(a))
          .join()}`

        return from(cache.get<T>(cacheKey)).pipe(
          switchMap(res =>
            res
              ? of(res)
              : originalMethod
                  .apply(this, args)
                  .pipe(
                    tap((methodResult: T) =>
                      cache.set<T>(cacheKey, methodResult, options)
                    )
                  )
          )
        )
      }
    }

    return descriptor
  }
}

export function CacheBuster<T>(cacheKey: string) {
  return (
    target: any,
    methodName: string,
    descriptor: TypedPropertyDescriptor<Cacheable<T>>
  ) => {
    const originalMethod = descriptor.value

    descriptor.value = function(...args: any[]) {
      return originalMethod
        .apply(this, args)
        .pipe(tap(this.cacheService.del(cacheKey)))
    }
    return descriptor
  }
}
