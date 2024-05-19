import { UserRole } from '../account/user-role.enum';

export interface TokenPayload {
  id: string;
  email: string;
  role: UserRole;
  lastName: string;
  firstName: string;
}
