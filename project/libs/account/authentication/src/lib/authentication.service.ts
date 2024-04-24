import dayjs from 'dayjs';
import { ConfigType } from '@nestjs/config';
import { mongoConfig } from '@project/data-access';
import { JwtService } from '@nestjs/jwt';
import { ConflictException, HttpException, HttpStatus, Inject, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { BlogUserRepository, BlogUserEntity } from '@project/blog-user';
import { Token, TokenPayload, User, UserRole } from '@project/shared-core';

import { CreateUserDto } from './dto/create-user.dto';
import { AuthenticationErrors } from './authentication.constants';
import { LoginUserDto } from './dto/login-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';


@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly blogUserRepository: BlogUserRepository,

    @Inject(mongoConfig.KEY)
    private readonly databaseConfig: ConfigType<typeof mongoConfig>,

    private readonly jwtService: JwtService,
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
      passwordHash: ''
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
    const payload: TokenPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      lastName: user.lastName,
      firstName: user.firstName,
    };

    try {
      const accessToken = await this.jwtService.signAsync(payload);
      return { accessToken };
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
}
