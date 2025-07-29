import { faMicrophone, faStop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";

export default function VoiceRecorderButton({ isRecording, startRecording, stopRecording }) {

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        isRecording ? stopRecording() : startRecording();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isRecording, startRecording, stopRecording]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center space-x-3">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition transform hover:scale-105 ${isRecording
            ? "bg-gray-900 hover:bg-red-500 shadow-lg hover:shadow-xl"
            : "bg-gray-700 hover:bg-gray-600 shadow-lg hover:shadow-xl"
            }`}
          title={isRecording ? "Stop Recording (Space)" : "Start Recording (Space)"}
        >
          <FontAwesomeIcon
            icon={isRecording ? faStop : faMicrophone}
            className="text-white text-xl"
          />
        </button>
      </div>
    </div>
  );
}
