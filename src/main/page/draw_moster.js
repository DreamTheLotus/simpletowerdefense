var create_monster = document.querySelector("#create_monster")

var stepX = 0
var stepY = 0
var next_X = 0
var next_Y = 0
var orientation = 0

var monster = function() {
	var stepX = 0
	var stepY = 0
	var next_X = 0
	var next_Y = 0
	var orientation = 0
	var json_data
	this.all_to_json = function(data) {
		try{
			json_data = JSON.parse(data)
			stepX = json_data.stepX
			stepY = json_data.stepY
			next_X = json_data.next_X
			next_Y = json_data.next_Y
			orientation = json_data.orientation
		}catch(e){
			throw "RunTimeException at all_to_json"
		}
	}
	this.jsonToString = function() {
		return '{"stepX":' + stepX + ',"stepY":' + stepY + ',"next_X":' + next_X + ',"next_Y":' + next_Y +
			',"orientation":' + orientation + '}'
	}
}

function normal_monster_step(run_times) {
	step = parseInt(run_times / 100)
	if (run_times % 100 == 0) {
		console.log("走了的格子数：" + (step) + "，当前所在坐标：" + route[step])
		//console.log("y坐标为：" + route[step].split(",")[1])
		stepX = route[step].split(",")[0]
		stepY = route[step].split(",")[1]
		if (step < route.length - 1) {
			next_X = route[step + 1].split(",")[0]
			next_Y = route[step + 1].split(",")[1]
			if (stepX > next_X && stepY == next_Y) {
				console.log("前往上边，目标坐标：" + route[step])
				orientation = 3
			} else if (stepX < next_X && stepY == next_Y) {
				console.log("前往下边，目标坐标：" + route[step])
				orientation = 1
			} else if (stepX == next_X && stepY > next_Y) {
				console.log("前往左边，目标坐标：" + route[step])
				orientation = 4
			} else if (stepX == next_X && stepY < next_Y) {
				console.log("前往右边，目标坐标：" + route[step])
				orientation = 2
			} else {
				console.log("还有别的可能？？？目标坐标：" + route[step])
				console.log(stepX + "-" + next_X + "=" + cache_X)
			}
		} else {
			orientation = 0
		}
	}
	switch (orientation) {
		case 1:
			normal_monster(stepY * 100, stepX * 100 + run_times % 100)
			break;
		case 2:
			normal_monster(stepY * 100 + run_times % 100, stepX * 100)
			break
		case 3:
			normal_monster(stepY * 100, stepX * 100 - run_times % 100)
			break
		case 4:
			normal_monster(stepY * 100 - run_times % 100, stepX * 100)
			break
		default:
			normal_monster(stepY * 100, stepX * 100)
			break;
	}
}

function normal_monster(multipleX, multipleY) {
	monster_pen.beginPath()
	monster_pen.arc((multipleX * 0.01 + 0.5) * $10mapVW, (multipleY * 0.01 + 0.5) * $10mapVW, 0.15 * $10mapVW, 0,
		360, false);
	monster_pen.lineWidth = 2
	monster_pen.strokeStyle = "#000000"
	monster_pen.stroke()
}
