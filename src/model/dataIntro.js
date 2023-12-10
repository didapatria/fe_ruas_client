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
    title: "Daftar Kategori Deteksi dan Threshold",
    subtitle: "Terdapat 3 jenis kategori yang akan dideteksi dan thresholdnya",
    img: [
      {
        id: 1,
        label: "Tengok Kiri-Kanan",
        category: "tengok_kiri_kanan",
        url: "1-kategori-tengok-kiri-kanan.jpg",
      },
      {
        id: 2,
        label: "Lihat Depan",
        category: "lihat_depan",
        url: "2-kategori-lihat-depan.jpg",
      },
      {
        id: 3,
        label: "Lihat Atas",
        category: "lihat_atas",
        url: "3-kategori-lihat-atas.jpg",
      },
    ],
  },
];

export default dataIntro;
