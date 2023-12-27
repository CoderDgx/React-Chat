import { message } from "antd";
import { AxiosResponse } from "axios";

// 处理所有后端返回的数据
export function processReturn(res: AxiosResponse<ServerRes>) {
  // code 0:成功 1:错误 2:后端报错
  let { code, msg, data } = res.data;
  if (code) {
    message.error(msg);
    return;
  }
  if (msg) {
    message.success(msg);
  }
  return data;
}
