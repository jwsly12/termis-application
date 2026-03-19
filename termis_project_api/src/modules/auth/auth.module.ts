import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { User } from './entities/user.entity';   
import { LoginController } from './auth.controller'; 
import { AuthService, PasswordService, TokenService, UserService } from './auth.service';

@Module({
  imports: [

    TypeOrmModule.forFeature([User]), 
  ],
  controllers: [LoginController], 
  providers: [AuthService,UserService,PasswordService,TokenService],
})
export class AuthModule {}