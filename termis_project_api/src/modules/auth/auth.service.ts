import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { Repository } from 'typeorm';
import { User ,UserRole} from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()

/*
Login()
1_ Validação se o usuário existe
2_ Comparação da senha email no banco de dados
3_ Geração do token jwt
4_ Criação de usuário

AccessControl()
1_ Validar Privilégios
2_ Definir o que poder ser acessado ou não
3_ Adicionar usuário 

~~~~ --> Funcionalidades relacionada a estatísticas

*/
@Injectable()
export class AuthService {

 
 constructor(
   @InjectRepository(User)
  private userRepository: Repository<User>){}

  async login(loginDto: LoginDto) {
    // TODO: Implement authentication logic
    /*
    A função de Login deve registrar  o tempo de o usuário  se logou 
    */
    return { message: 'Login placeholder', data: loginDto };
  }

  async UserExists(email_dto: string){
   const user = this.userRepository.exists({
    where: {email:email_dto}
   })
   return user
  }

  async ValidateToken(token: string) {
    // Validação do JWT
    return { valid: false, token };
  }

  
  async RegisterUser(username: string, email:string, password:string){

  }
}
