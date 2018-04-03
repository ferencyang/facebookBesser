import { app, BrowserWindow, ipcMain, shell, Menu ,dialog} from 'electron'
// var Menu = require("menu");
var mainWindow = null;
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

// let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 690,
    width: 1000,
    title: '百森云控',
    frame: false,
    resizable: false,
    transparent: true,
    show: false
    // autoHideMenuBar: true,
    // show: false,

  })
  var template = [{
    label: "Application",
    submenu: [
      { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
      { type: "separator" },
      { label: "Quit", accelerator: "Command+Q", click: function () { app.quit(); } }
    ]
  }, {
    label: "Edit",
    submenu: [
      { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
      { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
      { type: "separator" },
      { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
      { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
      { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
      { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
    ]
  }
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
  mainWindow.loadURL(winURL)

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  ipcMain.on('surfbird:window:close', function (e) {
    try {
      e.sender.getOwnerBrowserWindow().close()
    } catch (error) {
      console.log(`[WARN] mainWindow couldn't be closed, most likely due to ${error}`)
    }
  })

  ipcMain.on('surfbird:window:maximize', function (e) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize()
    } else {
      mainWindow.maximize()
    }
  })

  ipcMain.on('surfbird:window:minimize', function (e) {
    mainWindow.minimize()
  })

  ipcMain.on('surfbird:openHomeUrl', function (e) {
    shell.openExternal('http://thebesser.com')
  })


  ipcMain.on('surfbird:updateload', function (event, arg) {
    //更新
    const fs = require('fs');
    let filePathGet = app.getAppPath();
    const filePathEnd = process.env.NODE_ENV === 'development' ? filePathGet.replace(/default_app.asar/, '') : filePathGet.replace(/app.asar/, '');
    let updateDowmUrl = arg;
    if (updateDowmUrl === null) {
      event.sender.send('updateMessage:noUpdateDowmUrl', '没有可用更新');
      let options = {
        type: 'info',
        title: '提示',
        message: "没有可用更新",
        buttons: ['关闭']
      }
      dialog.showMessageBox(options, function (index) {

      })
    }
    mainWindow.webContents.downloadURL(updateDowmUrl);
    mainWindow.webContents.session.on('will-download', (e, item) => {
      //获取文件的总大小
      const totalBytes = item.getTotalBytes();
      //设置文件的保存路径，此时默认弹出的 save dialog 将被覆盖
      const filePath = filePathEnd + 'update.asar';
      const filePath02 = filePathEnd + 'app.asar';
      item.setSavePath(filePath);
      //监听下载过程，计算并设置进度条进度
      item.on('updated', () => {
        mainWindow.setProgressBar(item.getReceivedBytes() / totalBytes);
        let progressBarNow02 = item.getReceivedBytes() / totalBytes;
        let progressBarNow = Math.floor(progressBarNow02 * 100);
        event.sender.send('updateMessage:setProgressBar', progressBarNow);
      });

      item.on('updated', (event, state) => {
        if (state === 'interrupted') {
          let options = {
            type: 'warning',
            title: '提示',
            message: "下载失败",
            buttons: ['关闭']
          }
          dialog.showMessageBox(options, function (index) {

          })
        } else if (state === 'progressing') {
          if (item.isPaused()) {
            console.log('Download is paused')
          } else {
            console.log(`Received bytes: ${item.getReceivedBytes()}`)
          }
        }
      });

      //监听下载结束事件
      item.on('done', (e, state) => {
        //如果窗口还在的话，去掉进度条
        if (!mainWindow.isDestroyed()) {
            mainWindow.setProgressBar(-1);
        }

        //下载被取消或中断了
        if (state === 'interrupted') {
          // dialog.showErrorBox('下载失败', `文件 ${item.getFilename()} 因为某些原因被中断下载`);
          event.sender.send('updateMessage:stateInterrupted', '下载失败');
          let options = {
            type: 'warning',
            title: '提示',
            message: "下载失败",
            buttons: ['关闭']
          }
          dialog.showMessageBox(options, function (index) {

          })
        }

        //下载完成，让 dock 上的下载目录Q弹一下下
        if (state === 'completed') {
          event.sender.send('updateMessage:stateCompleted', '下载成功');

        }
      });
    });

  })

  ipcMain.on('surfbird:updateOk', function (e) {
    const fs = require('fs');
    let filePathGet = app.getAppPath();
    const filePathEnd = process.env.NODE_ENV === 'development' ? filePathGet.replace(/default_app.asar/, '') : filePathGet.replace(/app.asar/, '');

    let filePath = filePathEnd + 'update.asar';
    let filePath02 = filePathEnd + 'app.asar';
    fs.rename(filePath, filePath02)
  })


}  //function

app.on('ready', createWindow)


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
})





/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */


// import { autoUpdater } from 'electron-updater'
//
// autoUpdater.logger = require("electron-log")
// autoUpdater.logger.transports.file.level = "info"
//
// autoUpdater.on('update-downloaded', () => {
//   autoUpdater.quitAndInstall()
// })
//
// autoUpdater.setFeedURL('https://banfang.info/besser/app/master/')
//
// app.on('ready', () => {
//   if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
// })
