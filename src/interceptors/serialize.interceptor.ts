import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { Observable, map } from 'rxjs';

export class SerializeInterceptor<DtoType> implements NestInterceptor {
  constructor(private dto: ClassConstructor<DtoType>) {}

  intercept(
    context: ExecutionContext,
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
