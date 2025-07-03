"use client"

import { faCheck, faMicrophone, faPause, faPlay, faStop } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import avatarImage from "../assets/avatar.png"
export default function Home() {
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const handleStartRecording = () => {
    setIsRecording(true)
    setIsPaused(false)
    
  }
  
  const handlePauseRecording = () => {
    setIsPaused(!isPaused)
  }
  
  const handleStopRecording = () => {
    setIsRecording(false)
    setIsPaused(false)
    console.log("Recording stopped. Time:", recordingTime)
    setRecordingTime(0)
  }
  
  
  useEffect(() => {
    let interval;
    
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRecording, isPaused]);
  console.log("recordingTime", recordingTime)
  return (
    <div className="bg-gray-200 flex">

        
      <div className="w-full flex flex-col items-center text-center pt-8 px-4 max-w-7xl">
          
          <p className="text-base sm:text-lg text-gray-600 max-w-xl font-poppins mb-6">
            Start a conversation with your AI tutor. Ask questions, get explanations, or practice speaking.
          </p>

          {/* Robot Section */}
          <div className="relative mb-">
            <div
              className={`w-56 h-64  flex items-center justify-center transition-all duration-300 ${isRecording && !isPaused
                  ? "bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl scale-105"
                  : "bg-gradient-to-br from-gray-700 to-gray-800 shadow-xl"
                }`}
            >
            <img src={avatarImage} alt="avatar" className="w-56 h-64 "/>
            </div>

            
            <div className="absolute -bottom-2 -right-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${isRecording && !isPaused
                    ? "bg-red-500 animate-pulse"
                    : isPaused
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
              >
                <FontAwesomeIcon
                  icon={
                    isRecording && !isPaused ? faMicrophone : isPaused ? faPause : faCheck
                  }
                  className="text-white text-sm"
                />
              </div>
            </div>
          </div>

          
          <div className=" mt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-1 font-roboto">
              AI Tutor Assistant
            </h3>
            <p
              className={`text-lg font-medium font-poppins ${isRecording && !isPaused
                  ? "text-red-600"
                  : isPaused
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
            >
              {isRecording && !isPaused
                ? "Listening..."
                : isPaused
                  ? "Recording Paused"
                  : "Ready to help"}
            </p>
            {isRecording && (
              <p className="text-sm text-gray-500 mt-1">
                Recording time: {Math.floor(recordingTime / 60)}:
                {(recordingTime % 60).toString().padStart(2, "0")}
              </p>
            )}
          </div>

          
          <div className="flex justify-center items-center space-x-6 mt-8 mb-2">
            <button
              onClick={handleStartRecording}
              disabled={isRecording && !isPaused}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition transform hover:scale-105 ${isRecording && !isPaused
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl"
                }`}
            >
              <FontAwesomeIcon
                icon={isPaused ? faPlay : faMicrophone}
                className="text-white text-xl"
              />
            </button>

            <button
              onClick={handlePauseRecording}
              disabled={!isRecording}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition transform hover:scale-105 ${!isRecording
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-yellow-500 hover:bg-yellow-600 shadow-lg hover:shadow-xl"
                }`}
            >
              <FontAwesomeIcon icon={faPause} className="text-white text-xl" />
            </button>

            <button
              onClick={handleStopRecording}
              disabled={!isRecording}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition transform hover:scale-105 ${!isRecording
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600 shadow-lg hover:shadow-xl"
                }`}
            >
              <FontAwesomeIcon icon={faStop} className="text-white text-xl" />
            </button>
          </div>
        </div>
      <div className="bg-white rounded-2xl p-6 shadow border border-gray-200">
        <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center font-roboto">
          How to use your AI Tutor
        </h4>
        <div className="flex flex-col gap-5">
          {/* Instruction Card */}
          <div className="border border-gray-200 rounded-xl p-4 text-center hover:shadow-md transition bg-gray-50">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <FontAwesomeIcon icon={faMicrophone} className="text-white" />
            </div>
            <h5 className="font-semibold text-gray-900 mb-2 font-roboto">Start Recording</h5>
            <p className="text-gray-600 text-sm font-poppins">
              Click the green microphone button to start recording your question or conversation.
            </p>
          </div>

          <div className="border border-gray-200 rounded-xl p-4 text-center hover:shadow-md transition bg-gray-50">
            <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <FontAwesomeIcon icon={faPause} className="text-white" />
            </div>
            <h5 className="font-semibold text-gray-900 mb-2 font-roboto">Pause & Resume</h5>
            <p className="text-gray-600 text-sm font-poppins">
              Use the pause button to temporarily stop recording and resume when ready.
            </p>
          </div>

          <div className="border border-gray-200 rounded-xl p-4 text-center hover:shadow-md transition bg-gray-50">
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
    </div>
  );
  
}
