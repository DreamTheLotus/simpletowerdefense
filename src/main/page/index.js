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

create_monster.onclick = function() {
	var a = new monster()
	a.all_to_json('{"stepX":3,"stepY":5,"next_X":2,"next_Y":7,"orientation":78}')
	console.log(a.jsonToString())
	var move_thread = new monster_thread();
	move_thread.start()
	move_thread.addThread();
}



/* table.style.display = "inline-block"
table.style.width = window.screen.width*0.3+"px"
table.style.height = window.screen.width*0.3+"px"
table.style.background = "red"
table.innerHTML = "..." */
