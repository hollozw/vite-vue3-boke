/**
 * 该内容就简单练一练
 */

function myInstanceof() {
  const obj1:any = {a: 1}
  const obj2:any = {a: 2}
  let obj = {}
  obj[obj1] = 'c'
  obj[obj2] = 'b'
  console.log(obj)
}

/**
 * instance
 */


export default myInstanceof;
