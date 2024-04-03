import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse } from "@nestjs/swagger";

import { BlogUserEntity } from "@project/blog-user";

import { AuthenticationService } from "./authentication.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";

@Controller('auth')
export class AuthenticationController {
  constructor (
    private readonly authenticationService: AuthenticationService
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Registers user' })
  @ApiCreatedResponse({
    description: 'User has been successfully registered',
    type: BlogUserEntity
  })
  @ApiResponse({ status: 409, description: 'User already exists with such email'})
  public async register(@Body() dto: CreateUserDto) {
    const newUser = await this.authenticationService.register(dto);
    return newUser.toPOJO();
  }

  @Post('login')
  @ApiOperation({ summary: 'Verifies user password' })
  @ApiOkResponse({ description: "User verified successfully"})
  @ApiResponse({ status: 403, description: 'Forbidden'})
  @ApiResponse({ status: 404, description: 'User not found'})
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authenticationService.verifyUser(dto);
    return verifiedUser.toPOJO();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Gets user details by id' })
  @ApiOkResponse({ description: "User found and user details returned in body"})
  @ApiResponse({ status: 404, description: 'User not found'})
  public async get(@Param('id') id: string) {
    const existUser = await this.authenticationService.getUser(id);
    const { passwordHash, ...data } = existUser.toPOJO();
    return data;
  }
}
