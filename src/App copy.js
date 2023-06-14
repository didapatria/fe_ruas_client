import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

function App() {
  const webcamRef = useRef(null);
  const [faceCoordinates, setFaceCoordinates] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const processVideo = async () => {
      try {
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

        setFaceCoordinates(response.data.faces);
        setError(null);
      } catch (error) {
        setError("An error occurred while processing the video.");
        console.error(error);
      }
    };

    const interval = setInterval(() => {
      processVideo();
    }, 100);

    return () => clearInterval(interval);
  }, []);

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
      <Webcam ref={webcamRef} />

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
          <p>
            Label: {face.label}, Prediction:{" "}
            {face.classification_percentage.toFixed(2)}%
          </p>
        </div>
      ))}

      {error && <p>{error}</p>}
    </div>
  );
}

export default App;
