"use client";

import demoVideo from "../../assets/samplevideo.mp4";

export default function Demo() {

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-950 flex flex-col items-center justify-center px-4 py-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-200 mb-4 font-roboto text-center">
                Welcome to AI Tutor - Your Smart Learning Companion!
            </h1>
            <p className="text-gray-300 text-center max-w-xl font-poppins mb-10 text-base sm:text-lg">
                Experience AI-powered conversations designed to help you learn, practice speaking, and get instant answers.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 max-w-5xl w-full">
                <div className="border border-gray-700 rounded-2xl p-6 text-center bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <h3 className="font-semibold text-gray-100 mb-2 font-roboto">Real-Time Speech to Text</h3>
                    <p className="text-gray-300 text-sm font-poppins">
                        Speak into the mic and watch your words magically appear as text using Whisper AI.
                    </p>
                </div>

                <div className="border border-gray-700 rounded-2xl p-6 text-center bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <h3 className="font-semibold text-gray-100 mb-2 font-roboto">AI-Powered Replies</h3>
                    <p className="text-gray-300 text-sm font-poppins">
                        ChatGPT LLM understands your questions and provides instant, intelligent responses.
                    </p>
                </div>

                <div className="border border-gray-700 rounded-2xl p-6 text-center bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <h3 className="font-semibold text-gray-100 mb-2 font-roboto">Speech + Avatar + Captions</h3>
                    <p className="text-gray-300 text-sm font-poppins">
                        Your AI Tutor speaks the reply with captions. You can turn captions ON/OFF anytime.
                    </p>
                </div>
            </div>

            <div className="text-center mb-10 max-w-5xl w-full">
                <video src={demoVideo} controls className="rounded-2xl shadow-lg border border-gray-700 mx-auto" />
            </div>

            <button className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-xl font-semibold font-poppins shadow transition transform hover:scale-105">
                Start Your Journey
            </button>
        </div>
    );

}
