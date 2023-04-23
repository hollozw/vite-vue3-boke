class Canvas {
  public context: any; // getContext('2d')
  public width: number; // 当前canvas宽度
  public height: number; // 当前canvas高度
  constructor(id: any, fill: any) {
    const canvas: any = document.getElementById(id);
    // console.log(canvas);
    if (canvas) {
      this.context = canvas.getContext("2d");
      if (fill) {
        const div = document.querySelector(fill);
        this.width = div.offsetWidth;
        this.height = div.offsetHeight;
        canvas.width = this.width;
        canvas.height = this.height;
      }
    }
  }
  //获取随机数
  getRandomInt(min:number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
  }
}

export default Canvas;
