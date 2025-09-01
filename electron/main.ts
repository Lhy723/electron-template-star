import { app, BrowserWindow, shell, ipcMain } from 'electron'
// import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import os from 'node:os'

// const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.js    > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.DIST_ELECTRON = path.join(__dirname, '../')
process.env.DIST = app.isPackaged 
  ? path.join(process.env.DIST_ELECTRON, 'dist')  // 打包后的路径
  : path.join(process.env.DIST_ELECTRON, '../dist')  // 开发环境路径
process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? path.join(process.env.DIST_ELECTRON, '../public')
  : process.env.DIST

// 在开发模式下设置 VITE_DEV_SERVER_URL
if (!process.env.VITE_DEV_SERVER_URL && process.env.NODE_ENV !== 'production') {
  process.env.VITE_DEV_SERVER_URL = 'http://localhost:5173'
}

// Disable GPU Acceleration for Windows 7
if (os.release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null
// Here, you can also use other preload
const preload = path.join(__dirname, 'preload.js')
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = path.join(process.env.DIST, 'index.html')

async function createWindow() {
  win = new BrowserWindow({
    title: 'Electron Template Star',
    icon: path.join(process.env.VITE_PUBLIC || '', 'favicon.ico'),
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    frame: false, // 移除原生标题栏
    titleBarStyle: 'hidden', // 隐藏标题栏但保留窗口控制按钮功能
    webPreferences: {
      preload,
      // Warning: Enabling nodeIntegration and disabling contextIsolation is not secure in production
      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: true,
    },
  })

  // 更严格的环境判断
  const isDevelopment = process.env.NODE_ENV !== 'production'
  const isPackaged = app.isPackaged

  if (process.env.VITE_DEV_SERVER_URL && isDevelopment && !isPackaged) {
    // 开发环境逻辑
    console.log('Loading development server:', url)
    if (url) {
      win.loadURL(url)
      // 仅在开发模式下开启开发者工具
      win.webContents.openDevTools()
    }
  } else {
    // 生产环境逻辑
    console.log('Loading file:', indexHtml)
    
    // 检查文件是否存在
    const fs = require('fs')
    if (fs.existsSync(indexHtml)) {
      win.loadFile(indexHtml)
    } else {
      console.error('Index.html file not found:', indexHtml)
      console.error('Expected path:', indexHtml)
      console.error('DIST path:', process.env.DIST)
      // 显示错误信息
      win.loadURL(`data:text/html;charset=utf-8,<html><body><h1>Error: Could not load application</h1><p>File not found: ${indexHtml}</p></body></html>`)
    }
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })

  // Apply electron-updater
  update(win)
}

// --------- Window Controls IPC Handlers ---------
ipcMain.handle('window-minimize', () => {
  if (win) win.minimize()
})

ipcMain.handle('window-maximize', () => {
  if (win) {
    if (win.isMaximized()) {
      win.unmaximize()
    } else {
      win.maximize()
    }
  }
})

ipcMain.handle('window-unmaximize', () => {
  if (win) win.unmaximize()
})

ipcMain.handle('window-close', () => {
  if (win) win.close()
})

ipcMain.handle('window-is-maximized', () => {
  return win ? win.isMaximized() : false
})

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

// New window example arg: new windows url
ipcMain.handle('open-win', (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: true,
    },
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${url}#${arg}`)
  } else {
    childWindow.loadFile(indexHtml, { hash: arg })
  }
})

// Auto-updater
function update(_win: BrowserWindow) {
  // Auto-updater logic can be implemented here
  // For now, we'll just log that the app is ready for updates
  console.log('App is ready for updates')
}

// Create application menu
// function createMenu() {
//   const template: Electron.MenuItemConstructorOptions[] = [
//     {
//       label: 'File',
//       submenu: [
//         {
//           label: 'New',
//           accelerator: 'CmdOrCtrl+N',
//           click: () => {
//             // Handle new file
//           }
//         },
//         {
//           label: 'Open',
//           accelerator: 'CmdOrCtrl+O',
//           click: () => {
//             // Handle open file
//           }
//         },
//         { type: 'separator' },
//         {
//           label: 'Exit',
//           accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
//           click: () => {
//             app.quit()
//           }
//         }
//       ]
//     },
//     {
//       label: 'Edit',
//       submenu: [
//         { role: 'undo' },
//         { role: 'redo' },
//         { type: 'separator' },
//         { role: 'cut' },
//         { role: 'copy' },
//         { role: 'paste' }
//       ]
//     },
//     {
//       label: 'View',
//       submenu: [
//         { role: 'reload' },
//         { role: 'forceReload' },
//         { role: 'toggleDevTools' },
//         { type: 'separator' },
//         { role: 'resetZoom' },
//         { role: 'zoomIn' },
//         { role: 'zoomOut' },
//         { type: 'separator' },
//         { role: 'togglefullscreen' }
//       ]
//     },
//     {
//       label: 'Window',
//       submenu: [
//         { role: 'minimize' },
//         { role: 'close' }
//       ]
//     },
//     {
//       label: 'Help',
//       submenu: [
//         {
//           label: 'About',
//           click: () => {
//             // Handle about dialog
//           }
//         }
//       ]
//     }
//   ]
//
//   const menu = Menu.buildFromTemplate(template)
//   Menu.setApplicationMenu(menu)
// }

// Remove duplicate app.whenReady() call
// app.whenReady().then(() => {
//   createMenu()
// })