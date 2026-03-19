import { Body, Controller, Post, Req, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { AuthService } from "./auth.service";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";

@Controller('auth')
export class LoginController {
  constructor(
    private readonly authService: AuthService
  ) {}

  //Rota /auth/login  -> {"email":"teste@gmail.com","123456"}
  @Post('login')
  async Login(@Body() loginDto: LoginDto) {
    
    const user = await this.authService.login(loginDto.email, loginDto.password);

    return {
      message: "Login realizado!",
      user
    };
  }

  // Rota /auth/register -> {"username"}
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    // Chamando a vanguarda (AuthService) para orquestrar o registro

    const newUser = await this.authService.registerUser(
      registerDto.username,
      registerDto.email,
      registerDto.password
    );

    return {
      message: "Usuário Registrado",
      user: newUser
    };
  }

  @Post('datatime')
  async UserDataTime(@Req() req) {

    //Fazer um script de front que sempre atualiza a atividade
    // IMPORTANTE: req.user só existirá se você usar um Guard de JWT aqui!
    const userId = req.user?.id; 

    if (!userId) {
        throw new UnauthorizedException('Usuário não identificado');
    }

    await this.authService.updateActivity(userId);

    return {
      message: 'OK',
      timestamp: new Date()
    };
  }
}