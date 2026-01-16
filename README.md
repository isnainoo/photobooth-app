# 📸 Elegant Photobooth Web App

Aplikasi Photobooth berbasis web yang terinspirasi oleh tren *Korean Self-Photo Studio* (seperti Photoism/Life4Cuts). Dibangun menggunakan **Node.js** dan **HTML5 Canvas** dengan tema visual "Elegant Dark & Red".

Aplikasi ini berjalan di browser dan memungkinkan pengguna mengambil foto, memilih layout, memberikan efek filter *film grain*, dan mengunduh hasilnya secara instan.

![Project Preview](https://drive.google.com/file/d/1A7PBdtyna8VOO4sPJ8e7qVoPDWkHnw19/view?usp=drive_link)

## ✨ Fitur Utama

* **Real-time Camera Feed:** Tampilan kamera mirror (cermin) menggunakan API browser standar.
* **4-Shot Sequence:** Mengambil 4 foto berurutan dengan panduan interaktif.
* **Retake System:** Fitur untuk mengulang foto pada slot tertentu tanpa harus mengulang dari awal.
* **Multi-Layout Options:**
    * 🎞️ **Double Strip:** Layout klasik 2 strip vertikal (total 8 frame) dengan efek guntingan.
    * 🔲 **Elegant Grid:** Layout kotak 2x2 yang modern dan minimalis.
* **Image Processing (Canvas):**
    * Auto-generate bingkai, tanggal, dan watermark "Special Edition".
    * **Film Grain Effect:** Menambahkan tekstur noise untuk kesan foto analog yang estetik.
* **Hardware Shutter Support:** Mendukung pengambilan foto menggunakan tombol **Volume Up/Down** (pada HP) atau **Bluetooth Remote Clicker**.
* **Preview Modal:** Jendela *popup* elegan untuk melihat hasil sebelum disimpan.
* **Download & Share:** Simpan hasil sebagai file `.jpg` atau bagikan via Web Share API.

## 🛠️ Teknologi yang Digunakan

* **Backend:** Node.js, Express.js (untuk serving static files).
* **Frontend:** HTML5, CSS3 (Responsive Flexbox/Grid), Vanilla JavaScript.
* **Processing:** HTML5 Canvas API (untuk manipulasi gambar di sisi klien).
* **Fonts:** Montserrat & Playfair Display (Google Fonts).

## 🚀 Cara Menjalankan (Installation)

Ikuti langkah ini untuk menjalankan proyek di komputer lokal Anda:

1.  **Clone Repositori**
    ```bash
    git clone [https://github.com/isnainoo/elegant-photobooth.git](https://github.com/isnainoo/elegant-photobooth.git)
    cd elegant-photobooth
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Jalankan Server**
    ```bash
    npm start
    ```
    *Atau jika menggunakan nodemon:* `nodemon server.js`

4.  **Buka Aplikasi**
    Buka browser dan akses:
    ```
    http://localhost:3000
    ```

## 📂 Struktur Proyek

```text
photobooth-app/
├── public/
│   ├── index.html    # Antarmuka utama
│   ├── style.css     # Styling tema Elegant Dark/Red
│   └── script.js     # Logika kamera, canvas, dan interaksi
├── server.js         # Server Express sederhana
├── package.json      # Konfigurasi Node.js
└── README.md         # Dokumentasi ini

🎮 Cara Penggunaan
Izinkan akses kamera pada browser saat diminta.

Klik salah satu kotak kosong atau tombol "AMBIL FOTO".

Gunakan tombol Retake (ikon putar) di pojok foto jika ingin mengganti pose tertentu.

Setelah 4 foto terisi, tombol "LIHAT HASIL" akan aktif.

Pilih Layout Frame di bagian bawah (Double Strip atau Grid).

Klik "LIHAT HASIL", lalu Download atau Share.

Tips: Gunakan remote bluetooth smartphone untuk pengalaman photobooth yang lebih otentik!

👨‍💻 Author
Isna Choiron Nasikhin
GitHub: @isnainoo
