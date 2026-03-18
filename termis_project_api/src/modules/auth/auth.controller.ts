import { Body, Controller,Post } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@Controller('auth')
export class LoginController{
//constructor( )

   //Rota /auth/login  -> {"email":"teste@gmail.com","123456"}
    @Post('login')
    async Login(@Body() loginDto: LoginDto){
        
        return {
            message: "Login realizado!",
            email: loginDto.email,
            password: loginDto.password 
        }
    }
    // Rota /auth/register -> {"username"}
   @Post('register')
  async register(@Body() registerDto: RegisterDto) {
     console.log(
        registerDto.username,
        registerDto.email,
        registerDto.password
     )
     return {
        message: "Usuário Registrado"
     }
  }
}
