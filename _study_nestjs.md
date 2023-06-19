[toc] 目录

## 概念名词

ORM: 对象关系映射 Object-relationnal-mapping

## 实践中问题：

1. @PrimaryGeneratedColumn('uuid'), 可能由于版本的问题, 每次保存 entity 等操作, 会将数据库对应的主键 id 取消。导致报错主键 duplicate
   解决: 改成 increment、 或者手动添加 uuid。

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
