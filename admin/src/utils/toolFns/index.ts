/**
 * 1.调用接口封装, 解决 使用 try..catch繁琐的问题。【Vue中简化书写】
 *
 * apiHandler(async (params)=>void, params, {
 *  successMsg: "操作成功",
 *  errorMsg: "操作失败",
 *  cb: null
 * })
 *
 */

interface ApiHanlderOption {
  successMsg?: string
  errorMsg?: string
  cb?: null | ((res: any) => void)
}

export async function apiHandler<T>(
  this: any,
  fn: (params: T) => Promise<any>,
  params: T,
  option: ApiHanlderOption
) {
  const defaultOption: ApiHanlderOption = {
    successMsg: "操作成功",
    errorMsg: "操作失败",
    cb: null
  }
  option = { ...defaultOption, ...option }

  let res
  try {
    res = await fn(params)
    this.$message.success(option.successMsg)
    return res
  } catch (error) {
    this.$message.error(option.errorMsg)
  } finally {
    const cb = option.cb
    cb && cb(res)
  }
}
