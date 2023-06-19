import { LoginUser } from '@libs/mysql/models/loginUser.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import {
  Repository,
  type FindManyOptions,
  type FindOptionsWhere,
} from 'typeorm';
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
  async uDelete(condition: number | number[] | FindOptionsWhere<LoginUser>) {
    // return await this.loginUserModel.delete(condition);
    return await this.loginUserModel.softDelete(condition); // 软删除
  }
  async uGet(condition?: FindManyOptions<LoginUser>) {
    const result = await this.loginUserModel.find(condition);
    return result;
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
