import org.cef.CefApp
import org.cef.CefClient
import org.cef.CefSettings
import org.cef.browser.CefBrowser
import org.cef.handler.CefAppHandlerAdapter

import java.awt.*
import kotlin.system.exitProcess

class Browser(startURL: String, useOSR: Boolean, isTransparent: Boolean) {
    val cefApp: CefApp
    val client: CefClient
    val browser: CefBrowser
    val browserUI: Component

    init {
        CefApp.addAppHandler(object : CefAppHandlerAdapter(null) {
            override fun stateHasChanged(state: CefApp.CefAppState?) {
                if (state == CefApp.CefAppState.TERMINATED) exitProcess(0)
            }
        })
        val settings = CefSettings()
        settings.windowless_rendering_enabled = useOSR
        cefApp = CefApp.getInstance(settings)

        client = cefApp.createClient()

        browser = client.createBrowser(startURL, useOSR, isTransparent)
        browserUI = browser.uiComponent
    }
}
