"use client"

import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import avatarImage from "../assets/avatar2.jpg"
import { useVoiceRecorder } from "../hooks/useVoiceRecorder"
import ContextSelector from "./ContextSelector"
import Tutorial from "./Tutorial"
import VoiceRecorderButton from "./VoiceRecorderButton"
import { transcribeAudio } from "../services/api"

export default function Home() {

  const [selectedContext, setSelectedContext] = useState("");
  const [defaultContext, setDefaultContext] = useState("");
  const [showContextSelector, setShowContextSelector] = useState(false);
  const [gptResponse, setGptResponse] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioRef = useRef(null);
  
  const user = localStorage.getItem("user");
  const userId = user ? JSON.parse(user).id : null;

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsed = JSON.parse(user);
      setDefaultContext(parsed.context || "");
    }
  }, []);




  const handleStopRecording = async (blob) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const arrayBuffer = await blob.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    const duration = audioBuffer.duration;
    console.log("Audio Duration:", duration);
    if (duration > 20) {
      toast.error("Recording is too long. Please keep it under 20 seconds.");
      return;
    }
    toast.success("Recording stopped. Sending to backend...");
    const contextToSend = selectedContext || defaultContext;
    try {
      const res = await transcribeAudio(blob, userId, contextToSend);
      setGptResponse(res.data.response);
      console.log("resData:", res.data.audioUrl);
      if (res.data.audioUrl) {
        const audio = new Audio(`${process.env.REACT_APP_API_BASE_URL}${res.data.audioUrl}`);
        audioRef.current = audio;

        audio.onplay = () => setIsSpeaking(true);
        audio.onended = () => setIsSpeaking(false);

        audio.play();
      }


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
    <div className="min-h-screen bg-gray-200 flex flex-col sm:flex-row px-2 overflow-hidden">

      <Tutorial />
      <div className="w-full flex flex-col items-center text-center ">

        <div className="relative mt-4 ">
          {/* <div className="rounded">
            <button
              onClick={() => setShowContextSelector(true)}
              className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
              title="Customize AI Behavior"
            >
              <FontAwesomeIcon icon={faCog} className="text-gray-700 text-lg" />
            </button>
          </div> */}

          <div className={`flex flex-col items-center justify-center transition-all duration-300 rounded-3xl p-6 ${isRecording || isSpeaking ? "bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl scale-105" : "bg-gradient-to-br from-gray-700 to-gray-800 shadow-xl"}`}>
            <div className="relative mb-6">
              <img
                src={avatarImage || "/placeholder.svg"}
                alt="avatar"
                className={`w-56 h-64 rounded-2xl border-4 border-white/20 object-over transition-all duration-300 ${isSpeaking ? "animate-pulse shadow-lg" : ""}`}
              />
              <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-3 border-white ${isRecording ? "bg-red-500" : isSpeaking ? "bg-green-500" : "bg-gray-400"}`} />
            </div>

            {gptResponse && (
              <div className={`w-64 p-4 text-gray-800 bg-white rounded-2xl shadow-lg border border-gray-200 text-center transition-all duration-300 ${isSpeaking ? "scale-105" : ""}`}>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-500 mt-2 flex-shrink-0" />
                  <p className="text-sm  font-medium font-poppins leading-relaxed text-left">{gptResponse}</p>
                </div>
              </div>
            )} 
          </div>

          <div className="absolute -bottom-2 -right-2">

          </div>
        </div>
        <div className=" mt-2">


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
      {showContextSelector && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative">
            <ContextSelector
              selectedContext={selectedContext}
              setSelectedContext={setSelectedContext}
              defaultProfileContext={defaultContext}
            />


            <div className="mt-6 text-right">
              <button
                onClick={() => setShowContextSelector(false)}
                className="group relative w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 transform hover:scale-[1.02]"
              >
                <FontAwesomeIcon icon={faCheck} />
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

}
