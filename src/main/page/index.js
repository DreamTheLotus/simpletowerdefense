var jump = document.querySelector("#jump")
var promote = document.querySelector("#promote")
promote.style.display = "none"

function sendMessage() {
	// 这里的 method 就是 client 创建 CefMessageRouter 对象的入参涉及到的字符串
	window.method({
		request: 'click:一些信息',
		onSuccess(response) {
			console.log(response);
		},
		onFailure(error_code, error_message) {
			console.log(error_code, error_message);
		}
	});
	window.method({
		request: 'custom: connect-192.168.1.1',
		onSuccess(response) {
			console.log(response);
		},
		onFailure(error_code, error_message) {
			console.log(error_code, error_message);
		}
	});
	window.method({
		request: 'custom: search-' + JSON.stringify({
			a: 1,
			b: "str"
		}),
		onSuccess(response) {
			console.log(response);
		},
		onFailure(error_code, error_message) {
			console.log(error_code, error_message);
		}
	});
}

jump.onclick = function() {
	clean_map()
	/* console.log("需要传递信息")
	window.method({
		request: "jump: www.bing.com",
		onSuccess(response) {
			console.log(response);
		},
		onFailure(error_code, error_message) {
			console.log(error_code, error_message);
		}
	}); */
}

start.onclick = function() {
	console.log(monster_list.size)
	if (monster_list.size == 0) {
		console.log("你至少需要添加一只怪物才能启动")
	} else {
		var move_thread = new monster_move_thread()
		var draw_thread = new monster_draw_thread()
		move_thread.start()
		move_thread.addThread();
		
		draw_thread.start()
		draw_thread.addThread()
	}
}

add_monster.onclick = function() {
	var big_size = 65535

	function load_id() {
		return parseInt(Math.random() * big_size)
	}
	var monster_id = parseInt(Math.random() * big_size) //生成一个id值
	var cache = monster_list.get(monster_id)
	if (monster_list.size > big_size * 0.9) {
		console.log("怪物数量过多")
	} else {
		while (cache != undefined) {
			console.log("重复了")
			monster_id = load_id()
			cache = monster_list.get(monster_id)
		}
		//console.log("发现没有这个id")
		var now_time = new Date().getTime().toString()
		console.log(now_time)
		monster_list.set(monster_id, '{"stepX":0,"stepY":0,"orientation":0,"deviation":0,"last_time":-1,"speed":2,"step":0}')
	}

	console.log(monster_list)
}

var iterator = document.querySelector("#iterator")
iterator.onclick = function() {
}

/* table.style.display = "inline-block"
table.style.width = window.screen.width*0.3+"px"
table.style.height = window.screen.width*0.3+"px"
table.style.background = "red"
table.innerHTML = "..." */
