import { modelOptions, prop } from '@typegoose/typegoose';
import { hashSync } from 'bcrypt';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export default class User {
  @prop()
  username: string;

  @prop({
    select: false,
    set(val) {
      return val ? hashSync(val, 10) : val;
    },
  })
  password: string;
}
