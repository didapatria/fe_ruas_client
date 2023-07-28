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
      { id: 1, category: "Lihat Atas", url: "1-kategori-lihat-atas.jpg" },
      {
        id: 2,
        category: "Lihat Depan",
        url: "2-kategori-lihat-depan.jpg",
      },
      {
        id: 3,
        category: "Tengok Kiri-Kanan",
        url: "3-kategori-tengok-kiri-kanan.jpg",
      },
      // {
      //   id: 4,
      //   category: "Lirik Kiri-Kanan",
      //   url: "4-kategori-lirik-kiri-kanan.jpg",
      // },
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
        label: "Lihat Atas",
        name: "lihatAtas",
        threshold: 0,
      },
      { id: 2, label: "Lihat Depan", name: "lihatDepan", threshold: 0 },
      {
        id: 3,
        label: "Tengok Kiri-Kanan",
        name: "tengokKiriKanan",
        threshold: 0,
      },
      {
        id: 4,
        label: "Normal",
        name: "normal",
        threshold: 0,
      },
      // {
      //   id: 3,
      //   label: "Lirik Kiri-Kanan",
      //   name: "lirik-kiri-kanan",
      //   threshold: 0,
      // },
    ],
  },
];

export default dataIntro;
