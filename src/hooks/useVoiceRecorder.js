import { useState, useRef, useEffect } from "react";

export function useVoiceRecorder(onStop) {
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);

    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const silenceTimerRef = useRef(null);
    const animationIdRef = useRef(null);
    const audioContextRef = useRef(null);

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        const audioContext = new AudioContext();
        audioContextRef.current = audioContext;

        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        source.connect(analyser);

        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                audioChunksRef.current.push(event.data);
            }
        };

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
            if (onStop) onStop(audioBlob);
        };

        mediaRecorder.start();
        setIsRecording(true);
        setRecordingTime(0);

        const detectSilence = () => {
            const buffer = new Uint8Array(analyser.fftSize);
            analyser.getByteTimeDomainData(buffer);

            const avg = buffer.reduce((sum, val) => sum + Math.abs(val - 128), 0) / buffer.length;
            const silenceThreshold = 3;

            if (avg < silenceThreshold) {
                if (!silenceTimerRef.current) {
                    silenceTimerRef.current = setTimeout(() => stopRecording(), 3000); // ← 3 seconds
                }
            } else {
                clearTimeout(silenceTimerRef.current);
                silenceTimerRef.current = null;
            }

            animationIdRef.current = requestAnimationFrame(detectSilence);
        };

        detectSilence();
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
            mediaRecorderRef.current.stop();
        }

        setIsRecording(false);
        clearTimeout(silenceTimerRef.current);
        cancelAnimationFrame(animationIdRef.current);
        silenceTimerRef.current = null;
        animationIdRef.current = null;

        audioContextRef.current?.close();
        audioContextRef.current = null;
    };
   
    useEffect(() => {
        let timer;
        if (isRecording) {
            timer = setInterval(() => {
                setRecordingTime((prev) => prev + 1);
            }, 1000);
        } else {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isRecording]);

    return {
        isRecording,
        recordingTime,
        startRecording,
        stopRecording,
    };
}
