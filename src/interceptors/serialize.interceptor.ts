import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';

import { ClassConstructor, plainToClass } from 'class-transformer';
import { Observable, map } from 'rxjs';

export function Serialize<DtoType>(dto: ClassConstructor<DtoType>) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor<DtoType> implements NestInterceptor {
  constructor(private dto: ClassConstructor<DtoType>) {}

  intercept(
    _context: ExecutionContext,
    handler: CallHandler<DtoType>,
  ): Observable<DtoType> {
    // ! Run something before a request is handled by the request handler

    return handler.handle().pipe(
      map((data: DtoType) => {
        // ! Run something before the response is sent out

        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
