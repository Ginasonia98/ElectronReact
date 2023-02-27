/* eslint-disable global-require */

const { app, BrowserWindow } = require("electron");
// penjelasan atas
/**
 * sintaksis ini digunakan untuk mengimpor hanya bagian-bagian tertentu dari modul Electron dan membuat variabel baru yang mereferensi bagian tersebut.
 * Dalam kasus kode di atas, app dan BrowserWindow adalah dua komponen utama dari Electron yang sangat sering digunakan untuk membangun aplikasi desktop menggunakan JavaScript.
 * app adalah objek inti dari aplikasi Electron yang mengontrol siklus hidup aplikasi, termasuk memulai dan menghentikan aplikasi, mengelola jendela, dan menyediakan akses ke API sistem operasi.
  BrowserWindow adalah kelas yang digunakan untuk membuat dan mengelola jendela aplikasi. Dalam kelas ini, Anda dapat mengatur ukuran jendela, menambahkan elemen HTML ke dalam jendela, dan melakukan banyak operasi lainnya.
 */

const path = require("path");
const isDev = require("electron-is-dev");

require("@electron/remote/main").initialize();

// penjelasan atas
/**
 * const path = require('path');

Kode ini mengimpor modul path yang merupakan modul bawaan Node.js. Modul path digunakan untuk memanipulasi dan menghasilkan jalur file dan direktori pada sistem file.

const isDev = require('electron-is-dev');

Kode ini mengimpor modul electron-is-dev yang digunakan untuk memeriksa apakah aplikasi Electron sedang berjalan dalam mode pengembangan (development) atau produksi (production). Modul ini mengembalikan nilai true jika aplikasi berjalan dalam mode pengembangan dan false jika berjalan dalam mode produksi.

require('@electron/remote/main').initialize();

Kode ini memanggil fungsi initialize() dari modul @electron/remote/main. Modul ini digunakan untuk memberikan dukungan untuk penggunaan API Electron di dalam konteks renderer atau window yang berjalan di luar utas utama (main thread) dari aplikasi. Fungsi initialize() harus dipanggil setidaknya satu kali di bagian utama dari aplikasi untuk memastikan modul berfungsi dengan baik.

Dalam kombinasi, ketiga kode ini sering digunakan dalam pengembangan aplikasi desktop dengan Electron. Modul path dan isDev dapat membantu dalam memanipulasi jalur file dan menentukan mode pengembangan atau produksi, sementara @electron/remote/main membantu dalam memungkinkan penggunaan API Electron di konteks renderer atau window.
 */

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    autoHideMenuBar: true,
    width: 800,
    minWidth: 800,
    maxWidth: 800,
    height: 800,
    minHeight: 800,
    maxHeight: 800,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
  });
  win.removeMenu();
  require("@electron/remote/main").enable(win.webContents);

  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  // unable the code below to show the inspect element
  // win.webContents.openDevTools();
}
// penjelasan atas
/**
 * createWindow() yang digunakan untuk membuat jendela browser dalam aplikasi desktop dengan Electron. Berikut adalah penjelasan singkat dari kode tersebut:

const win = new BrowserWindow({ ... })

Kode ini membuat jendela browser baru dengan menggunakan kelas BrowserWindow yang telah diimpor sebelumnya. Objek win kemudian digunakan untuk mengatur beberapa opsi jendela seperti ukuran, mode tampilan, dan preferensi web.

win.removeMenu()

Kode ini menghapus menu bawaan dari jendela aplikasi. Jika Anda ingin membuat menu sendiri, maka kode ini harus dihapus.

require('@electron/remote/main').enable(win.webContents);

Kode ini memungkinkan penggunaan API Electron di dalam konteks renderer atau window. Modul @electron/remote/main yang telah diimpor sebelumnya digunakan untuk melakukan hal ini.

win.loadURL(...)

Kode ini memuat URL ke dalam jendela browser. Jika aplikasi berjalan dalam mode pengembangan, URL yang dimuat adalah http://localhost:3000, dan jika dalam mode produksi, URL yang dimuat adalah file://${path.join(__dirname, '../build/index.html')}.

// win.webContents.openDevTools();

Kode ini berfungsi untuk membuka alat pengembang (developer tools) yang terintegrasi di dalam Electron. Jika kode ini tidak di-disable, maka alat pengembang akan terbuka secara otomatis ketika jendela browser dibuka.

Fungsi createWindow() ini sering digunakan sebagai bagian dari pengaturan awal dari aplikasi desktop dengan Electron, karena menentukan preferensi jendela dan memuat URL ke dalam jendela aplikasi
 */

app.on("ready", createWindow);

// penjelasan
// Kode app.on('ready', createWindow) digunakan untuk mengeksekusi fungsi createWindow() ketika aplikasi Electron siap untuk memulai prosesnya. app.on('ready') adalah event yang dipancarkan oleh objek app dari Electron saat aplikasi siap untuk dimulai. Pada saat event ini dipancarkan, fungsi callback createWindow akan dieksekusi. Fungsi createWindow() sendiri adalah fungsi yang telah kita definisikan sebelumnya, dan berfungsi untuk membuat jendela browser pertama kali saat aplikasi dimulai.

// Dalam konteks pengembangan aplikasi desktop dengan Electron, kode app.on('ready', createWindow) ini merupakan bagian dari proses pengaturan awal untuk membuat jendela browser pertama kali saat aplikasi dijalankan. Ketika aplikasi siap, maka event ready akan dipancarkan dan kode akan mengeksekusi fungsi createWindow() untuk membuat jendela browser pertama kali.

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// penjelasan atas
/**
 *Kode app.on('window-all-closed', ...) dan app.on('activate', ...) digunakan untuk mengatur perilaku aplikasi ketika semua jendela ditutup atau aplikasi diaktifkan kembali.

app.on('window-all-closed', ...)

Kode ini berisi sebuah fungsi callback yang dipanggil ketika semua jendela aplikasi telah ditutup. Dalam kode tersebut, jika platform saat ini bukan macOS (dalam hal ini, process.platform !== 'darwin'), maka aplikasi akan keluar dari mode kerja dengan menggunakan method app.quit().

app.on('activate', ...)

Kode ini berisi sebuah fungsi callback yang dipanggil ketika aplikasi diaktifkan kembali. Dalam kode tersebut, jika tidak ada jendela yang dibuka (dalam hal ini, BrowserWindow.getAllWindows().length === 0), maka fungsi createWindow() akan dipanggil untuk membuat jendela baru.

Dalam konteks pengembangan aplikasi desktop dengan Electron, kode ini digunakan untuk mengatur perilaku aplikasi saat jendela ditutup atau ketika aplikasi diaktifkan kembali. Jika semua jendela ditutup, aplikasi akan keluar dari mode kerja, sedangkan jika aplikasi diaktifkan kembali dan tidak ada jendela yang dibuka, maka aplikasi akan membuat jendela baru menggunakan fungsi createWindow(). Pada platform macOS, aplikasi dan menu bar biasanya tetap aktif meskipun semua jendela ditutup, dan hanya akan keluar dari mode kerja ketika pengguna secara eksplisit menutup aplikasi menggunakan tombol keyboard Cmd + Q. Oleh karena itu, kode pada bagian window-all-closed memeriksa apakah platform saat ini adalah macOS sebelum menutup aplikasi.
 */
