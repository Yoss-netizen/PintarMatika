# PintarMatika - Website Belajar Matematika

![PintarMatika Banner](https://via.placeholder.com/1200x630/2a7de1/ffffff?text=PintarMatika)

**PintarMatika** adalah sebuah platform belajar matematika online dengan konsep akses terbuka. Website ini menyediakan materi, contoh soal, dan latihan interaktif untuk siswa jenjang SD, SMP, dan SMA di Indonesia secara gratis dan tanpa perlu registrasi.

## ✨ Fitur Utama

* **Akses Terbuka**: Belajar kapan saja tanpa perlu login atau registrasi.
* **Pembelajaran Berjenjang**: Konten terstruktur rapi untuk jenjang **SD, SMP, dan SMA**.
* **Materi Lengkap**: Penjelasan konsep yang mudah dipahami, contoh soal, dan pembahasan detail.
* **Bank Soal Interaktif**: Latihan soal mandiri dengan tingkat kesulitan berbeda.
* **Desain Responsif**: Tampilan nyaman diakses melalui desktop maupun perangkat mobile.

## 🚀 Teknologi yang Digunakan

Proyek ini dibagi menjadi dua bagian utama: Frontend dan Backend.

* **Frontend (Tampilan)**
    * HTML5
    * CSS3
    * JavaScript (Vanilla JS)

* **Backend (Logika & Data)**
    * **Node.js** sebagai runtime environment.
    * **NestJS** sebagai framework backend yang terstruktur.
    * **TypeScript** untuk penulisan kode yang aman dan scalable.

## ⚙️ Panduan Instalasi & Menjalankan Proyek

Untuk menjalankan proyek ini di komputer lokal Anda, ikuti langkah-langkah berikut:

### 1. Menjalankan Backend

Backend berfungsi sebagai API (Application Programming Interface) yang menyediakan data materi dan soal.

```bash
# 1. Masuk ke direktori backend
cd backend

# 2. Install semua dependency yang dibutuhkan
npm install

# 3. Jalankan server dalam mode development
# Server akan aktif di http://localhost:3000
npm run start:dev
```

**Endpoint API yang tersedia:**
* `GET /api/kelas/{jenjang}` (Contoh: `/api/kelas/smp`) - Untuk mendapatkan daftar kelas per jenjang.
* `GET /api/bab/kelas/{kelasId}` (Contoh: `/api/bab/kelas/8`) - Untuk mendapatkan daftar bab per ID kelas.

### 2. Menjalankan Frontend

Frontend adalah tampilan website yang akan dilihat oleh pengguna di browser.

```bash
# Cukup buka file index.html di browser Anda.
# Anda bisa klik kanan pada file `frontend/index.html` lalu pilih "Open with Live Server"
# jika Anda menggunakan ekstensi Live Server di VS Code.
```

---

Dibuat dengan ❤️ untuk pendidikan Indonesia.
