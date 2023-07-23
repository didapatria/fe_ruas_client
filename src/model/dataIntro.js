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
    title: "Klasifikasi Object",
    content: "Terdapat 3 jenis kategori yang akan dideteksi",
    img: [
      { id: 1, category: "Category 1", url: "url_1" },
      { id: 2, category: "Category 2", url: "url_2" },
      { id: 3, category: "Category 3", url: "url_3" },
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
