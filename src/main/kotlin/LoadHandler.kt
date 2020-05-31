
import org.cef.handler.CefLoadHandlerAdapter


class LoadHandler : CefLoadHandlerAdapter() {
    fun onLoadEnd() {
        val jscode = "var message = document.querySelector(\"#message\");console.log(message)"
        webBrowser.browser.executeJavaScript(jscode,"",0)
    }
}

