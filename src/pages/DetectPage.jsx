import { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import { load } from "@tensorflow-models/blazeface";
import axios from "axios";
import dataDetect from "../model/dataDetect";

function DetectPage() {
  const webcamRef = useRef(null);
  const [faceDetected, setFaceDetected] = useState(false);
  const [faceCoordinates, setFaceCoordinates] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [menyontek, setMenyontek] = useState(false);
  const [countCheat, setCountCheat] = useState([]);

  const location = useLocation();
  const thresholdsFromIntro = location.state;

  useEffect(() => {
    const isValidThresholds =
      Array.isArray(thresholdsFromIntro) &&
      thresholdsFromIntro.length === 4 &&
      thresholdsFromIntro.every((threshold) => typeof threshold === "number");

    // Threshold
    // console.log("Threshold: ", thresholdsFromIntro);

    if (!isValidThresholds) {
      setError("Invalid thresholds received from the Intro3 component.");
      return;
    }
  }, [thresholdsFromIntro]);

  useEffect(() => {
    let model;

    async function loadModel() {
      // Memuat model BlazeFace dari TensorFlow.js
      model = await load();

      // Memulai proses deteksi wajah secara berulang setiap 1s
      setInterval(processVideo, 2000);
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
          // console.log("predictions topLeft: ", predictions[0].topLeft[0]);
          // console.log(
          //   "predictions bottomRight: ",
          //   predictions[0].bottomRight[0]
          // );
        }
        // sendVideoToBackend();

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

  const sendVideoToBackend = async (x, y) => {
    try {
      setLoading(true);
      setError(null);

      const video = webcamRef.current.getScreenshot();
      const formData = new FormData();
      formData.append("video", dataURItoBlob(video));
      formData.append("x", x);
      formData.append("y", y);

      for (var data of formData) {
        console.log(data);
      }

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
        console.log("logs: ", response.data.faces);
        if (response.data.faces[0]) {
          setCountCheat(response.data.faces[0].count_cheat);
          console.log(response.data.faces[0].count_cheat);

          const cheating = response.data.faces[0].count_cheat;

          dataDetect.forEach((data) => {
            if (cheating[data.name] > thresholdsFromIntro[data.name]) {
              setMenyontek(true);
            }
          });
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

  return (
    <div>
      <nav className="bg-gray-800 p-4 w-full">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-white font-bold text-xl">
            Ruas (Ruang Pengawas) Ujian - Client
          </div>
        </div>
      </nav>
      <div className="flex">
        <div className="w-1/2 relative flex items-center">
          <Webcam ref={webcamRef} className="videoCapture w-3/4 rounded-3xl" />
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="w-fit h-fit text-white text-opacity-25 text-9xl animate-spin">
                .
              </p>
            </div>
          )}
        </div>
        <div className="flex-1 ml-5">
          {countCheat ? (
            <div>
              <p>Jumlah terdeteksi melakukan kecurangan</p>
              <table width="100%" className="mt-10">
                <thead>
                  <tr>
                    <td>Kategori Deteksi</td>
                    <td>Threshold</td>
                    <td>Jumlah Terdeteksi</td>
                    <td>Akurasi Tertinggi</td>
                  </tr>
                </thead>
                <tbody>
                  {dataDetect.map((data, index) => (
                    <tr key={index}>
                      <td>{data.label}</td>
                      <td>{thresholdsFromIntro[`${data.name}`]}</td>
                      <td>{countCheat[`${data.name}`]}</td>
                      <td>
                        {Number(countCheat[`${data.name}Persen`])
                          ? Number(countCheat[`${data.name}Persen`]).toFixed(2)
                          : ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="4">
                      Kesimpulan: {menyontek ? "Menyontek" : "Normal"}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      {faceCoordinates.map((face, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            border: "2px solid red",
            left: face.border_coordinates.x1,
            top: face.border_coordinates.y1,
            width: face.border_coordinates.x2 - face.border_coordinates.x1,
            height: face.border_coordinates.y2 - face.border_coordinates.y1,
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

      {error && <p>{error}</p>}
    </div>
  );
}

export default DetectPage;
