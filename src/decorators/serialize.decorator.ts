import { UseInterceptors } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';

export function Serialize<DtoType>(dto: ClassConstructor<DtoType>) {
  return UseInterceptors(new SerializeInterceptor(dto));
}
