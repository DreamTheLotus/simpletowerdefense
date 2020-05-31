
import org.cef.browser.CefMessageRouter
import org.cef.handler.CefMessageRouterHandlerAdapter

class MethodLink {
fun frontendInterface(query:String,bridge: CefMessageRouterHandlerAdapter) {
    val cmr = CefMessageRouter.create(CefMessageRouter.CefMessageRouterConfig("cef", "cefCancel"))
    cmr.addHandler(bridge, true)
    webBrowser.client.addMessageRouter(cmr)
}
}


