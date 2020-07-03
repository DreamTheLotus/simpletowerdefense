var table = document.querySelector("#table") //获取table标签
const $VW = document.documentElement.clientWidth //获取页面宽度
const $10VW = $VW * 0.1 //制作10%的页面宽度，对等于原生10vw
const $mapVW = $VW * 0.40 //map标签为40vw宽度
const $10mapVW = $mapVW * 0.1 //制作每10%的map宽度
table.innerHTML = '<canvas id="map" width="' + ($mapVW+1) + 'px" height="' + ($mapVW+1) + 'px"></canvas>' //渲染出map的canvas标签
var map = document.querySelector("#map") //获取map标签
var map_pen = map.getContext("2d"); //获取canvas画笔
var monster_pen = map.getContext("2d")
var route = new Array() //声明路径数组
var first = false

//游戏地图
var game_map = [
	[8, 7, 7, 7, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 7, 0, 7, 7, 7, 7, 7],
	[0, 0, 0, 7, 0, 7, 0, 0, 0, 7],
	[0, 7, 7, 7, 0, 7, 0, 0, 0, 7],
	[0, 7, 0, 0, 0, 7, 7, 7, 0, 7],
	[7, 7, 0, 0, 0, 0, 0, 7, 0, 7],
	[7, 0, 0, 7, 7, 7, 0, 7, 0, 7],
	[7, 0, 0, 7, 0, 7, 0, 7, 0, 7],
	[7, 7, 7, 7, 0, 7, 0, 7, 0, 7],
	[0, 0, 0, 0, 0, 7, 7, 7, 0, 9]
]

//一个方砖的属性闭包函数
var tile = function() {
	var x = 0
	var y = 0
	this.setX = function(data) {
		x = data
	}
	this.setY = function(data) {
		y = data
	}
	this.getX = function() {
		return x
	}
	this.getY = function() {
		return y
	}
	this.push = function(dataX, dataY) {
		x = dataX
		y = dataY
	}
}

//声明tile闭包函数
var main = new tile()

init_map()
//normal_monster()

function init_map() {
	draw_table()
	build_route()
}

function draw_table() {
	for (let i = 0; i <= 10; i++) {
		vertical(i)
		horizontal(i)
	}
	draw_route()
}

function vertical(i) { //绘制竖线
	map_pen.beginPath()
	map_pen.lineWidth = 2
	map_pen.moveTo(i * $10mapVW, 0)
	map_pen.lineTo(i * $10mapVW, $mapVW)
	map_pen.strokeStyle = "#a0a0a0"
	map_pen.stroke()
}

function horizontal(i) { //绘制横线
	map_pen.beginPath()
	map_pen.lineWidth = 2
	map_pen.moveTo(0, i * $10mapVW)
	map_pen.lineTo($mapVW, i * $10mapVW)
	map_pen.strokeStyle = "#a0a0a0"
	map_pen.stroke()
}

function draw_route() {
	for (let x = 0; x < game_map.length; x++) {
		for (let y = 0; y < game_map[x].length; y++) {
			switch (game_map[x][y]) {
				case 7:
					table_style_7(y, x)
					break
				case 8:
					main.push(y, x)
					if (!first) {
						first = true
						route.push(y + "," + x)
					}
					table_style_8(y, x)
					break
				case 9:
					table_style_9(y, x)
					break
			}
		}
	}
}

function table_style_9(x, y) {
	map_pen.beginPath();
	map_pen.arc((x + 0.5) * $10mapVW, (y + 0.5) * $10mapVW, 0.35 * $10mapVW, 0, 360, false);
	map_pen.lineWidth = 2
	map_pen.strokeStyle = "#a0a0a0";
	map_pen.stroke(); //画空心圆
}

function table_style_8(x, y) {
	map_pen.beginPath()
	map_pen.lineWidth = 2
	map_pen.moveTo((x + 0.1) * $10mapVW, (y + 0.1) * $10mapVW)
	map_pen.lineTo((x + 0.9) * $10mapVW, (y + 0.9) * $10mapVW)
	map_pen.strokeStyle = "#a0a0a0"
	map_pen.stroke()

	map_pen.beginPath()
	map_pen.lineWidth = 2
	map_pen.moveTo((x + 0.1) * $10mapVW, (y + 0.9) * $10mapVW)
	map_pen.lineTo((x + 0.9) * $10mapVW, (y + 0.1) * $10mapVW)
	map_pen.strokeStyle = "#a0a0a0"
	map_pen.stroke()
}

