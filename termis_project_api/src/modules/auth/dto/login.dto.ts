import { IsEmail,IsString,Matches } from "class-validator";

export class LoginDto {

  @Matches(/^[a-z0-9@.]*$/, { message: 'email inválido', })
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  username: string;

}