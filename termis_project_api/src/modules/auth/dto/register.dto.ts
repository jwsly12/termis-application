import { IsEmail, IsString, MinLength, Matches } from "class-validator";

export class RegisterDto {
  @IsString({ message: "Nome de usuário inválido!" })
  @MinLength(3, { message: "O username deve ter pelo menos 3 caracteres" })
  username: string;

  @IsEmail({}, { message: "E-mail inválido" })
  @Matches(/^[a-z0-9@.]*$/, { message: "O e-mail contém caracteres não permitidos" })
  email: string;

  @IsString()
  @MinLength(6, { message: "A senha deve ter pelo menos 6 caracteres" })
  password: string;
}