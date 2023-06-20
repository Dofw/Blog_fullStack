[toc] 目录

## 概念名词

ORM: 对象关系映射 Object-relationnal-mapping

## 实践中问题

1. @PrimaryGeneratedColumn('uuid'), 可能由于版本的问题, 每次保存 entity 等操作, 会将数据库对应的主键 id 取消。导致报错主键 duplicate
   解决: 改成 increment、 或者手动添加 uuid。

2. @Injectable() 所起的作用是啥？待源码分析。

3. RxJS Observable ？

## nestjs 应用架构思想

旨在提高代码的高可维护性、高可扩展性！！

1. 全局 configs 配置问题(同环境变量文件结合, 见:config 相关实践)
   - 公共配置 common.config.ts
   - 数据库配置 database.config.ts
2. 全局模块、局部模块考量。
3. 权限问题
4. 自定义(中间件、异常过滤器、管道、守卫、拦截器), 明确用途选择合适的方式, 同时明确使用范围(全局、模块、路由)等问题考量。
5. 自定义装饰器(需要深入 reflect-metadata)

## nestjs 业务功能

1. oauth2 认证 第三方登录认证。
2. 安全 jwt 登录鉴权
3. upload 上传功能
4. websockets
5. ...

## 中间件、异常过滤器、管道、守卫(passport)、拦截器最佳实践应用 (使用见官网)

1. 中间件
   - 在路由处理程序之前调用的函数。
   - 执行任何代码
   - 修改请求、响应对象
   - 通过 next 控制请求的结束、挂起、下一个中间件的运行操作。
   - 函数中间件
   - 使用范围: 全局、module 中指定具体的路由使用。
2. 异常过滤器

   - 解决问题: 内置异常过滤器处理不了动态因素返回的异常。因此需要自定义,同时拥有异常层拥有的完全控制权。

   - 执行时机: 在异常层,负责处理整个应用程序中的所有抛出的异常, 目的捕获异常定制友好的响应结果。

   - 使用范围: 全局(main、provide 同时存在。provide 方式的全局没有执行 )、控制器、方法

   - 内置异常过滤器处理逻辑: 只处理 throw HttpException/及其子类的异常。非 HttpException 及子类，用户将收到一个体验不好的 json 响应。

   - 自定义异常: 可以自定义 throw Class, 在 filter 中根据类型做相应处理。

   - 自定义异常过滤器: 所有异常过滤器都应该实现通用的 ExceptionFilter<T> 接口。它需要你使用有效签名提供 catch(exception: T, host: ArgumentsHost)方法。T 表示异常的类型

3. 拦截器

   - 概念: 使用@injectable() 装饰器注解的类, 拦截器应该实现 NestInterceptor 接口。

   - 特点: 1. 在函数执行之前、之后绑定额外的逻辑; 2. 转换从函数返回的结果; 3. 转换从函数抛出的异常; 4. 扩展基本函数行为; 5. 根据所选条件完全重写函数。

   -

## nestjs 技术

1. 数据库
2. validator
3. 高速缓存 caching
4. 序列化 serialization
5. 定时任务
6. 队列
7. 日志
8. cookies
9. 事件
10. 压缩
11. 文件上传
12. 流处理文件
13. http 模块
14. session
15. mvc
16. 性能
17. 服务器端事件发送

## config 相关实践

1. nestjs 初始化时没有区分环境的, 故需要 install cross-env。

```js
   // package.json中配置
   "start": "cross-env NODE_ENV=dev nest..."
```

2. 本项目使用环境文件 .dev.env .prod.env .env(ignore), .example.env(no ignore) (保证代码中不会存在密钥信息)
3. 在 ConfigModule 模块注册的位置, 通过判断环境, 改变 envFilePath 的值。
4. 所有使用 env 变量的都统一在 common/confs 下管理, 通过@nestjs/config 的 ConfigService 来使用。(集中管理)
