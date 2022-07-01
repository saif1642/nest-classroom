import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserType } from './user/user';

@Injectable()
export class StudentGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    try {
      const jwt = request.cookies['jwt'];
      const { user_type } = this.jwtService.verify(jwt);
      return user_type === UserType.STUDENT;
    } catch {
      return false;
    }
  }
}
