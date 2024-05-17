import { HttpService } from '@nestjs/axios';
import { Inject, Body, Controller, Post, Req, HttpStatus, UseFilters } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { LoggedUserRdo, LoginUserDto } from '@project/authentication';
import { apiConfig, AccountEndpoints } from '@project/api-configuration';

import { UsersErrors, UsersOperationDescription, UsersResponseMessage } from './users.constants';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';

@ApiTags('users')
@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    @Inject(apiConfig.KEY)
    private readonly config: ConfigType<typeof apiConfig>,
    private readonly httpService: HttpService
  ) {}

  @Post('login')
  @ApiOperation({ summary: UsersOperationDescription.Login })
  @ApiOkResponse({
    description: UsersResponseMessage.LoggedSuccess,
    type: LoggedUserRdo
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: UsersResponseMessage.LoggedError })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: UsersErrors.UserNotFound })
  public async login(@Body() loginUserDto: LoginUserDto) {
    const loginUrl = this.config.getAccountUrl(AccountEndpoints.LoginUser);
    const { data } = await this.httpService.axiosRef.post(loginUrl, loginUserDto);
    return data;
  }

  @Post('refresh')
  @ApiOperation({ summary: UsersOperationDescription.RefreshTokens })
  @ApiOkResponse({
    description: UsersResponseMessage.RefreshTokens,
   })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: UsersErrors.UserNotFound })
  public async refreshToken(@Req() req: Request) {
    const refreshTokensUrl = this.config.getAccountUrl(AccountEndpoints.RefreshTokens);
    console.log(refreshTokensUrl);
    const { data } = await this.httpService.axiosRef.post(refreshTokensUrl, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });

    return data;
  }
}
