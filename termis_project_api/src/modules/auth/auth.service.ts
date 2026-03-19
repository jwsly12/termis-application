import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { Repository } from 'typeorm';
import { User ,UserRole} from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';


@Injectable()



// Classe responsável por operações com usuários

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'role', 'last_login']
    });
  }

  async exists(email: string) {
    return await this.userRepository.exists({
      where: { email }
    });
  }

  async updateLastLogin(userId: number, loginTime: Date) {
    await this.userRepository.update(userId, { last_login: loginTime });
  }

  async createUser(username: string, email: string, passwordHash: string): Promise<User> {
    const user = this.userRepository.create({
      username,
      email,
      password: passwordHash,
      role: UserRole.USER
    });
    return await this.userRepository.save(user);
  }
}


// Classe responsável por senhas (hash e comparação)
@Injectable()
export class PasswordService {
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(16);
    return await bcrypt.hash(password, salt);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}


// Classe responsável por tokens (JWT)
@Injectable()
export class TokenService {
  async validateToken(token: string) {
    // Validação do JWT
    return { valid: false, token };
  }

  async generateToken(payload: any) {
    
    return { token: 'fake-jwt-token', payload };
  }
}


// Classe orquestradora
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private passwordService: PasswordService,
    private tokenService: TokenService
  ) {}

  async login(email: string, user_password: string) {
    const db_info = await this.userService.findByEmail(email);

    if (db_info && await this.passwordService.comparePassword(user_password, db_info.password)) {
      const login_time = new Date(); // Pega o Time do login

      await this.userService.updateLastLogin(db_info.id, login_time);
      const { password, ...result } = db_info;
      result.last_login = login_time;

      return result;
    } else {
      throw new UnauthorizedException('Senha ou usuário inválidos');
    }
  }

  async userExists(email_dto: string) {
    return await this.userService.exists(email_dto);
  }

  async validateToken(token: string) {
    return await this.tokenService.validateToken(token);
  }

  // Registro do usuário e Incriptação da senha
  async registerUser(username: string, email: string, password: string) {

    const validation = await this.userExists(email)
    if (validation){
      throw new ConflictException('O usuário já existe')
    }

    const hash = await this.passwordService.hashPassword(password);
    return await this.userService.createUser(username, email, hash);
  }

  async updateActivity(userId: number) {
    await this.userService.updateLastLogin(userId, new Date());
  }
}
