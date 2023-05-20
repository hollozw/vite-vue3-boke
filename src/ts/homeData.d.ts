interface IArrList {
  user_name?: string;
  title: string;
  nav: string;
  type: string;
  code: number;
  image?: string;
}

interface IVArrList {
  value: Array<IArrList>;
}

/**
 * 粒子位置和颜色
 */
interface IPartical {
  PostionX: number;
  PostionY: number;
  color: string;
}

/**
 * 鼠标移动后粒子的新位置
 */
interface IMovePostion {
  PostionX: number;
  PostionY: number;
}
