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

- 使用 nestjs-typegoose, 解耦。 同时创建的 class Model {}, nestjs-typegoose 内部实现为 Model, 也可以作为 interface 使用实现验证等功能。通过@injectModel 注入的 ts 类型使用 @typegoose/typegoose, ModelType<T>定义, 接口函数的参数 ts 类型 使用 class Model {} 作为类型。实践结果：使用 ModelType<T> 设置类型，swagger 显示不出参数信息。

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

### 其他总结

1. ctrl + . vscode 自动修复 import 补全问题。

2. yarn upgrade-interactive --latest 用来更新 安装的包。

3. 使用 nestjs-typegoose, 解耦。 同时创建的 class Model {}, nestjs-typegoose 内部实现为 Model, 也可以作为 interface 使用实现验证等功能。通过@injectModel 注入的 ts 类型使用 @typegoose/typegoose, ModelType<T>定义, 接口函数的参数 ts 类型 使用 class Model {} 作为类型。实践结果：使用 ModelType<T> 设置类型，swagger 显示不出参数信息。
