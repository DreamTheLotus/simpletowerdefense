import org.cef.browser.CefBrowser
import org.cef.browser.CefFrame
import org.cef.callback.CefQueryCallback
import org.cef.handler.CefMessageRouterHandlerAdapter

class ValueMessageBridge: CefMessageRouterHandlerAdapter() {

    override fun onQuery(browser: CefBrowser?, frame: CefFrame?, query_id: Long, request: String, persistent: Boolean, callback: CefQueryCallback?): Boolean {
        // 请求信息以 "click:" 开头
        when {
            request.indexOf("click:") == 0 -> {
                val msg = request.substring(6).trim { it <= ' ' }
                callback!!.success("$msg 返回的消息")    // 返回对应信息到前端 success 回调函数
                return true
            }
            // 请求信息以 "custom:" 开头
            request.indexOf("custom:") == 0 -> {
                // 将后面的字符串按 ,:- 切割
                val method = request.substring(7).trim { it <= ' ' }.split("[,:\\-]".toRegex()).dropLastWhile { it.isEmpty() }.toTypedArray()
                when (method[0].trim { it <= ' ' }) {
                    "search" -> callback!!.success("This is the result of search.")    // 返回对应信息到前端 success 回调函数
                    "connect" -> {
                        println(method[1].trim { it <= ' ' })
                        println("我需要看看是否返回了数据：${method[0]}跟${method[1]}")
                        callback!!.success("This is the result of connect.")    // 返回对应信息到前端 success 回调函数
                    }
                    else -> callback!!.failure(404, "This is the result of failure.")    // 返回对应信息到前端 failure 回调函数
                }
                return true
            }
            request.indexOf("jump:") == 0 -> {
                val msg = request.substring(5).trim { it <= ' ' }
                callback!!.success("$msg 获得的信息")    // 返回对应信息到前端 success 回调函数
                return true
            }
            // Not handled.
            // 如果返回 false 则会自动执行一个 alert 弹出框提示没有 handled
            else -> return false
        }
    }

    override fun onQueryCanceled(browser: CefBrowser?, frame: CefFrame?, query_id: Long) {}
}
