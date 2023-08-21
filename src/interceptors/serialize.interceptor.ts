import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

export class SerializeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    handler: CallHandler<any>,
  ): Observable<any> {
    // ! Run something before a request is handled by the request handler
    console.log(
      '🚀 ~ file: serialize.interceptor.ts:14 ~ SerializeInterceptor ~ context:',
      context,
    );

    return handler.handle().pipe(
      map((data: any) => {
        // ! Run something before the response is sent out
        console.log(
          '🚀 ~ file: serialize.interceptor.ts:22 ~ SerializeInterceptor ~ map ~ data:',
          data,
        );

        return data;
      }),
    );
  }
}
