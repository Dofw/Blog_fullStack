## 文件传输(上传、下载)
1. XMLHttpRequest.responseType 参见mdn。(待不存)

## 数据传入进度分类

### 响应进度

1. fetch (详见 MDN)

- 概况: 更加强大、灵活。将关注点进行分离：提供了 Request、Response、Headers 构造函数，来控制请求和响应。Fetch 还提供了专门的逻辑空间来定义其他与 HTTP 相关的概念，例如 CORS 和 HTTP 的扩展。

- 灵活性的应用场景：通常在 service worker / Cache API 等中被封装应用。或者需要自己在程序中生成相应的方式。

- 读取器 Api：

  res.body.getReader 读取器方法。

```js
async function Request() {
  const res = await fetch(url) // 这个是响应头传输完成，resolve。

  const text = await res.text() // json、text、等这些方法要等响应体全部传输完成才触发resolve。

  const reader = res.body.getReader() // 提供了专门读取 body体 的 读取器api。流数据可以获取总数据量、已读数据量，做进度效果。

  const decoder = new TextDecoter() // 文本解析器。类似的流文件读取器等等。

  let progress = 0
  let total = res.headers.get("content-length") // 获取文件的总字节数。

  while (1) {
    const { value, done } = await reader.read() // 数据为字节数组，根据需要做解析操作。
    if (done) break

    progress += value.length

    const text = decoder.decode(value) // 注意出里文字乱码问题
    console.log(text)
  }
}
```

- 区别：

  错误的 http 状态码（例如：404/500 等），并不会使得 fetch 返回的 Promise 进入 reject，而是 resolve（mdn：http 状态不在 200-299 的范围，resolve 返回值的 ok 属性为 false），仅当网络故障时/请求被阻止时，才会被标记为 reject。

  fetch 不会发送跨域 cookie，除非你使用了 credentials（资格认证/证书）的 fetch 初始化配置选项。（2018 年 8 月以后，默认 credencials 政策为 same-origin）

2. XMLHttpRequest

XML.addEventListener('progress', (e) => { // e.loaded // e.total })

```


```

### 请求进度

1. fetch 目前不可以(原因是 可读流只能由一个角色去读取管理--浏览器用来读取发送给服务器，同时也没有提供相应的方法获取这个数据)，w3c 在讨论一种方案。ServerWorker 中 BackgroundFetchManager API

2. XMLHttpRequest 可以实现。

XML.upliad.addEventListener('progress', (e) => { // e.loaded // e.total })

---

### CORS 方案 将请求的分类

1. 简单请求

要求 1: 请求方法 GET/HEAD/POST

要求 2: 头部字段满足 CORS 安全规范，详见 W3C(袁佬,不修改)

要求 3: Content-Type 为 text/plain、multipart/form-data、application/x-www-form-urlencoded

首先如果跨域，浏览器会自动带上 Origin:当前页面源；服务器通过 Access-Control-Allow-Origin: \*。告知浏览器所有源都没问题，来控制是否允许。

2. 预检请求

非简单请求即为预检请求。

浏览器认为存在危险，需要先想服务器询问一下；通过 OPTIONS 方法，同时带上 Origin: http://my.com 字段源，Access-Control-Request-Method: POST 请求方法字段，Access-Control-Request-Headers: a,b 改动的 header 字段。

服务器端根据预检信息设置响应头: Access-Control-Allow-Origin: http://my.com, Access-Control-Request-Method: POST,Access-Control-Request-Headers: a,b Access-Control-Max-Age: 86400。这些条件告知客户端，该源该方法该改动 header，在 86400 生命周期。不需要在做预检直接通过。

预检完成，进行第二次发送真实请求就和普通请求一样了。

---

### 请求体的传输格式

1. multipart/form-data 类型

Content-Type: multipart/form-data; boundary=aaa(分隔符)

--aaa

Content-Disposition: form-data; name="键名"; fileName='文件名'

Content-Type: image/jpeg(与请求体的不同，是 MIME)

文件二进制数据

--aaa

内容 1

--aaa

内容 2

--aaa-- (两个--结尾, 如何写，根据接口要求来定 )

2. 二进制 类型(最常见、最简单)

Content-Type: application/octet-stream

x-ext: 文件的后缀名，.png; // 接口约定时设置请求头。

请求体: 二进制数据
