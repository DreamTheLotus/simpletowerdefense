var stepX = 0
var stepY = 0
var next_X = 0
var next_Y = 0
var orientation = 0

/**
 * 当每一次运行的时候，需要遍历集合内部的所有对象的数据
 * 获取路径长度，将长度x1000
 * 计算行走所需时间
 * 确定当前坐标，确定下一个方向
 * 根据行动速度计算偏移量
 */
function load_monster_list() {
	var cache_monster = new monster() //确定缓存的对象类型
	//三个时间已经用完了
	var last_time = 0
	var now_time = 0
	var difference_time = 0
	//偏移值已经计算完了
	var deviation = 0 //单次结算的移动偏移值
	var cache_deviation = 0
	var cache_step = 0
	for (let data of monster_list) {
		cache_monster.all_to_json(data[1]) //已经给缓存对象注入数据了
		now_time = new Date().getTime().toString()
		if (cache_monster.get_last_time() < 0) { //如果历史时间不存在
			console.log("该不会不存在吧")
			//TODO 下行代码仅作为开发调试而用，后面需要将string去除，以int运行实现性能的提升
			cache_monster.set_last_time(now_time) //创建一个初始化历史时间，因为如果不是undefined，那么，它是已经在地图上行走中的
		}
		last_time = cache_monster.get_last_time()
		difference_time = now_time - last_time
		deviation = cache_monster.get_speed() * difference_time //利用速度x结算的时间差去得出移动的偏差值
		cache_monster.set_last_time(now_time)
		cache_deviation = cache_monster.get_deviation() + deviation
		if (cache_deviation > 1000) {
			cache_step = cache_monster.get_step()
			cache_deviation -= 1000
			cache_step++
			cache_monster.set_step(cache_step)
		}
		cache_monster.set_deviation(cache_deviation)
		if (cache_step > (route.length - 1)) {
			console.log("怪物清除计划")
			monster_list.delete(data[0])
			continue
		} else {
			monster_step(cache_monster)
			monster_list.set(data[0], cache_monster.jsonToString())
		}
		//console.log(monster_list)
	}
}
/**
 * 根据step计算当前处在哪个位置
 * 计算下一个的方向在哪
 * 如果是终点，则下个方向为0
 */
function monster_step(cache_monster) {
	var step = cache_monster.get_step()
	var stepX = route[step].split(",")[0]
	var stepY = route[step].split(",")[1]
	var next_X = 0
	var next_Y = 0
	var orientation = 0
	var cache_X = 0
	var cache_Y = 0
	cache_monster.set_stepX(stepX)
	cache_monster.set_stepY(stepY)
	if (step < route.length-1) { //抉择方向
		next_X = route[step + 1].split(",")[0]
		next_Y = route[step + 1].split(",")[1]
		//这个代码块有问题
		if (stepX > next_X && stepY == next_Y) {
			console.log("前往上边，目标坐标：" + route[step + 1])
			orientation = 3
		} else if (stepX < next_X && stepY == next_Y) {
			console.log("前往下边，目标坐标：" + route[step + 1])
			orientation = 1
		} else if (stepX == next_X && stepY > next_Y) {
			console.log("前往左边，目标坐标：" + route[step + 1])
			orientation = 4
		} else if (stepX == next_X && stepY < next_Y) {
			console.log("前往右边，目标坐标：" + route[step + 1])
			orientation = 2
		} else {
			console.log("还有别的可能？？？目标坐标：" + route[step + 1])
			console.log(stepX + "-" + next_X + "=" + stepX - next_X + "," + stepX - next_Y)
		}
	} else {
		orientation = 5
	}
	cache_monster.set_orientation(orientation)
}

//过时方法
function obsolete_monster_step(run_times) {
	step = parseInt(run_times / 100)
	if (run_times % 100 == 0) {
		console.log("走了的格子数：" + (step) + "，当前所在坐标：" + route[step])
		//console.log("y坐标为：" + route[step].split(",")[1])
		stepX = route[step].split(",")[0]
		stepY = route[step].split(",")[1]
		if (step < route.length - 1) { //抉择方向
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
	switch (orientation) { //计算坐标
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
//最终绘制
function normal_monster(multipleX, multipleY) {
	monster_pen.beginPath()
	monster_pen.arc((multipleX * 0.01 + 0.5) * $10mapVW, (multipleY * 0.01 + 0.5) * $10mapVW, 0.15 * $10mapVW, 0,
		360, false);
	monster_pen.lineWidth = 2
	monster_pen.strokeStyle = "#000000"
	monster_pen.stroke()
}
