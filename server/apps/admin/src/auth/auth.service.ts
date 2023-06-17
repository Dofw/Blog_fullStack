import { LoginUser } from '@libs/mysql/models/loginUser.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import RegisterUserDto from './dto/registerUser.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(LoginUser) private loginUserModel: Repository<LoginUser>,
  ) {}

  // user模式
  async uSave(data: RegisterUserDto | Omit<RegisterUserDto, 'id'>) {
    return await this.loginUserModel.save(data);
  }
  async uDelete() {}
  async uGet() {
    return await this.loginUserModel.find();
  }

  // // phone 模式
  // pSave() {}
  // pDelete() {}
  // pGet() {}

  // // oAuth2 模式
  // oSave() {}
  // oDelete() {}
  // opGet() {}
}
