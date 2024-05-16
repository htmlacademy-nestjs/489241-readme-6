import dayjs from 'dayjs';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ConflictException, HttpException, HttpStatus, Inject, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { BlogUserRepository, BlogUserEntity } from '@project/blog-user';
import { Token, User, UserRole, createJWTPayload } from '@project/shared-core';
import { jwtConfig } from '@project/account-configuration';

import { CreateUserDto } from './dto/create-user.dto';
import { AuthenticationErrors } from './authentication.constants';
import { LoginUserDto } from './dto/login-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { RefreshTokenService } from './refresh-token-module/refresh-token.service';


@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly blogUserRepository: BlogUserRepository,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  public async register(dto: CreateUserDto): Promise<BlogUserEntity> {
    const {email, firstName, lastName, password, dateBirth} = dto;

    const blogUser = {
      id: '',
      email,
      firstName,
      lastName,
      dateOfBirth: dayjs(dateBirth).toDate(),
      role: UserRole.User,
      avatarImage: '',
      passwordHash: '',
      registrationDate: dayjs().toDate()
    };

    const existUser = await this.blogUserRepository
      .findByEmail(email);

    if (existUser) {
      throw new ConflictException(AuthenticationErrors.AuthUserExists);
    }

    const userEntity = await new BlogUserEntity(blogUser)
      .setPassword(password);

    await this.blogUserRepository.save(userEntity);

    return userEntity;
  }

  public async verifyUser(dto: LoginUserDto): Promise<BlogUserEntity> {
    const {email, password} = dto;
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AuthenticationErrors.UserNotFound);
    }

    if (!await existUser.comparePassword(password)) {
      throw new UnauthorizedException(AuthenticationErrors.WrongPassword);
    }

    return existUser;
  }

  public async getUser(id: string): Promise<BlogUserEntity> {
    const user = await this.blogUserRepository.findById(id);

    if (! user) {
      throw new NotFoundException(AuthenticationErrors.UserNotFound);
    }

    return user;
  }

  public async createUserToken(user: User): Promise<Token> {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = { ...accessTokenPayload, tokenId: crypto.randomUUID() };
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload);

    try {
      const accessToken = await this.jwtService.signAsync(accessTokenPayload);
      const refreshToken = await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn
      });

      return { accessToken, refreshToken };
    } catch (error) {
      this.logger.error('[Token generation error]: ' + error.message);
      throw new HttpException('Token generation error.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async changePassword(dto: ChangePasswordDto, currentUserEmail: string): Promise<BlogUserEntity> {

    const existUser = await this.blogUserRepository.findByEmail(currentUserEmail);
    if (!existUser) {
      throw new NotFoundException(AuthenticationErrors.UserNotFound);
    }

    if (!await existUser.comparePassword(dto.password)) {
      throw new UnauthorizedException(AuthenticationErrors.WrongPassword);
    }

    const userEntity = await new BlogUserEntity(existUser)
      .setPassword(dto.newPassword);

    await this.blogUserRepository.update(userEntity);
    return userEntity;
  }

  public async getUserByEmail(email: string) {
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (! existUser) {
      throw new NotFoundException(AuthenticationErrors.UserNotFound);
    }

    return existUser;
  }
}
