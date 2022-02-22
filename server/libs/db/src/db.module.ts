import { TypegooseConnectionOptions, TypegooseModule } from 'nestjs-typegoose';
import { Module } from '@nestjs/common';
import { DbService } from './db.service';

@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost/blog', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    } as TypegooseConnectionOptions),
  ],
  providers: [DbService],
  exports: [DbService],
})
export class DbModule {}
