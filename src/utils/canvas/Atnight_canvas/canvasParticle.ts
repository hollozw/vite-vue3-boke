/**
 * 用于存放粒子的属性
 */

class Partic {
  totalX: number; // 粒子x轴的目标位置
  totalY: number; // 粒子y轴的目标位置
  r: number; // 粒子的半径
  color: string; // 粒子的颜色
  context: any;
  ParticPositon: Array<Array<number>>; // 所有粒子的坐标
  constructor(context) {
    // 目标位置dx、dy，总耗时time
    this.context = context;
    this.r = 1;
    this.ParticPositon = [];
  }
  /**
   * 在画布中绘制粒子
   */
  draw(totalX: number, totalY: number, color: string) {
    this.context.beginPath();
    this.context.arc(totalX, totalY, 2, 0, Math.PI * 2, true);
    this.context.closePath();
    this.context.fillStyle = color;
    this.context.fill();
  }
  /**
   * 小球移动位置
   * @param: position：鼠标当前位置
   * @return: 返回小球应该移动到的位置{PostionX,PostionY}
   */

  move(
    position: Array<number>,
    ParticPositon: Array<number>,
    include
  ): IMovePostion {
    if (ParticPositon[0] - position[0] < 0) {
      if (ParticPositon[1] - position[1] < 0) {
        return {
          PostionX: ParticPositon[0] - include,
          PostionY: ParticPositon[1] - include,
        };
      } else {
        return {
          PostionX: ParticPositon[0] - include,
          PostionY: ParticPositon[1] + include,
        };
      }
    } else {
      if (ParticPositon[1] - position[1] < 0) {
        return {
          PostionX: ParticPositon[0] + include,
          PostionY: ParticPositon[1] - include,
        };
      } else {
        return {
          PostionX: ParticPositon[0] + include,
          PostionY: ParticPositon[0] + include,
        };
      }
    }
  }
}

export default Partic;
