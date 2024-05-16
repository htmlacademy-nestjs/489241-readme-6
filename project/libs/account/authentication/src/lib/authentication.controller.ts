import { Body, Controller, Get, HttpStatus, Param, Post, UseGuards, Request, Req } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { fillDto } from '@project/shared-helpers';
import { MongoIdValidationPipe } from '@project/pipes';
import { NotifyService } from "@project/account-notify";

import { AuthenticationService } from "./authentication.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthenticationErrors, AuthenticationOperationDescription, AuthenticationResponseMessage } from "./authentication.constants";
import { UserRdo } from "./rdo/user.rdo";
import { LoggedUserRdo } from "./rdo/logged-user.rdo";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { RequestWithUser } from "./interfaces/request-with-user.interface";
import { JwtRefreshGuard } from "./guards/jwt-refresh.guard";

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor (
    private readonly authenticationService: AuthenticationService,
    private readonly notifyService: NotifyService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: AuthenticationOperationDescription.Register })
  @ApiCreatedResponse({
    description: AuthenticationResponseMessage.UserCreated,
    type: UserRdo
  })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: AuthenticationErrors.AuthUserExists })
  public async register(@Body() dto: CreateUserDto) {
    const newUser = await this.authenticationService.register(dto);

    const { email, firstName, lastName } = newUser;
    await this.notifyService.registerSubscriber({ email, firstName, lastName });

    return fillDto(UserRdo, newUser.toPOJO());
  }

  @Post('login')
  @ApiOperation({ summary: AuthenticationOperationDescription.Login })
  @ApiOkResponse({
    description: AuthenticationResponseMessage.LoggedSuccess,
    type: LoggedUserRdo
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: AuthenticationResponseMessage.LoggedError })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: AuthenticationErrors.UserNotFound })
  @UseGuards(LocalAuthGuard)
  public async login(@Req() { user }: RequestWithUser) {
    const userToken = await this.authenticationService.createUserToken(user);
    return fillDto(LoggedUserRdo, { ...user.toPOJO(), ...userToken });
  }

  @Get(':id')
  @ApiOperation({ summary: AuthenticationOperationDescription.GetById })
  @ApiOkResponse({
    description: AuthenticationResponseMessage.UserFound,
    type: UserRdo
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: AuthenticationErrors.UserNotFound })
  @UseGuards(JwtAuthGuard)
  public async get(@Param('id', MongoIdValidationPipe) id: string) {
    const existUser = await this.authenticationService.getUser(id);
    return fillDto(UserRdo, existUser.toPOJO());
  }

  @Post('change-password')
  @ApiOperation({ summary: AuthenticationOperationDescription.ChangeUserPassword })
  @ApiOkResponse({
    description: AuthenticationResponseMessage.PasswordUpdated,
    type: LoggedUserRdo
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: AuthenticationErrors.UserNotFound })
  @UseGuards(JwtAuthGuard)
  public async changePassword(@Body() dto: ChangePasswordDto, @Request() req) {
    const changedUser = await this.authenticationService.changePassword(dto, req.user.email);
    const userToken = await this.authenticationService.createUserToken(changedUser);
    return fillDto(LoggedUserRdo, { ...changedUser.toPOJO(), ...userToken });
  }


  @Post('refresh')
  @ApiOperation({ summary: AuthenticationOperationDescription.RefreshTokens })
  @ApiOkResponse({
    description: AuthenticationResponseMessage.RefreshTokens,
   })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: AuthenticationErrors.UserNotFound })
  @UseGuards(JwtRefreshGuard)
  public async refreshToken(@Req() { user }: RequestWithUser) {
    return this.authenticationService.createUserToken(user);
  }
}
