function compute_coordinate() {
	var cache_monster = new monster()
	var stepX = 0
	var stepY = 0
	var orientation = 0
	var deviation = 0
	var positionX = 0
	var positionY = 0
	for (let data of monster_list) {
		cache_monster.all_to_json(data[1])
		stepX = cache_monster.get_stepX()
		stepY = cache_monster.get_stepY()
		orientation = cache_monster.get_orientation()
		deviation = cache_monster.get_deviation()
		switch (orientation) { //计算坐标
			case 1:
				normal_monster(stepY * 1000, stepX * 1000 + deviation)
				break;
			case 2:
				normal_monster(stepY * 1000 + deviation, stepX * 1000)
				break
			case 3:
				normal_monster(stepY * 1000, stepX * 1000 - deviation)
				break
			case 4:
				normal_monster(stepY * 1000 - deviation, stepX * 1000)
				break
			default:
				normal_monster(stepY * 1000, stepX * 1000)
				break;
		}
	}
}

//最终绘制
function normal_monster(multipleX, multipleY) {
	console.log("坐标是：" + (multipleX * 0.001 + 0.5) * $10mapVW + "," + (multipleY * 0.001 + 0.5) * $10mapVW)
	monster_pen.beginPath()
	monster_pen.arc((multipleX * 0.001 + 0.5) * $10mapVW, (multipleY * 0.001 + 0.5) * $10mapVW, 0.15 * $10mapVW, 0,
		360, false);
	monster_pen.lineWidth = 2
	monster_pen.strokeStyle = "#000000"
	monster_pen.stroke()
}
