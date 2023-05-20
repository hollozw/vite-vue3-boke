import Canvas from "..";
import Partic from "./canvasParticle";

class particCanvas extends Canvas {
  photoData: any;
  id: string;
  ParticPositon: Array<IPartical>; // 所有粒子的坐标,颜色
  partic: Partic; // 绘制小球的class类
  constructor(id: any, fill: any) {
    super(id, fill);
    this.id = id;
    this.ParticPositon = [];
  }
  /**
   * 获取图片数据
   */
  async getPhotoData(src: string) {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      this.context.drawImage(img, 0, 0, this.width, this.height);
      this.photoData = this.context.getImageData(
        0,
        0,
        this.width,
        this.height
      ).data;
      this.getPartic(this.photoData);
    };
  }
  /**
   * 绘制像素图形
   */
  getPartic(photoData) {
    this.context.clearRect(0, 0, this.width, this.height);
    this.partic = new Partic(this.context);
    let i = 0;
    for (let y = 0; y < this.height; y += 5) {
      for (let x = 0; x < this.width; x += 5) {
        let index: number = (x + y * this.width) * 4;
        const r = photoData[index];
        const g = photoData[index + 1];
        const b = photoData[index + 2];
        const a = photoData[index + 3];
        let color = `rgba(${r},${g},${b},${a})`;
        let obj = { PostionX: x, PostionY: y, color };
        this.partic.draw(x, y, color);
        this.ParticPositon[i] = obj;
        i++;
      }
    }
  }
  /**
   * 移动鼠标时触发
   * @param: position：鼠标当前位置
   */
  mouseMoving(position: Array<number>, include: number) {
    this.context.clearRect(0, 0, this.width, this.height);
    this.ParticPositon.forEach((item, index) => {
      if (
        (item.PostionX - position[0]) ** 2 +
          (item.PostionY - position[1]) ** 2 <
        include ** 2
      ) {
        let newPartical = this.partic.move(
          position,
          [item.PostionX, item.PostionY],
          include
        );
        this.partic.draw(
          newPartical.PostionX,
          newPartical.PostionY,
          item.color
        );
        return;
      }
      this.partic.draw(item.PostionX, item.PostionY, item.color);
    });
  }
}

export default particCanvas;
