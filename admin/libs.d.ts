import type { AxiosRequestConfig } from "axios"

declare module "axios" {
  interface AxiosRequestConfig {
    _isToken?: boolean
    _isCancel?: boolean
  }
}
