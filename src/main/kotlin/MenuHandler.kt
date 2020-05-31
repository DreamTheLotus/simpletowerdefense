import org.cef.browser.CefBrowser
import org.cef.browser.CefFrame
import org.cef.callback.CefContextMenuParams
import org.cef.callback.CefMenuModel
import org.cef.callback.CefMenuModel.MenuId
import org.cef.handler.CefContextMenuHandlerAdapter
import java.awt.Frame

class MenuHandler(private val owner: Frame) : CefContextMenuHandlerAdapter() {

    override fun onBeforeContextMenu(browser: CefBrowser?, frame: CefFrame?, params: CefContextMenuParams?, model: CefMenuModel) {
        // 清除菜单项
        model.clear()
        //剪切、复制、粘贴
        model.addItem(MenuId.MENU_ID_COPY, "copy")
        model.addItem(MenuId.MENU_ID_CUT, "cut")
        model.addItem(MenuId.MENU_ID_PASTE, "paste")
        model.setEnabled(MenuId.MENU_ID_PASTE, false)
        model.addItem(MENU_ID_SHOW_DEV_TOOLS, "开发者选项")
        model.addSeparator()

        val more = model.addSubMenu(MENU_ID_MORE, "more")
        more.addItem(MenuId.MENU_ID_PRINT, "print")
        more.addItem(MenuId.MENU_ID_VIEW_SOURCE, "view source")
        model.addSeparator()

        model.addItem(MenuId.MENU_ID_RELOAD, "reload")
    }

    override fun onContextMenuCommand(browser: CefBrowser?, frame: CefFrame?, params: CefContextMenuParams?, commandId: Int, eventFlags: Int): Boolean {
        when (commandId) {
            MenuId.MENU_ID_RELOAD -> {
                browser!!.reload()
                return true
            }
            MENU_ID_SHOW_DEV_TOOLS -> {
            // 打开开发者选项
            val devToolsDlg = DevToolsDialog(owner, "开发者选项", browser!!)
            devToolsDlg.isVisible = true
            return true
        }

        }
        return false
    }

    companion object {
        private const val MENU_ID_MORE = 10001
        private const val MENU_ID_SHOW_DEV_TOOLS = 10000

    }
}




