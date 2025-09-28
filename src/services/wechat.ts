 

import http, { ApiResponse } from './http';

export const getWeChatUrl = (id: string | number) => {
  return http.get(`/contractView/v2/wechatUrl/${id}`, {});
}

