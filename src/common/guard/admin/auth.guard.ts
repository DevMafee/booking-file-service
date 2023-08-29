import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import {RedisConnector} from "../../redis/connect";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor() {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return new Promise(async function (resolve, reject){
      const req = context.switchToHttp().getRequest();
      try {
        const authorizationHeader = req.headers['authorization'];
        let token;
        if (authorizationHeader) {
          token = authorizationHeader.split(' ')[1];
        }
        if (token) {
          //crate redis instance
          const redis = await RedisConnector.getInstance();

          //token expire check
          const tokenExpireCheck = await redis.get(token);
          if(!tokenExpireCheck) reject(new UnauthorizedException('The Token is invalid'));
          redis.expire(token,Number(process.env.ALLOW_TOKEN_SECONDS));
          req['_token'] = token;
          resolve(true);
        } else {
          reject(new UnauthorizedException('No token provided'));
        }
      } catch (e) {
        reject(new UnauthorizedException(
          'Authentication failed. Please Try again! Now',
        ))
      }
    })

  }
}
