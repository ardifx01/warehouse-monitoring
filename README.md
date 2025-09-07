# Sistem Manajemen Inventaris Jaringan (Network Inventory Management System)

Aplikasi web modern dan responsif untuk mengelola inventaris perangkat keras jaringan di gudang. Aplikasi ini memungkinkan pemantauan stok masuk dan keluar, manajemen pengguna, dan konfigurasi sistem. Dibuat dengan React, TypeScript, dan Tailwind CSS.

## Fitur Utama

- **Dasbor Interaktif**: Visualisasi data utama seperti total barang, barang dengan stok menipis, barang rusak vs. normal, dan ringkasan transaksi terkini.
- **Manajemen Inventaris (CRUD)**: Tambah, lihat, ubah, dan hapus perangkat. Termasuk detail seperti merek, kategori, jumlah, status stok, dan kondisi (Normal/Rusak).
- **Pelacakan Transaksi**: Catat semua barang masuk dan keluar dengan detail seperti sumber/tujuan, pengirim/penerima, dan pengguna yang menangani. Termasuk filter berdasarkan rentang tanggal.
- **Manajemen Pengguna (CRUD)**: Kelola pengguna dengan dua peran: **Administrator** (akses penuh) dan **Staf Gudang** (hanya lihat).
- **Manajemen Kategori (CRUD)**: Administrator dapat menambah, mengubah, dan menghapus kategori perangkat.
- **Kontrol Akses Berbasis Peran**: Fitur dan menu tertentu (seperti Manajemen Pengguna, Kategori, dan Buat Transaksi) hanya dapat diakses oleh Administrator.
- **Notifikasi Telegram**: Kirim notifikasi otomatis ke bot Telegram untuk transaksi baru (masuk/keluar) dan peringatan stok menipis.
- **Pengaturan Terpusat**: Halaman pengaturan terpadu untuk:
    - **Profil Pengguna**: Pengguna dapat mengubah kata sandi. Administrator dapat mengedit detail profil.
    - **Tema Aplikasi**: Pilih antara tema Terang, Gelap, atau mengikuti pengaturan Sistem.
    - **Cadangan Terjadwal**: Administrator dapat mengonfigurasi jadwal pencadangan sistem (simulasi).
- **UI Responsif & Modern**:
    - Sidebar yang dapat disembunyikan untuk memaksimalkan ruang layar.
    - Dialog konfirmasi untuk semua tindakan destruktif untuk mencegah kehilangan data.
    - Antarmuka yang bersih dan intuitif dibangun dengan Tailwind CSS.

## Tumpukan Teknologi

Aplikasi ini adalah **aplikasi frontend murni**.

- **React 18**: Untuk membangun antarmuka pengguna yang interaktif.
- **TypeScript**: Untuk keamanan tipe dan skalabilitas kode.
- **Tailwind CSS**: Untuk styling utilitas-pertama yang cepat dan responsif.
- **React Router**: Untuk routing sisi klien.
- **Recharts**: Untuk menampilkan grafik di dasbor.

## Panduan Pengguna (User Manual)

Untuk panduan lengkap tentang cara menggunakan semua fitur aplikasi, silakan merujuk ke [**Panduan Pengguna (MANUAL.md)**](./MANUAL.md).

## Memulai

Aplikasi ini saat ini menggunakan data tiruan (`mockData.ts`) dan berjalan sepenuhnya di browser tanpa memerlukan backend.

1.  **Sajikan File Statis**: Karena ini adalah aplikasi React statis, Anda dapat menyajikannya menggunakan server web apa pun seperti Nginx, Apache, atau bahkan `serve` dari Node.js.
2.  **Konfigurasi Server (Contoh Nginx)**:
    ```nginx
    server {
        listen 80;
        server_name inventory.yourdomain.com;

        root /path/to/your/app/files;
        index index.html;

        location / {
            try_files $uri /index.html;
        }
    }
    ```

## Integrasi Backend (Langkah Berikutnya)

Untuk membuat aplikasi ini berfungsi penuh, Anda perlu membangun API backend dan menghubungkannya.

1.  **Buat API REST**: Bangun API menggunakan teknologi backend pilihan Anda (misalnya, PHP, Node.js, Python) yang terhubung ke database (misalnya, MySQL, PostgreSQL). API harus menyediakan endpoint untuk semua operasi CRUD (GET, POST, PUT, DELETE) untuk sumber daya seperti `devices`, `users`, `transactions`, dan `categories`.
2.  **Hubungkan Frontend**:
    - Hapus file `data/mockData.ts`.
    - Di dalam komponen React (misalnya, `pages/Inventory.tsx`), ganti penggunaan data tiruan dengan panggilan API menggunakan `fetch()` atau `axios` untuk mengambil dan memanulasi data dari backend Anda.
    - Kelola state aplikasi dengan lebih kuat menggunakan Redux, Zustand, atau React Query untuk menangani data dari server.

## Pengembangan di Masa Depan / Roadmap

Aplikasi ini menyediakan fondasi yang kokoh untuk sistem manajemen inventaris yang komprehensif. Berikut adalah beberapa fitur dan peningkatan potensial untuk pengembangan di masa depan:

-   **Pelaporan & Ekspor Lanjutan**:
    -   Mengimplementasikan fungsionalitas untuk mengekspor daftar inventaris dan riwayat transaksi ke format **PDF dan Excel** dengan tata letak yang bersih dan profesional.
    -   Mengembangkan modul pelaporan lanjutan dengan analisis tentang usia perangkat, kecepatan transaksi, dan aktivitas pengguna.

-   **Pemindaian Barcode & Kode QR**:
    -   Mengintegrasikan dengan kamera perangkat untuk memungkinkan pengguna memindai barcode atau kode QR pada peralatan. Ini akan secara signifikan mempercepat penambahan item ke transaksi dan melakukan penghitungan inventaris fisik.

-   **Riwayat Perangkat Terperinci**:
    -   Membuat tampilan "Buku Besar Perangkat" yang menunjukkan riwayat lengkap dari perangkat tertentu, termasuk semua transaksi, perubahan kondisi, dan catatan.

-   **Dukungan Multi-Lokasi/Gudang**:
    -   Memperluas model data untuk mendukung pengelolaan inventaris di beberapa gudang atau lokasi fisik.

-   **Peringatan yang Dapat Disesuaikan**:
    -   Memungkinkan administrator untuk menetapkan ambang batas stok rendah kustom per perangkat atau per kategori, daripada satu pengaturan global.
    -   Memperluas saluran notifikasi di luar Telegram (misalnya, email, Slack).

-   **Manajemen Data Massal**:
    -   Mengimplementasikan fitur untuk mengimpor perangkat baru secara massal dari file CSV atau Excel.
    -   Memungkinkan pembaruan massal pada perangkat yang ada (misalnya, mengubah kondisi beberapa item sekaligus).

-   **Jejak Audit (Audit Trail)**:
    -   Memperkenalkan log audit komprehensif yang melacak semua tindakan signifikan yang dilakukan oleh pengguna (misalnya, "Admin X menghapus perangkat Y pada tanggal Z"). Ini sangat penting untuk akuntabilitas.

-   **Izin Pengguna yang Ditingkatkan**:
    -   Memperluas sistem peran untuk memungkinkan izin yang lebih terperinci. Misalnya, peran yang dapat mengelola transaksi tetapi tidak dapat mengedit pengguna atau pengaturan sistem.
