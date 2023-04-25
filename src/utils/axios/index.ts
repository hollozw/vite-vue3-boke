import request from "./reques";

export function test(data: IForm) {
  return request({
    url: "/login",
    method: "POST",
    data,
  });
}
// 注册接口
export function login(data) {
  return request({
    url: "/user/login",
    method: "POST",
    data,
  });
}

// 登录接口
export function landing(data: IForm) {
  return request({
    url: "/user/land",
    method: "POST",
    data,
  });
}

export function bokeList(data) {
  return request({
    url: "/boke/List",
    method: "POST",
    data,
  });
}
