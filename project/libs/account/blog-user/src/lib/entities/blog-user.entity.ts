import { Exclude } from 'class-transformer';
import { compare, genSalt, hash } from 'bcrypt';

import { Entity, StorableEntity, AuthUser, UserRole} from '@project/shared-core';
import { SALT_ROUNDS } from '../blog-user.constants';

export class BlogUserEntity extends Entity implements StorableEntity<AuthUser> {
  public email: string;
  public firstName: string;
  public lastName: string;
  public dateOfBirth: Date;
  public role: UserRole;
  public registrationDate: Date;

  @Exclude()
  public passwordHash: string;

  constructor(user?: AuthUser) {
    super();
    this.populate(user);
  }

  public populate(user?: AuthUser): void {
    if (! user) {
      return;
    }

    this.id = user.id ?? '';
    this.email = user.email;
    this.dateOfBirth = user.dateOfBirth;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.passwordHash = user.passwordHash;
    this.role = user.role;
    this.registrationDate = user.registrationDate;
  }

  public toPOJO(): AuthUser {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      dateOfBirth: this.dateOfBirth,
      role: this.role,
      passwordHash: this.passwordHash,
      registrationDate: this.registrationDate,
    }
  }

  public async setPassword(password: string): Promise<BlogUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
