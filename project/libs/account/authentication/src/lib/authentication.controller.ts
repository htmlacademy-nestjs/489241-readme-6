import { Body, Controller, Get, HttpStatus, Param, Post, UseGuards, Request } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { fillDto } from '@project/shared-helpers';
import { MongoIdValidationPipe } from '@project/pipes';

import { AuthenticationService } from "./authentication.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { AuthenticationErrors, AuthenticationOperationDescription, AuthenticationResponseMessage } from "./authentication.constants";
import { UserRdo } from "./rdo/user.rdo";
import { LoggedUserRdo } from "./rdo/logged-user.rdo";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { ChangePasswordDto } from "./dto/change-password.dto";

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor (
    private readonly authenticationService: AuthenticationService
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
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authenticationService.verifyUser(dto);
    const userToken = await this.authenticationService.createUserToken(verifiedUser);
    return fillDto(LoggedUserRdo, { ...verifiedUser.toPOJO(), ...userToken });
  }

  @Get(':id')
  @ApiOperation({ summary: AuthenticationOperationDescription.GetById })
  @ApiOkResponse({
    description: AuthenticationResponseMessage.UserFound,
    type: UserRdo
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: AuthenticationErrors.UserNotFound })
  public async get(@Param('id', MongoIdValidationPipe) id: string) {
    const existUser = await this.authenticationService.getUser(id);
    return fillDto(UserRdo, existUser.toPOJO());
  }

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  @ApiOperation({ summary: AuthenticationOperationDescription.ChangeUserPassword })
  @ApiOkResponse({
    description: AuthenticationResponseMessage.PasswordUpdated,
    type: LoggedUserRdo
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: AuthenticationErrors.UserNotFound })
  public async changePassword(@Body() dto: ChangePasswordDto, @Request() req) {
    const changedUser = await this.authenticationService.changePassword(dto, req.user.email);
    const userToken = await this.authenticationService.createUserToken(changedUser);
    return fillDto(LoggedUserRdo, { ...changedUser.toPOJO(), ...userToken });
  }
}
