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

export function loginImg(data) {
  return request({
    url: "/user/loginHref",
    method: "POST",
    data,
  });
}

export function getUserImg(data) {
  return request({
    url: "/user/getHref",
    method: "POST",
    data,
  });
}

export function updateUserImg(data) {
  return request({
    url: "/user/updateHref",
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

/**
 * 用户删除
 */
export function userDelet(data) {
  return request({
    url: "/user/delete",
    method: "POST",
    data,
  });
}

export function userUpdate(data) {
  return request({
    url: "/user/update",
    method: "POST",
    data,
  });
}

/**
 * 获取博客列表
 */
export function getbokeList(data) {
  return request({
    url: "/boke/List",
    method: "POST",
    data,
  });
}

export function SearchBokeList(data) {
  return request({
    url: "/boke/SearchList",
    method: "POST",
    data,
  });
}

/**
 * 文件上传功能
 */
export function addBoke(data) {
  return request({
    url: "/boke/uploadfile",
    method: "POST",
    data,
  });
}

/**
 * 用户图片上传
 */

export function userImg(data) {
  return request({
    url: "/user/userImgName",
    method: "POST",
    data,
  });
}

/**
 * 用户发表评论
 */
export function talk(data) {
  return request({
    url: "/boke/talk",
    method: "POST",
    data,
  });
}

/**
 * 获取博客列表nav
 */
export function getNavs(data) {
  return request({
    url: "/boke/gettalk",
    method: "POST",
    data,
  });
}
 