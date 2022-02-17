### Nest

技术栈总结：使用的依赖包

- mongDB 数据库

<!-- @type/mongoose: 基于 ts 的类型定义。(2年前，没有找到)。 -->

mongoose: 基于 js 写的 mongoDB 的 tool 库。

@typegoose/typegoose: 使用 typescirpt 写 mongDB 模型,提供类型支持及装饰器功能; 依赖 mongoose。官方文档：https://typegoose.github.io/typegoose/docs/guides/quick-start-guide#install。

@nestjs-mongoose: js 版本。

@nestjs-typegoose: ts 支持。

- Crud 通用插件

nestjs-mongoose-crud: 全栈之巅作者自己，封装的 Crud 的开源库。牛逼！依赖 @nestjs-typegoose or @nestjs-mongoose。

- nest 自身支持 Swagger

@nestjs/swagger swagger-ui-express: express 模式

@nestjs/swagger fastify-swagger: fastify 模式

- 验证方面

class-validator：验证

class-transformer：数据格式转换
