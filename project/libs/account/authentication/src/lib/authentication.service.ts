import dayjs from 'dayjs';
import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { BlogUserRepository, BlogUserEntity } from '@project/blog-user';
import { UserRole } from '@project/shared-core';

import { CreateUserDto } from './dto/create-user.dto';
import { AuthenticationErrors } from './authentication.constants';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository
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
}
