import org.cef.CefApp

import javax.swing.*

import java.awt.*
import java.awt.event.WindowAdapter
import java.awt.event.WindowEvent
import kotlin.system.exitProcess
import org.cef.browser.CefMessageRouter



var filePath = "E:\\Project\\Game\\SimpleTowerDefense"
var webBrowser: Browser = Browser("$filePath\\src\\main\\page\\index.html", useOSR = false, isTransparent = false)
object Main {
    @JvmStatic
    fun main(args: Array<String>) {
        init()
    }

    private fun init() {
        EventQueue.invokeLater {
            val jFrame = JFrame("小网页")
            jFrame.minimumSize = Dimension(1366, 738)    // 设置最小窗口大小
            jFrame.extendedState = JFrame.MAXIMIZED_BOTH    // 默认窗口全屏
            //jFrame.iconImage = Toolkit.getDefaultToolkit().getImage(jFrame.javaClass.getResource("/images/icon.png"))

            if (!CefApp.startup()) {    // 初始化失败
                val error = JLabel("<html><body>&nbsp;&nbsp;&nbsp;&nbsp;在启动这个应用程序时，发生了一些错误，请关闭并重启这个应用程序。<br>There is something wrong when this APP start up, please close and restart it.</body></html>")
                error.font = Font("宋体/Arial", Font.PLAIN, 28)
                error.icon = ImageIcon(jFrame.javaClass.getResource("/images/error.png"))
                error.foreground = Color.red
                error.horizontalAlignment = SwingConstants.CENTER

                jFrame.contentPane.background = Color.white
                jFrame.contentPane.add(error, BorderLayout.CENTER)
                jFrame.isVisible = true
                //return @EventQueue.invokeLater
            }

            consoleData()
            webBrowser.client.addContextMenuHandler(MenuHandler(jFrame))

            /*var msgRouter:CefMessageRouter = CefMessageRouter.create()
            msgRouter.addHandler(MessageRouterHandler(), true)
            browser.client.addMessageRouter(msgRouter)*/

            //browser.browser.executeJavaScript("callback('返回')","",0)

            // 这里的 cef 和 cefCancel 是自定义字符串，前端通过调用这两个字符串表示的方法来访问 client，
            // 即对应的 onQuery 和 onQueryCanceled 方法。

            /*val jump = CefMessageRouter.create(CefMessageRouter.CefMessageRouterConfig("jump", "jumpCancel"))
            jump.addHandler(HrefMessageBridge(), true)
            webBrowser.client.addMessageRouter(jump)*/


            val method = CefMessageRouter.create(CefMessageRouter.CefMessageRouterConfig("method", "methodCancel"))
            method.addHandler(ValueMessageBridge(), true)
            webBrowser.client.addMessageRouter(method)



            //MethodLink().frontendInterface("jump",HrefMessageBridge())

            jFrame.contentPane.add(webBrowser.browserUI, BorderLayout.CENTER)
            jFrame.isVisible = true

            jFrame.addWindowListener(object : WindowAdapter() {
                override fun windowClosing(e: WindowEvent?) {
                    val i: Int = when ("en-us") {
                        "en-us" -> JOptionPane.showOptionDialog(null, "Do you really want to quit this software?", "Exit", JOptionPane.YES_NO_OPTION, JOptionPane.QUESTION_MESSAGE, null, arrayOf("Yes", "No"), "Yes")
                        "zh-cn" -> JOptionPane.showOptionDialog(null, "你真的想退出这个软件吗？", "Exit", JOptionPane.YES_NO_OPTION, JOptionPane.QUESTION_MESSAGE, null, arrayOf("是的", "不"), "是的")
                        else -> JOptionPane.showOptionDialog(null, "你真的想退出这个软件吗？\nDo you really want to quit this software?", "Exit", JOptionPane.YES_NO_OPTION, JOptionPane.QUESTION_MESSAGE, null, arrayOf("是的(Yes)", "不(No)"), "是的(Yes)")
                    }
                    if (i == JOptionPane.YES_OPTION) {
                        webBrowser.cefApp.dispose()
                        jFrame.dispose()
                        exitProcess(0)
                    }
                }
            })
        }
    }

    private fun consoleData() {
        Thread(Runnable {
            try {
                // 让线程 sleep 一秒保证 executeJavaScript 方法能够执行
                Thread.sleep(5000)
            } catch (e: InterruptedException) {
                e.printStackTrace()
            }
            // 第一个参数是 js 代码，第二、三个参数是控制台打印所附带的信息，并不是指向网页执行代码。
            // 第二个参数是 url，一旦报错，就会打印其相关信息，以供开发人员阅读。
            webBrowser.browser.executeJavaScript("console.log(123)", "", 0)
            //browser.browser.executeJavaScript("document.write(123456)", "", 0)
        }).start()
    }
}
