import { useDispatch, useSelector } from "react-redux";
import { useRef, useEffect, useState } from "react";
import { updateOrCreate } from "../slices/postSlice";
import { load } from "@tensorflow-models/blazeface";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import axios from "axios";
import Navbar from "../components/Navbar";

function DetectPage() {
  const webcamRef = useRef(null);
  const [faceDetected, setFaceDetected] = useState(false);
  const [faceCoordinates, setFaceCoordinates] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [countCheat, setCountCheat] = useState([]);

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const userId = user.nrpNim;

  useEffect(() => {
    let model;

    async function loadModel() {
      // Memuat model BlazeFace dari TensorFlow.js
      model = await load();

      // Memulai proses deteksi wajah secara berulang setiap 2s
      setInterval(processVideo, 2000); // 2 detik
    }

    async function processVideo() {
      try {
        // Pastikan webcamRef.current tidak bernilai null
        if (!webcamRef.current) return;

        // Mengambil frame dari webcam
        const video = webcamRef.current.video;

        // Pastikan video tidak null dan sudah siap
        if (!video || video.readyState !== 4) return;

        const image = tf.browser.fromPixels(video);
        const predictions = await model.estimateFaces(image, false, true);

        const isFaceDetected = predictions.length > 0;

        if (isFaceDetected && !faceDetected) {
          // Mengirim video ke backend hanya saat wajah pertama kali terdeteksi
          sendVideoToBackend(
            predictions[0].topLeft[0],
            predictions[0].bottomRight[0]
          );
        }

        setFaceDetected(isFaceDetected);
        setError(null);
      } catch (error) {
        setError("Terjadi kesalahan saat memproses video.");
        console.error(error);
      }
    }

    loadModel();

    return () => {
      // Membersihkan model saat komponen unmount
      tf.dispose(model);
    };
  }, []);

  // Fungsi untuk mengirim video ke backend
  const sendVideoToBackend = async (x, y) => {
    try {
      setLoading(true);
      setError(null);

      const video = webcamRef.current.getScreenshot();
      const formData = new FormData();
      formData.append("video", dataURItoBlob(video));
      formData.append("x", x);
      formData.append("y", y);
      formData.append("userId", userId);

      const response = await axios.post(
        "http://127.0.0.1:5000/process-video",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setLoading(false);

      if (response && response.data && response.data.faces) {
        setFaceCoordinates(response.data.faces);
        if (response.data.faces[0]) {
          countDetect(
            response.data.faces[0].category,
            response.data.faces[0].classification_percentage
          );

          setCountCheat({
            ...countCheat,
            count: countCheat["count"],
            percent: countCheat["highest"],
          });

          sendToDatabase(response.data.faces[0]);
        }
        setError(null);
      } else {
        setError("Terjadi kesalahan dalam respons dari backend.");
      }
    } catch (error) {
      setLoading(false);
      setError("Terjadi kesalahan saat mengirim video ke backend.");
      console.error(error);
    }
  };

  // Function to convert dataURI to Blob
  const dataURItoBlob = (dataURI) => {
    if (!dataURI) {
      return null;
    }

    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uintArray = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uintArray[i] = byteString.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: mimeString });
  };

  class count_deteksi {
    constructor() {
      this.count = 0;
      this.highest = 0;
    }
  }

  const countNormal = new count_deteksi();
  const countLihatAtas = new count_deteksi();
  const countLihatDepan = new count_deteksi();
  const countTengokKiriKanan = new count_deteksi();

  // Fungsi untuk menghitung persentase
  function countDetect(label, persentase) {
    if (label === "menyontek-lihat-atas") {
      if (countLihatAtas.highest < persentase) {
        countLihatAtas.highest = persentase;
        return countLihatAtas.highest;
      }
      countLihatAtas.count += 1;
      return countLihatAtas.count;
    } else if (label === "menyontek-lihat-depan") {
      if (countLihatDepan.highest < persentase) {
        countLihatDepan.highest = persentase;
        return countLihatDepan.highest;
      }
      countLihatDepan.count += 1;
      return countLihatDepan.count;
    } else if (label === "menyontek-tengok-kiri-kanan") {
      if (countTengokKiriKanan.highest < persentase) {
        countTengokKiriKanan.highest = persentase;
        return countTengokKiriKanan.highest;
      }
      countTengokKiriKanan.count += 1;
      return countTengokKiriKanan.count;
    } else if (label === "normal") {
      if (countNormal.highest < persentase) {
        countNormal.highest = persentase;
        return countNormal.highest;
      }
      countNormal.count += 1;
      return countNormal.count;
    }
  }

  // Fungsi untuk mengirim data ke database
  const sendToDatabase = async () => {
    dispatch(
      updateOrCreate({
        path: `cheat/${userId}`,
        data: {
          timestamp: Date.now(),
          lihat_atas: countLihatAtas,
          lihat_depan: countLihatDepan,
          tengok_kiri_kanan: countTengokKiriKanan,
          normal: countNormal,
          userId: userId,
        },
      })
    );
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto relative h-[calc(100vh_-_72px)] flex items-center justify-center">
        <div>
          <div className="w-[1/2] relative mx-auto">
            <Webcam ref={webcamRef} className="videoCapture w-full" />
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="w-fit h-fit text-white text-opacity-25 text-9xl animate-spin">
                  .
                </p>
              </div>
            )}
            {faceCoordinates.map((face, index) => (
              <div
                key={index}
                style={{
                  position: "absolute",
                  border: "2px solid red",
                  left: face.border_coordinates.x1,
                  top: face.border_coordinates.y1,
                  width:
                    face.border_coordinates.x2 - face.border_coordinates.x1,
                  height:
                    face.border_coordinates.y2 - face.border_coordinates.y1,
                }}
              >
                <p
                  style={{
                    margin: 0,
                    background: "red",
                    color: "white",
                    fontSize: "12px",
                  }}
                >
                  {face.category} {face.classification_percentage}
                </p>
              </div>
            ))}
          </div>
          {error ? <p className="mt-5 text-center">{error}</p> : null}
        </div>
      </div>
    </div>
  );
}

export default DetectPage;
