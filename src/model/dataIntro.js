const dataIntro = [
  {
    id: 1,
    title: "Bagaimana Web App Bekerja?",
    content: [
      { id: 1, list: "Aktifkan webcam yang terdapat pada kamera laptop" },
      { id: 2, list: "Untuk setiap deteksi kecurangan akan dihitung" },
    ],
  },
  {
    id: 2,
    title: "Daftar Kategori Deteksi",
    subtitle: "Terdapat 4 jenis kategori yang akan dideteksi",
    img: [
      {
        id: 1,
        category: "Tengok Kiri-Kanan",
        url: "1-kategori-lirik-kiri-kanan.jpg",
      },
      {
        id: 2,
        category: "Tengok Depan-Belakang",
        url: "2-kategori-tengok-depan-belakang.jpg",
      },
      {
        id: 3,
        category: "Lirik Kiri-Kanan",
        url: "3-kategori-tengok-kiri-kanan.jpg",
      },
      { id: 4, category: "Lihat Atas", url: "4-kategori-lihat-atas.jpg" },
    ],
  },
  {
    id: 3,
    title: "Tentukan Konfigurasi Threshold",
    subtitle:
      "Tentukan berapa batas toleransi masing-masing kategori jika terdeteksi",
    content: [
      {
        id: 1,
        label: "Tengok Kiri-Kanan",
        name: "tengok-kiri-kanan",
        threshold: 0,
      },
      { id: 2, label: "Lihat Atas", name: "lihat-atas", threshold: 0 },
      {
        id: 3,
        label: "Lihat Kiri-Kanan",
        name: "lihat-kiri-kanan",
        threshold: 0,
      },
      {
        id: 4,
        label: "Tengok Depan-Belakang",
        name: "tengok-depan-belakang",
        threshold: 0,
      },
    ],
  },
];

export default dataIntro;
