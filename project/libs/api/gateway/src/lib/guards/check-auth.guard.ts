import { CanActivate, ExecutionContext, Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

import { apiConfig, AccountEndpoints } from '@project/api-configuration';

@Injectable()
export class CheckAuthGuard implements CanActivate {
  constructor(
    private readonly httpService: HttpService,
    @Inject(apiConfig.KEY)
    private readonly config: ConfigType<typeof apiConfig>,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const checkUrl = this.config.getAccountUrl(AccountEndpoints.CheckUser);
    const { data } = await this.httpService.axiosRef.post(checkUrl, {}, {
      headers: {
        'Authorization': request.headers['authorization']
      }
    })

    request['user'] = data;
    return true;
  }
}