function table_style_7(x, y) {
	map_pen.beginPath()
	map_pen.lineWidth = 2
	map_pen.moveTo((x + 0.1) * $10mapVW, (y + 0.1) * $10mapVW)
	map_pen.lineTo((x + 0.9) * $10mapVW, (y + 0.1) * $10mapVW)
	map_pen.lineTo((x + 0.9) * $10mapVW, (y + 0.9) * $10mapVW)
	map_pen.lineTo((x + 0.1) * $10mapVW, (y + 0.9) * $10mapVW)
	map_pen.fillStyle = "#a0a0a0"
	map_pen.fill()
}

function build_route() {
	var limit = 0
	var nowX = 0
	var nowY = 0
	var nextX = 0
	var nextY = 0
	var end = false
	var next = "未知"
	var check_next = false //作为next的判定，禁止套娃
	var error = true
	var check_data
	//直到路径扫描完毕结束
	while (true) {
		nowX = main.getX()
		nowY = main.getY()
		for (let i = 0; i < 4; i++) {
			check_data = eval("check_" + i + "(" + main.getX() + "," + main.getY() + ")")
			if (check_data != "error") { //如果查出的数据不是错误
				//console.log(check_data)
				nextX = check_data.split("-")[0]
				nextY = check_data.split("-")[1]
				if (check_data.split("-")[2] == 0) {
					end = false
				} else {
					end = true
				}
				error = false
				next = "未发现"
				next = check_rollback(nextX, nextY)
			} else {
				error = true
			}
			if (check_data != "error" && next == "未发现") { //如果，查出不是错误，并且next不是存在
				break
			}
		}
		if (next == "未发现" && !error) { //如果next是未发现状态，并且，存储数据不是错误
			main.push(nextX, nextY)
			route.push(String(nextX + "," + nextY))
		}
		if (end) {
			break
		}
	}
}

function check_0(nowX, nowY) { //检查上面
	if (nowY - 1 >= 0) {
		if (game_map[nowX][nowY - 1] == 7) {
			return nowX + "-" + (nowY - 1) + "-" + 0
		} else if (game_map[nowX][nowY - 1] == 9) {
			return nowX + "-" + (nowY - 1) + "-" + 1
		}
		return "error"
	}
	return "error"
}

function check_1(nowX, nowY) { //检查右面
	if (nowX + 1 < game_map[0].length) {
		if (game_map[nowX + 1][nowY] == 7) {
			return (nowX + 1) + "-" + nowY + "-" + 0
		} else if (game_map[nowX + 1][nowY] == 9) {
			return (nowX + 1) + "-" + nowY + "-" + 1
		}
		return "error"
	}
	return "error"
}

function check_2(nowX, nowY) { //检查下面
	if (nowY + 1 < game_map[0].length) {
		if (game_map[nowX][nowY + 1] == 7) {
			return nowX + "-" + (nowY + 1) + "-" + 0
		} else if (game_map[nowX][nowY + 1] == 9) {
			return nowX + "-" + (nowY + 1) + "-" + 1
		}
		return "error"
	}
	return "error"
}

function check_3(nowX, nowY) { //检查左面
	if (nowX - 1 >= 0) {
		if (game_map[nowX - 1][nowY] == 7) {
			return (nowX - 1) + "-" + nowY + "-" + 0
		} else if (game_map[nowX - 1][nowY] == 9) {
			return (nowX - 1) + "-" + nowY + "-" + 1
		}
		return "error"
	}
	return "error"
}

function check_rollback(nextX, nextY) { //检查是否回头路
	for (let i = 0; i < route.length; i++) {
		if (route[i].split(",")[0] == nextX && route[i].split(",")[1] == nextY) {
			return "存在"
		}
	}
	return "未发现"
}

function clean_map() {
	monster_pen.clearRect(0, 0, $mapVW, $mapVW)
	draw_table()
}
