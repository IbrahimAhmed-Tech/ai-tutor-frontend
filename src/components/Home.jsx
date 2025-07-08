"use client"

import { faCheck, faMicrophone, faStop } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import avatarImage from "../assets/avatar.png"
import { useVoiceRecorder } from "../hooks/useVoiceRecorder"
import VoiceRecorderButton from "./VoiceRecorderButton"
import toast from "react-hot-toast"
import { transcribeAudio } from "../services/api"

export default function Home() {


  const handleStopRecording = async (blob) => {
    toast.success("Recording stopped. Sending to backend...");

    try {
      const res = await transcribeAudio(blob);
      console.log("Transcribed text:", res.data.text);
     
    } catch (err) {
      console.error("Transcription error:", err);
      toast.error("Failed to transcribe audio.");
    }
  };

  const {
    isRecording,
    recordingTime,
    startRecording,
    stopRecording
  } = useVoiceRecorder(handleStopRecording);

  return (
    <div className="bg-gray-200 flex flex-col sm:flex-row px-2">       
      
      <div className="bg-white rounded-xl p-4  border border-gray-200 my-4 h-fit">
        <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center font-roboto">
          How to use your AI Tutor
        </h4>
        <div className="flex flex-col gap-10">
       
          <div className="border border-gray-200 rounded-xl p-4 text-center hover:shadow-md transition bg-gray-50">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <FontAwesomeIcon icon={faMicrophone} className="text-white" />
            </div>
            <h5 className="font-semibold text-gray-900 mb-2 font-roboto">Start Recording</h5>
            <p className="text-gray-600 text-sm font-poppins">
              Click the green microphone button to start recording your question or conversation.
            </p>
          </div>

        

          <div className="border border-gray-200 rounded-xl p-4 text-center hover:shadow-md   ">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <FontAwesomeIcon icon={faStop} className="text-white" />
            </div>
            <h5 className="font-semibold text-gray-900 mb-2 font-roboto">Stop & Process</h5>
            <p className="text-gray-600 text-sm font-poppins">
              Click stop when finished. Your AI tutor will process and respond to your input.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center text-center pt-8 px-4 max-w-7xl">
        
        <div className="relative mb-">
          <div
            className={`w-56 h-64 flex items-center justify-center transition-all duration-300 ${isRecording
              ? "bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl scale-105"
              : "bg-gradient-to-br from-gray-700 to-gray-800 shadow-xl"
              }`}
          >
            <img src={avatarImage} alt="avatar" className="w-56 h-64" />
          </div>
          <div className="absolute -bottom-2 -right-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${isRecording ? "bg-red-500 animate-pulse" : "bg-green-500"
                }`}
            >
              <FontAwesomeIcon
                icon={isRecording ? faMicrophone : faCheck}
                className="text-white text-sm"
              />
            </div>
          </div>
        </div>
        <div className=" mt-2">
          <h3 className="text-xl font-semibold text-gray-900 mb-1 font-roboto">
            AI Tutor Assistant
          </h3>
          <p
            className={`text-lg font-medium font-poppins ${isRecording ? "text-red-600" : "text-green-600"
              }`}
          >
            {isRecording ? "Listening..." : "Ready to help"}
          </p>
          {isRecording && (
            <p className="text-sm text-gray-500 mt-1">
              Recording time: {Math.floor(recordingTime / 60)}:
              {(recordingTime % 60).toString().padStart(2, "0")}
            </p>
          )}
        </div>


        <div className="flex justify-center items-center space-x-6 mt-2 mb2">
          <div className=" flex items-center justify-center">
            <VoiceRecorderButton
              isRecording={isRecording}
              startRecording={startRecording}
              stopRecording={stopRecording}
            />
          </div>


        </div>
      </div>
    </div>
  );
  
}
