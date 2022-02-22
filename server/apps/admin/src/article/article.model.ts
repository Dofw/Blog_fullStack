import { modelOptions, prop } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export default class ArticleModel {
  @prop()
  title: string;
  @prop()
  content: string;
  @prop()
  tag: string;
  @prop()
  digest: string;
  @prop()
  imgUrl: string;
}

// category: "类型",// 关联构思
//   user: "用户",
//   comment："评论",
