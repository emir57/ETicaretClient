import { Token } from "./token/token";

export class LoginReturnValue {
  token!: Token;
  message!: string;
  succeeded!: boolean
}
