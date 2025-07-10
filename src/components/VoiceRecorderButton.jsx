
import { faCheck, faMicrophone, faStop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function VoiceRecorderButton({ isRecording, startRecording, stopRecording }) {
  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Button Row */}
      <div className="flex items-center space-x-3">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition transform hover:scale-105 ${isRecording
              ? "bg-red-500 hover:bg-red-600 shadow-lg hover:shadow-xl"
              : "bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl"
            }`}
        >
          <FontAwesomeIcon
            icon={isRecording ? faStop : faMicrophone}
            className="text-white text-xl"
          />
        </button>

        <button
          disabled
          className={`w-8 h-8 rounded-full flex items-center justify-center cursor-default ${isRecording ? "bg-red-500 animate-pulse" : "bg-green-500"
            }`}
        >
          <FontAwesomeIcon
            icon={isRecording ? faMicrophone : faCheck}
            className="text-white text-sm"
          />
        </button>
      </div>

      <div >
      <p className="text-sm text-gray-500 font-poppins text-center max-w-xs">
        Recording will automatically stop after{" "}
        <span className="font-semibold text-gray-700">3 seconds of silence</span>.
      </p>
      </div>
    </div>

  );
}
