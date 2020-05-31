import org.cef.browser.CefBrowser

import javax.swing.*

import java.awt.*
import java.awt.event.ComponentAdapter
import java.awt.event.ComponentEvent

class DevToolsDialog @JvmOverloads constructor(owner: Frame, title: String, browser: CefBrowser, inspectAt: Point? = null) : JDialog(owner, title, false) {
    private val devTools_: CefBrowser

    init {

        layout = BorderLayout()    // 设置布局
        val screenSize = Toolkit.getDefaultToolkit().screenSize    // 拿到屏幕尺寸
        setSize(screenSize.width / 2, screenSize.height / 2)    //设置大小为屏幕尺寸的一半，可以自定大小
        setLocation(owner.location.x + 20, owner.location.y + 20)    // 设置左上角点的位置，是指定 Frame 的左上角点的偏移 20px 位置

        devTools_ = browser.getDevTools(inspectAt)    // 获取到 browser 的 DevTools
        add(devTools_.uiComponent)    // 将其 UIComponent 添加上去

        // 添加相关监听
        addComponentListener(object : ComponentAdapter() {
            override fun componentHidden(e: ComponentEvent?) {
                dispose()
            }
        })
    }

    override fun dispose() {
        devTools_.close(true)    // 关闭的时候触发此方法，关闭 DevTools
        super.dispose()
    }
}// 一般使用这个构造方法
