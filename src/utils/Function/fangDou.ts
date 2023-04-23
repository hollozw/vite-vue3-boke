export function debounce(fn, time:number) {
  //设置一个tiemout计数器(可用来记录setTimeout触发次数和清除计算器)
  let tiemout = null
  return function () {
    clearTimeout(tiemout)
    tiemout = setTimeout(() => {
      fn.call(this,arguments)
    }, time)
  }
}

export function throttle (fn, time:number) {
  let flag = true
  return function () {
    if(!flag) return
    flag = false
    setTimeout(()=>{
      fn.apply(this,arguments)
      flag = true
    },time)
  }
}