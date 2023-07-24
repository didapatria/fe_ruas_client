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
    console.log("Threshold: ", thresholdsFromIntro);

    if (!isValidThresholds) {
      setError("Invalid thresholds received from the Intro3 component.");
      return;
    }

    // Update the menyontek state whenever thresholdsFromIntro changes
    if (checkThresholds()) {
      setMenyontek(true);
    } else {
      setMenyontek(false);
    }
  }, [countCheat, thresholdsFromIntro]);

  useEffect(() => {
    let model;

    async function loadModel() {
      // Memuat model BlazeFace dari TensorFlow.js
      model = await load();

      // Memulai proses deteksi wajah secara berulang setiap 1s
      setInterval(processVideo, 1000);
    }

    async function processVideo() {
      try {
        // Mengambil frame dari webcam
        const video = webcamRef.current.video;
        const image = tf.browser.fromPixels(video);
        const predictions = await model.estimateFaces(image, false, true);

        const isFaceDetected = predictions.length > 0;

        if (isFaceDetected && !faceDetected) {
          // Mengirim video ke backend hanya saat wajah pertama kali terdeteksi
          sendVideoToBackend();
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

  const checkThresholds = () => {
    const values = dataDetect.map((data) => countCheat[`${data.name}`]);

    // Menghasilkan array baru dengan hasil perbandingan terhadap ambang batas
    const results = values.map(
      (value, index) => value > thresholdsFromIntro[index]
    );

    return results;
  };

  const sendVideoToBackend = async () => {
    try {
      setLoading(true);
      setError(null);
      setMenyontek(false);

      const video = webcamRef.current.getScreenshot();
      const formData = new FormData();
      formData.append("video", dataURItoBlob(video));

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
          if (checkThresholds()) {
            setMenyontek(true);
          }
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
        <div className="w-2/3">
          <Webcam ref={webcamRef} className="videoCapture" />
          {loading && <p>Loading...</p>}
        </div>
        <div className="flex-1 ml-5">
          {countCheat ? (
            <div>
              <p>Jumlah terdeteksi melakukan kecurangan</p>
              <ul>
                {dataDetect.map((data, index) => (
                  <li key={index}>
                    {data.label}: <b>{countCheat[`${data.name}`]}</b> (deteksi
                    tertinggi:{" "}
                    {Number(countCheat[`${data.name}-persen`]).toFixed(2)}%){" "}
                    {thresholdsFromIntro[`${data.name}`]}
                  </li>
                ))}
                <li>
                  Kesimpulan: <b>{menyontek ? "Menyontek" : "Normal"}</b>
                </li>
              </ul>
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
