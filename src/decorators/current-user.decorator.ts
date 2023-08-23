import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (_data: never, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const userId = request.session.userId;

    return 'test decorator content';
  },
);
