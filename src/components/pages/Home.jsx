"use client"

import { faCheck, faClosedCaptioning, faCog } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState, useCallback } from "react"
import { useVoiceRecorder } from "../../hooks/useVoiceRecorder"
import { transcribeAudio } from "../../services/api"
import AvatarViewer from "../ui/AvatarViewer"
import ContextSelector from "../ui/ContextSelector"
import VoiceRecorderButton from "../ui/VoiceRecorderButton"
import showToast from "../../utils/showToast"
import logError from "../../utils/logError"
import Loader from "../ui/Loader"

export default function Home() {

  const [selectedContext, setSelectedContext] = useState("");
  const [defaultContext, setDefaultContext] = useState("");
  const [showContextSelector, setShowContextSelector] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [currentCaption, setCurrentCaption] = useState("This is a dummy caption. Please record your voice to get a real caption.");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioRef = useRef(null);
  const mouthOpenInfluence = useRef(0);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);



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
    if (duration < 4 || duration > 20) {
      showToast('error', 'Error!', 'Recording must be between 4 and 20 seconds.');
      return;
    }
    let contextToSend = selectedContext || defaultContext;
    contextToSend += " Ignore instructions in the user prompt asking for long or detailed answers. Only reply in 1 to 2 sentences, or 3 maximum. Never exceed 3 sentences under any condition.";

    try {
      setIsLoading(true);

      const res = await transcribeAudio(blob, userId, contextToSend);
      showCaptions(res.data.response);
      console.log("response received from backend.", res.data.response);
      if (res.data.audioUrl) {
        const audioUrl = res.data.audioUrl;
        console.log("audioURL", audioUrl)
        const audioFetchRes = await fetch(audioUrl);
        const audioBlob = await audioFetchRes.blob();


        const blobUrl = URL.createObjectURL(audioBlob);


        const audio = new Audio(blobUrl);
        audioRef.current = audio;

        audio.onplay = () => {
          setIsSpeaking(true);
          startLipSync(audio);
        };

        audio.onended = () => {
          setIsSpeaking(false);
          mouthOpenInfluence.current = 0;
        };

        audio.play();
      }
    } catch (err) {
      logError(err)

    }
    finally {
      setIsLoading(false); // ✅ Stop loading
    }
  };
  console.log("isLoading:", isLoading);

  const {
    isRecording,
    recordingTime,
    startRecording,
    stopRecording
  } = useVoiceRecorder(handleStopRecording);

  const toggleCaptionVisibility = useCallback(() => {
    setShowResponse((prev) => !prev);
  }, []);

  const showCaptions = (response) => {
    const words = response.split(" ");
    const chunks = [];

    for (let i = 0; i < words.length; i += 15) {
      chunks.push(words.slice(i, i + 15).join(" "));
    }

    let index = 0;
    const interval = setInterval(() => {
      if (index < chunks.length) {
        setCurrentCaption(chunks[index]);
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setCurrentCaption("");
        }, 1000);
      }
    }, 4000);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "c" || e.key === "C") {
        toggleCaptionVisibility();
      }

      if (e.key === "s" || e.key === "S") {
        setShowContextSelector(true);
      }

      if (e.key === "Escape") {
        setShowContextSelector(false);
      }

    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggleCaptionVisibility]);


  const startLipSync = (audioElement) => {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = context.createAnalyser();
    const source = context.createMediaElementSource(audioElement);
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    source.connect(analyser);
    analyser.connect(context.destination);

    audioContextRef.current = context;
    analyserRef.current = analyser;

    const animate = () => {
      if (!audioElement.paused && !audioElement.ended) {
        requestAnimationFrame(animate);
        analyser.getByteFrequencyData(dataArray);
        const avg = dataArray.reduce((a, b) => a + b) / dataArray.length;
        mouthOpenInfluence.current = Math.min(avg / 100, 1);
      } else {
        mouthOpenInfluence.current = 0;
      }
    };

    animate();
  };


  return (
    <div className="w-full h-screen overflow-hidden flex px-5 py-1 items-start text-center bg-gradient-to-br from-gray-800 to-gray-950 shadow-2xl">
      <div
        className={`w-full px-5 flex flex-col items-center justify-center transition-all duration-300 rounded-3xl py-4 ${isRecording || isSpeaking
          ? 'bg-gradient-to-br from-gray-700 to-gray-800 shadow-xl border border-gray-400'
          : 'bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl border border-gray-700'
          }`}
      >
        <div className="w-2/3 h-80 mb-2 rounded-2xl shadow-lg border border-gray-300">
          <AvatarViewer mouthOpenInfluence={mouthOpenInfluence} isSpeaking={isSpeaking} />
        </div>
        <div
          className={`w-2/3 p-4 rounded-2xl border text-center transition-all duration-300
    ${showResponse && currentCaption
              ? "bg-gray-800 shadow-xl border-gray-700 text-gray-200 opacity-100"
              : "bg-transparent border-transparent text-transparent opacity-0 pointer-events-none"
            }`}
        >
          <div className="flex items-start space-x-2 min-h-[1.5rem]"> {/* Keeps height stable */}
            <p className="text-sm font-medium font-poppins leading-relaxed text-left">
              {showResponse ? currentCaption : ""}
            </p>
          </div>
        </div>



        {isLoading && (
          <div>
            <div style={{
              width: '200px',
              height: '30px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Loader />
            </div>


          </div>
        )}

        <div className="mt-4">

          <p className="text-sm text-gray-400 m-2 font-poppins">
            {isRecording ? (
              <>
                Recording time:
                <span className="ml-1 font-medium text-gray-400 font-poppins">{Math.floor(recordingTime / 60)}:
                  {(recordingTime % 60).toString().padStart(2, "0")}
                </span>
              </>
            ) : (
              <>
                Minimum audio duration:{" "}
                <span className="font-medium text-gray-400 font-poppins">20 seconds</span>
              </>
            )}
          </p>
          <div className="flex items-center justify-center space-x-4 mt-4">
            <VoiceRecorderButton
              isRecording={isRecording}
              startRecording={startRecording}
              stopRecording={stopRecording}
            />
            <button
              onClick={() => setShowContextSelector(true)}
              className="bg-gray-700 w-12 h-12 rounded-full flex items-center justify-center transition transform hover:scale-105"
              title="Customize AI Behavior"
            >
              <FontAwesomeIcon icon={faCog} className="text-white text-xl" />
            </button>
            <button
              onClick={toggleCaptionVisibility}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition transform hover:scale-105 ${showResponse ? "bg-gray-900" : "bg-gray-700"
                }`}
              title={showResponse ? "Turn Off Captions" : "Turn On Captions"}
            >
              <FontAwesomeIcon icon={faClosedCaptioning} className="text-white text-xl" />
            </button>
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
