export const ERROR_TYPES = {
  //1XXXX 表示系统层面的错误, 包括语法等, 参数, 网络等
  system_inner_error: 100001,
  network_error: 100002,
  http_status_error: 100003,
  http_status_api_notsupport_error: 100004,
  http_status_unauth: 100005,

  //4xxxx 表示server端相关的错误, 数据格式, 参数
  remote_data_unsuccess: 400001,

  //3xxxx 表示本地数据异常
  local_token_invalid: 300001,
  db_error: 300002,
  local_psw_invalid: 300003,
};


