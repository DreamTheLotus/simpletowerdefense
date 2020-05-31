var monster_thread = function() {
	var threadArr = []; //数组模拟线程队列
	var run_times = 0
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
			normal_monster_step(run_times)
			if (run_times > ((route.length-1)*100)) {
				console.log("该停止了")
			}else {
				setTimeout(doingThread, 1)
			}
			run_times += 1
		} else { //先睡着等待线程队列
			console.log("启动线程");
			setTimeout(doingThread, 1);
		}
	}
}

function StartThread() {
	monster_thread.start()
	monster_thread.addThread();
}
//var move_thread = new monster_thread();
