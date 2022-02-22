### Nest

技术栈总结：使用的依赖包

> mongDB 数据库

mongoose: 基于 js 写的 mongoDB 的 tool 库。自己提供了 type definitions。

@typegoose/typegoose: 使用 typescirpt 写 mongDB 模型,提供类型支持及装饰器功能; 依赖 mongoose。官方文档：https://typegoose.github.io/typegoose/docs/guides/quick-start-guide#install。

nestjs-typegoose: ts 支持; @nestjs/mongoose: js 版本。

> Crud 通用插

nestjs-mongoose-crud: 全栈之巅作者自己，封装的 Crud 的开源库。牛逼！依赖 nestjs-typegoose or @nestjs/mongoose。

> nest 自身支持 Swagger

@nestjs/swagger swagger-ui-express: express 模式

@nestjs/swagger fastify-swagger: fastify 模式

> 验证方面

class-validator：验证

class-transformer：数据格式转换

??? typescript type ModelType<T> = mongoose.Model<DocumentType<T>, {}> & T

### Model

#### article

```json
{
    title: 标题,
    content: 内容,
    tag: 标签,
    digest: 摘要,
    imgUrl: 封面url,
    createTime: 创建时间,
    updataTime: 更新事件,

	category: 类型, // 关联构思
    user: 用户,
    comment：评论,
}
```
