import { User } from "./account/user.interface";
import { TokenPayload } from "./interfaces/token-payload.interface";

export function createJWTPayload(user: User): TokenPayload {
  return {
    sub: user.id,
    email: user.email,
    role: user.role,
    lastName: user.lastName,
    firstName: user.firstName,
  };
}
