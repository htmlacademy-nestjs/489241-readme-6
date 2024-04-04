import { Body, Controller, Get, HttpStatus, Param, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { BlogUserEntity } from "@project/blog-user";

import { AuthenticationService } from "./authentication.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { AuthenticationErrors, AuthenticationOperationDescription, AuthenticationResponseMessage } from "./authentication.constants";
import { UserRdo } from "./rdo/user.rdo";

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
    return newUser.toPOJO();
  }

  @Post('login')
  @ApiOperation({ summary: AuthenticationOperationDescription.Login })
  @ApiOkResponse({
    description: AuthenticationResponseMessage.LoggedSuccess,
    type: UserRdo
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: AuthenticationResponseMessage.LoggedError })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: AuthenticationErrors.UserNotFound })
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authenticationService.verifyUser(dto);
    return verifiedUser.toPOJO();
  }

  @Get(':id')
  @ApiOperation({ summary: AuthenticationOperationDescription.GetById })
  @ApiOkResponse({
    description: AuthenticationResponseMessage.UserFound,
    type: UserRdo
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: AuthenticationErrors.UserNotFound })
  public async get(@Param('id') id: string) {
    const existUser = await this.authenticationService.getUser(id);
    const { passwordHash, ...data } = existUser.toPOJO();
    return data;
  }
}
