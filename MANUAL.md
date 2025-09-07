# Panduan Pengguna - Sistem Manajemen Inventaris Jaringan

Dokumen ini menjelaskan cara menggunakan semua fitur yang tersedia di aplikasi Sistem Manajemen Inventaris Jaringan.

## Daftar Isi

1.  [Login ke Aplikasi](#1-login-ke-aplikasi)
2.  [Navigasi Umum](#2-navigasi-umum)
    -   [Dasbor](#dasbor)
    -   [Sidebar](#sidebar)
    -   [Header](#header)
3.  [Fitur Administrator](#3-fitur-administrator)
    -   [Mengelola Inventaris](#mengelola-inventaris)
    -   [Membuat Transaksi](#membuat-transaksi)
    -   [Mengelola Kategori](#mengelola-kategori)
    -   [Mengelola Pengguna](#mengelola-pengguna)
    -   [Melihat Riwayat Transaksi](#melihat-riwayat-transaksi)
    -   [Halaman Pengaturan (Admin)](#halaman-pengaturan-admin)
4.  [Fitur Staf Gudang (Hanya Lihat)](#4-fitur-staf-gudang-hanya-lihat)
    -   [Halaman Pengaturan (Staf)](#halaman-pengaturan-staf)

---

### 1. Login ke Aplikasi

Aplikasi ini memiliki sistem login simulasi untuk mendemonstrasikan fungsionalitas berbasis peran.

-   Buka aplikasi, Anda akan diarahkan ke halaman Login.
-   Klik **"Masuk sebagai Administrator"** untuk mendapatkan akses penuh ke semua fitur.
-   Klik **"Masuk sebagai Staf Gudang"** untuk mendapatkan akses hanya-lihat.

### 2. Navigasi Umum

#### Dasbor

Halaman pertama yang Anda lihat setelah login. Dasbor memberikan ringkasan visual dari inventaris Anda:
-   **Kartu Statistik**: Menampilkan jumlah total barang, barang normal vs. rusak, stok menipis, dan total barang masuk/keluar.
-   **Grafik**: Visualisasi jumlah perangkat berdasarkan kategori.
-   **Transaksi Terkini**: Daftar singkat transaksi terbaru.

#### Sidebar

Menu navigasi utama di sisi kiri.
-   Klik ikon "hamburger" (☰) di header untuk menyembunyikan atau menampilkan sidebar.
-   Menu yang ditampilkan tergantung pada peran Anda (Administrator memiliki lebih banyak menu).
-   Klik pada menu untuk berpindah halaman.

#### Header

Bilah atas aplikasi.
-   **Tombol Tema**: Ikon matahari/bulan untuk beralih antara tema Terang dan Gelap.
-   **Profil Pengguna**: Menampilkan nama dan peran Anda. Klik di sini untuk langsung menuju ke halaman Pengaturan.
-   **Tombol Keluar**: Untuk keluar dari aplikasi.

### 3. Fitur Administrator

Sebagai Administrator, Anda memiliki akses ke semua fungsi.

#### Mengelola Inventaris

Buka halaman **Inventaris**.
-   **Melihat**: Semua perangkat ditampilkan dalam tabel dengan status dan kondisi berkode warna.
-   **Mencari**: Gunakan kotak pencarian untuk memfilter perangkat berdasarkan nama, kategori, atau merek.
-   **Menambah Perangkat**: Perangkat baru ditambahkan melalui menu **Buat Transaksi** (lihat di bawah).
-   **Mengubah Perangkat**: Klik tombol **"Ubah"** pada baris perangkat. Sebuah modal akan muncul di mana Anda dapat mengedit nama, kategori, jumlah, kondisi, dll.
-   **Menghapus Perangkat**: Klik tombol **"Hapus"**. Dialog konfirmasi akan muncul untuk mencegah penghapusan yang tidak disengaja.

#### Membuat Transaksi

Buka halaman **Buat Transaksi**.
1.  **Pilih Tipe Transaksi**:
    -   **Keluar**: Untuk mencatat perangkat yang keluar dari gudang.
    -   **Masuk**: Untuk mencatat perangkat yang masuk ke gudang.
2.  **Transaksi Masuk**:
    -   **Perangkat yang Ada**: Pilih perangkat dari daftar untuk menambah stoknya.
    -   **Tambah Perangkat Baru**: Pilih opsi ini untuk membuat entri perangkat baru. Isi nama, kategori, merek, dan kondisi. Anda juga akan diminta untuk memasukkan nomor registrasi unik untuk setiap unit baru.
    -   Isi detail Sumber dan Pengirim.
3.  **Transaksi Keluar**:
    -   Pilih perangkat yang ada dari daftar.
    -   Isi detail Tujuan dan Penerima.
4.  **Ringkasan & Validasi**:
    -   Saat Anda mengisi formulir, kotak **Ringkasan Transaksi** di sisi kanan akan diperbarui secara real-time, menunjukkan stok awal, jumlah transaksi, dan stok akhir.
    -   Jika Anda mencoba mengeluarkan lebih banyak barang daripada stok yang tersedia, pesan kesalahan akan muncul dan tombol kirim akan dinonaktifkan.
5.  **Kirim**: Setelah semua detail benar, klik tombol **"Buat Transaksi"**. Notifikasi Telegram akan dikirim jika dikonfigurasi.

#### Mengelola Kategori

Buka halaman **Kategori**.
-   **Menambah**: Klik tombol **"Tambah Kategori"** untuk membuat kategori baru.
-   **Mengubah**: Klik tombol **"Ubah"** pada kategori yang ada untuk mengedit namanya.
-   **Menghapus**: Klik tombol **"Hapus"** dan konfirmasi untuk menghapus kategori.

#### Mengelola Pengguna

Buka halaman **Pengguna**.
-   **Menambah**: Klik tombol **"Tambah Pengguna"**. Isi nama, email, dan pilih perannya.
-   **Mengubah**: Klik tombol **"Ubah"** untuk mengedit detail pengguna.
-   **Menghapus**: Klik tombol **"Hapus"** dan konfirmasi untuk menghapus pengguna.

#### Melihat Riwayat Transaksi

Buka halaman **Transaksi**.
-   Semua transaksi ditampilkan dalam tabel.
-   Gunakan filter **Tanggal Mulai** dan **Tanggal Akhir** untuk melihat transaksi dalam periode tertentu.

#### Halaman Pengaturan (Admin)

Buka halaman **Pengaturan Akun & Sistem**.
-   **Informasi Profil**: Anda dapat mengubah nama dan email Anda.
-   **Ubah Kata Sandi**: Perbarui kata sandi akun Anda.
-   **Pengaturan Tema**: Pilih tema visual aplikasi.
-   **Notifikasi Telegram**: Aktifkan notifikasi, lalu masukkan **Bot Token** dan **Chat ID** Anda. Klik "Tes Notifikasi" untuk memeriksa koneksi.
-   **Pengaturan Cadangan Sistem**: Aktifkan dan konfigurasikan jadwal pencadangan sistem (simulasi).

### 4. Fitur Staf Gudang (Hanya Lihat)

Sebagai Staf Gudang, Anda memiliki akses terbatas untuk melihat data.
-   Anda dapat melihat **Dasbor**, **Inventaris**, dan **Riwayat Transaksi**.
-   Anda **tidak dapat** membuat, mengubah, atau menghapus data apa pun (perangkat, pengguna, kategori, transaksi).
-   Tombol untuk tindakan ini akan disembunyikan.

#### Halaman Pengaturan (Staf)

Buka halaman **Pengaturan Akun & Sistem**.
-   **Informasi Profil**: Detail Anda ditampilkan tetapi tidak dapat diubah.
-   **Ubah Kata Sandi**: Anda dapat memperbarui kata sandi akun Anda.
-   **Pengaturan Tema**: Anda dapat mengubah tema visual aplikasi.