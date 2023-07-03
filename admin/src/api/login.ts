import request from "@/request"

export async function loginApi(params) {
  return await request({
    url: "/auth/user/login",
    method: "post",
    data: params,
    _isToken: false
  })
}
