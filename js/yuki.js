var canvas = document.getElementById("yuki")
var context = canvas.getContext("2d")
var w = window.innerWidth
var h = window.innerHeight
canvas.width = w
canvas.height = h
var count = 200
var snows = []
for(var i = 0 ; i < count ; i++){
	snows.push(
		{
			x:Math.random() * w,
			y:Math.random() * h,
			r:Math.random() * 5,
		}
	)
}

function draw(){
	context.clearRect(0,0,w,h)
	context.beginPath()
	for(var i = 0 ; i < count ; i++){
		var snow = snows[i]
		context.fillStyle = "rgba(255,255,255,0.5)"
		context.moveTo(snow.x , snow.y)
		context.arc(snow.x , snow.y , snow.r , 0 , Math.PI * 2)
	}
	context.fill()
	move()
}
var step = 0;
function move(){
	step += 0.01;
	for(var i = 0 ; i < count ; i++){
		var snow = snows[i]
		snow.y += (7 - snow.r) / 10
		if(snow.y > h){
			snows[i] = {x:Math.random() * w , y:0 , r:snow.r}
			
		}
	}
}
draw()
setInterval(draw,1)



