import Io from "@/utils/io";

const io = new Io(
  {
    baseURL: "/",
  },
  {
    _isCancle: false,
  },
);

io.addReqInterceptor([
  (config) => {
    // config.url = 'taobao.com'
    console.log(config, "拦截器1");
    return config;
  },
  (config) => {
    // config.url = 'jd.com'
    console.log(config, "拦截器2");
    return config;
  },
]);

io.addResInterceptor(
  (res) => {
    console.log(res, "响应1");
    return res;
  },
  (erorr) => {
    console.console.log(111, erorr);
  },
);

const request = io.instance;

request({
  url: "/admin/0",
  _isCancle: true,
});

request({
  url: "/admin/1",
  _isCancle: true,
});

request({
  url: "/admin/2",
  _isCancle: true,
}).then(() => {
  io.removeAllCancel();
});
