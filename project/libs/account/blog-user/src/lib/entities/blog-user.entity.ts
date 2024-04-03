import { Entity, StorableEntity, AuthUser, UserRole} from '@project/shared-core';

export class BlogUserEntity extends Entity implements StorableEntity<AuthUser> {
  public email: string;
  public firstName: string;
  public lastName: string;
  public dateOfBirth: Date;
  public role: UserRole;
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
    }
  }
}
