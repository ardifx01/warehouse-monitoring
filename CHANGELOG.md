# Changelog

Semua perubahan penting pada proyek ini akan didokumentasikan dalam file ini.

Formatnya didasarkan pada [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [1.1.0] - 2023-10-28

### Added
- **Panduan Pengguna**: Menambahkan file `MANUAL.md` yang berisi panduan lengkap cara menggunakan aplikasi untuk peran Administrator dan Staf Gudang.

### Changed
- **README.md**: Memperbarui file README dengan menambahkan tautan ke panduan pengguna baru untuk dokumentasi yang lebih baik.
- **CHANGELOG.md**: Memperbarui file ini untuk mencerminkan penambahan dokumentasi.

## [1.0.0] - 2023-10-27

Versi awal dari Sistem Manajemen Inventaris Jaringan.

### Added
- **Struktur Aplikasi Awal**: Pengaturan proyek dengan React, TypeScript, dan Tailwind CSS.
- **Halaman Utama**: Dasbor, Inventaris, Transaksi, Pengguna, dan Pengaturan.
- **Simulasi Otentikasi**: Sistem login dengan dua peran pengguna: `Administrator` dan `Staf Gudang` (`view_only`).
- **Dasbor**: Kartu ringkasan untuk total barang, stok menipis, barang masuk/keluar, dan kondisi barang (Normal/Rusak).
- **Manajemen Inventaris (CRUD)**: Tampilan tabel perangkat dengan fungsionalitas pencarian dan filter.
- **Pelacakan Kondisi Perangkat**: Menambahkan status `Normal` atau `Rusak` pada setiap perangkat.
- **Manajemen Kategori (CRUD)**: Halaman khusus untuk Administrator menambah, mengubah, dan menghapus kategori perangkat.
- **Manajemen Pengguna (CRUD)**: Halaman khusus untuk Administrator menambah, mengubah, dan menghapus pengguna.
- **Fungsionalitas Edit Perangkat**: Administrator dapat mengedit detail perangkat melalui modal.
- **Halaman Buat Transaksi**: Formulir khusus untuk Administrator untuk mencatat barang masuk dan keluar.
- **Pelacakan Nomor Registrasi**: Input dinamis untuk nomor registrasi saat menambahkan perangkat baru.
- **Dialog Konfirmasi**: Modal konfirmasi ditambahkan untuk semua tindakan hapus (Pengguna, Kategori, Perangkat) untuk mencegah penghapusan yang tidak disengaja.
- **Filter Rentang Tanggal**: Menambahkan filter berdasarkan tanggal mulai dan akhir di halaman Transaksi.
- **Notifikasi Telegram**: Integrasi untuk mengirim notifikasi otomatis untuk transaksi baru dan peringatan stok menipis.
- **Pengaturan Terpadu**: Menggabungkan halaman Profil, Tema, dan Cadangan ke dalam satu halaman Pengaturan.
- **Sidebar yang Dapat Disembunyikan**: Menambahkan tombol untuk menyembunyikan/menampilkan sidebar navigasi.
- **Footer Aplikasi**: Menambahkan footer konsisten di seluruh aplikasi.
- `README.md` dan `CHANGELOG.md` file inisial.

### Changed
- **Alur Kerja Tambah Perangkat**: Memindahkan fungsi "Tambah Perangkat" dari halaman Inventaris ke dalam alur kerja "Transaksi Masuk" di halaman Buat Transaksi.
- **Peningkatan Formulir Transaksi**:
    - Menambahkan ringkasan transaksi real-time yang menghitung stok awal dan akhir.
    - Menambahkan validasi untuk mencegah transaksi keluar jika stok tidak mencukupi.
    - Mengatur ulang tata letak formulir untuk kejelasan yang lebih baik.
- **Peningkatan UI Inventaris**:
    - Menambahkan lencana berkode warna untuk kolom "Kondisi" dan "Status" agar lebih mudah dibaca.
    - Memastikan konsistensi warna antara status dan kondisi.
- **Navigasi**: Menyederhanakan sidebar setelah menggabungkan halaman Pengaturan.

### Fixed
- **Fungsi Ganti Tema**: Memperbaiki logika tema "Sistem" agar secara dinamis merespons perubahan tema pada sistem operasi tanpa perlu me-refresh halaman.
- **Berbagai Perbaikan UI**: Menyelesaikan beberapa masalah kecil terkait konsistensi styling dan kesalahan ketik di seluruh aplikasi.