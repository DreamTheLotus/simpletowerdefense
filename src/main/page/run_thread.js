var monster_move_thread = function() {
	var threadArr = []; //数组模拟线程队列
	var run_times = 0//线程运行次数
	this.addThread = function(fn) {
		threadArr.push(fn)
	}
	this.start = function() {
		doingThread();
	}
	var doingThread = function() {
		if (threadArr.length > 0) {
			//TODO 这里要做行动刷新
			load_monster_list()
			if (monster_list.size != 0) {
				//console.log("继续运行---行动线程")
				setTimeout(doingThread,30)
			} else{
				console.log("行动线程该停止了")
			}
		} else { //先睡着等待线程队列
			console.log("启动行动线程");
			setTimeout(doingThread, 1);
		}
	}
}

var monster_draw_thread = function() {
	var threadArr = []; //数组模拟线程队列
	var run_times = 0//线程运行次数
	this.addThread = function(fn) {
		threadArr.push(fn)
	}
	this.start = function() {
		doingThread();
	}
	var doingThread = function() {
		if (threadArr.length > 0) {
			//TODO 这里要做渲染刷新
			clean_map()
			compute_coordinate()
			if (monster_list.size != 0) {
				//console.log("继续运行---绘图线程")
				setTimeout(doingThread, 30)
			} else{
				console.log("绘图线程该停止了")
			}
		} else { //先睡着等待线程队列
			console.log("启动绘图线程");
			setTimeout(doingThread, 1);
		}
	}
}