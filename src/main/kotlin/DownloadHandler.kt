import org.cef.browser.CefBrowser
import org.cef.callback.CefBeforeDownloadCallback
import org.cef.callback.CefDownloadItem
import org.cef.callback.CefDownloadItemCallback
import org.cef.handler.CefDownloadHandlerAdapter

class DownloadHandler : CefDownloadHandlerAdapter() {

    override fun onBeforeDownload(browser: CefBrowser?, item: CefDownloadItem?, fileName: String?, callback: CefBeforeDownloadCallback) {
        callback.Continue(fileName, true)    // 通过此方法让下载正常进行
    }

    override fun onDownloadUpdated(browser: CefBrowser?, item: CefDownloadItem, callback: CefDownloadItemCallback?) {
        // 判断当前状态正在进行中、没有被取消、没有完成状态
        if (item.isInProgress && !item.isCanceled && !item.isComplete) {
            // 如果没有开始下载（选择下载存放路径时），item.getPercentComplete() 返回值是 -1
            val percent = if (item.percentComplete == -1) 0 else item.percentComplete
            val sb = StringBuilder()
            // 判断当前网址是“英文网址” 还是“中文网址”
            if (browser!!.url.contains("en-us"))
                sb.append("It is downloading, ").append(percent).append("% completed.")
            else
                sb.append("正在下载，完成度：").append(percent).append("%。")
            // 下载完毕让网页的下载窗口 dom 元素出现，并修改其中的文本信息
            browser.executeJavaScript("\$download.show(); pDownload.innerText='$sb';", item.url, 1)
        } else {
            // 下载完毕让网页的下载窗口 dom 元素隐藏
            browser!!.executeJavaScript("setTimeout(() => \$download.fadeOut('fast'), 1000);", item.url, 2)
        }
    }
}
