import org.cef.browser.CefBrowser
import org.cef.browser.CefFrame
import org.cef.callback.CefQueryCallback
import org.cef.handler.CefMessageRouterHandlerAdapter

class HrefMessageBridge : CefMessageRouterHandlerAdapter() {
    override fun onQuery(browser: CefBrowser?, frame: CefFrame?, query_id: Long, request: String, persistent: Boolean, callback: CefQueryCallback?): Boolean {
        println("收到信息了")
        return when {
            request.indexOf("jump:") == 0 -> {
                val msg = request.substring(5).trim { it <= ' ' }
                callback!!.success("$msg 返回的消息")    // 返回对应信息到前端 success 回调函数
                true
            }
            else -> false
        }
    }

    override fun onQueryCanceled(browser: CefBrowser?, frame: CefFrame?, query_id: Long) {}
}