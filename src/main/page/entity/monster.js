var monster = function() {
	var id = 0 //当前怪物的id
	var stepX = 0 //当前所在的格子x坐标
	var stepY = 0 //当前所在的格子y坐标
	var nextX = 0 //下一步的格子x坐标
	var nextY = 0 //下一步的格子y坐标
	var orientation = 0 //朝向
	var deviation = 0 //偏移量
	var last_time = 0//上一次检索的时间
	var speed = 0//速度
	var step = 0//行走步数
	var json_data
	this.all_to_json = function(data) {
		try {
			json_data = JSON.parse(data)
			stepX = json_data.stepX
			stepY = json_data.stepY
			//nextX = json_data.nextX
			//nextY = json_data.nextY
			orientation = json_data.orientation
			deviation = json_data.deviation
			last_time = json_data.last_time
			speed = json_data.speed
			step = json_data.step
		} catch (e) {
			throw "RunTimeException at all_to_json"
		}
	}
	this.get_stepX = function() {
		return stepX
	}
	this.set_stepX = function(data) {
		stepX = data
	}
	this.get_stepY = function() {
		return stepY
	}
	this.set_stepY = function(data) {
		stepY = data
	}
	this.get_nextX = function() {
		return nextX
	}
	this.set_nextX = function(data) {
		nextX = data
	}
	this.get_nextY = function() {
		return nextY
	}
	this.set_nextY = function(data) {
		nextY = data
	}
	this.get_orientation = function() {
		return orientation
	}
	this.set_orientation = function(data) {
		orientation = data
	}
	this.get_deviation = function() {
		return deviation
	}
	this.set_deviation = function(data) {
		deviation = data
	}
	this.get_last_time = function() {
		return last_time
	}
	this.set_last_time = function(data) {
		last_time = data
	}
	this.get_speed = function() {
		return speed
	}
	this.set_speed = function(data) {
		speed = data
	}
	this.get_step = function() {
		return step
	}
	this.set_step = function(data) {
		step = data
	}
	this.jsonToString = function() {
		return '{"stepX":' + stepX + ',"stepY":' + stepY + ',"nextX":' + nextX + ',"nextY":' + nextY +
			',"orientation":' + orientation + ',"deviation":' + deviation + ',"last_time":' + last_time + 
			',"speed":' + speed + ',"step":' + step + '}'
	}
}