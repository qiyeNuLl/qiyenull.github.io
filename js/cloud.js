image = new Image()
image.onload = init
image.src = './img/cloud.png'

class Cloud {
    constructor(props) {
        this.x = 0
        this.y = 0
        this.xpos = 0
        this.ypos = 0
        this.zpos = 0
        this.scaleX = 1
        this.scaleY = 1
        this.visible = true
        Object.assign(this, props)
    }
    draw(ctx) {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.scale(this.scaleX, this.scaleY)
        ctx.drawImage(this.image, 0, 0, 256, 120)
        ctx.restore()
    }
}

function init() {
        canvas = document.createElement("canvas")
        canvas.style.position = "absolute"
        canvas.style.top = 0
        canvas.style.zIndex = 1;
        canvas.style.pointerEvents = "None"
        canvas.style.width = window.innerWidth + "px"
        canvas.style.height = 180 + "px"
        canvas.style.margin = 0
        DPR = window.devicePixelRatio
        document.body.appendChild(canvas)
        const width = canvas.width = canvas.clientWidth * DPR
        const height = canvas.height = canvas.clientHeight * DPR
        
        const ctx = canvas.getContext('2d')
        const clouds = createCloud(24)
        const fl = 1000


  function createCloud(nums) {
      const clouds = []
      while (nums--) {
          clouds.push(new Cloud({
              image,
              xpos: Math.random() * width * 2 - width,
              ypos: Math.random() * height - 2 * height / 3,
              zpos: Math.random() * 400 - 200
          }))
      }
      return clouds
  }
  
  function translateX(cloud) {
      let x1 = cloud.xpos + 1
      if (x1 > width)
          x1 = - width
	  else if (x1 < - width)
           x1 = width
      cloud.xpos = x1
   }
  
  
  function setPerspective(cloud) {
      // 防止比例出错要做一个判断
      if (cloud.zpos > -fl) {
          const scale = fl / (fl + cloud.zpos) // 产生 0～1 之间的一个值，用来做缩放和靠近消失点的一个比例
          cloud.scaleX = cloud.scaleY = scale
          cloud.x = width / 2 + cloud.xpos * scale
          cloud.y = cloud.ypos * scale
          cloud.visible = true
      } else {
          cloud.visible = false
      }
  }
  
  function move(cloud) {
      translateX(cloud)
      setPerspective(cloud)
   }
  
   function zsort(a, b) {
       return b.zpos - a.zpos
   }
  
   function draw(cloud) {
       if (cloud.visible && cloud.x < width) {
            cloud.draw(ctx)
        }
   }
  
   (function drawFrame() {
        window.requestAnimationFrame(drawFrame)
        ctx.clearRect(0, 0, width, height)
        clouds.sort(zsort)
        clouds.forEach(move)
        clouds.forEach(draw)
   })()
}
  
