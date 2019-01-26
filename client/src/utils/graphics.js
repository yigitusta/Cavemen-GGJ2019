


export function addRect({ x, y, width, height, color=0xffffff, alpha=1 , ctx }) {
  const rect = ctx.add.graphics({
    fillStyle: {
      color,
      alpha
    }
  });

  rect.fillRect( x, y, width, height);
  return rect;
}


export function addLine({ x, y, x2, y2, color, alpha=1, stroke=4, ctx }) {
  const line = ctx.add.graphics({
    lineStyle: {
      color,
      alpha,
      width: stroke,
    }
  })

  line.moveTo(x, y);
  line.lineTo(x2, y2);
  line.strokePath();
}


export function addShape({x, y, width, height, color=0xffffff, stroke=4, alpha=1, ctx }) {
  const shape = ctx.add.graphics({
    lineStyle: {
      width: stroke,
      color,
      alpha
    },
  });

  shape.strokeRect(x, y, width, height)
}

export function addCircle({ x, y, radius= 50, line, fill,  ctx }) {
  const circle = ctx.add.graphics();

  if (line) {
    circle.lineStyle(line.stroke, line.color);
    circle.strokeCircle(x, y, radius);
  }

  if (fill) {
    circle.fillStyle(fill.color, fill.alpha);
    circle.fillCircle(x, y, radius);
  }
}




/* Example Usage */

/*

    Graphics.addRect({
      x: 0,
      y: 0,
      width: this.game.renderer.width,
      height: this.game.renderer.height,
      color: 0xEEEEEE,
      ctx: this
    });

    Graphics.addLine({
      x: 100,
      y: 100,
      x2: 400,
      y2: 300,
      color: 0xe74c3c,
      stroke: 4,
      ctx: this
    });

    Graphics.addShape({
      x: 400,
      y: 100,
      width: 300,
      height: 100,
      color: 0x1abc9c,
      stroke: 4,
      ctx: this
    })

    Graphics.addCircle({
      x: 100,
      y: 500,
      radius: 100,
      line: {
        stroke: 6,
        color: 0xCCCCCC
      },
      fill: {
        color: 0x2c3e50,
        alpha: 1,
      },
      ctx: this
    })

*/
