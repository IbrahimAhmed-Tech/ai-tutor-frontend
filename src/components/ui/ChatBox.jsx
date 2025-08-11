import { useEffect, useRef } from "react";

export default function ChatBox({ messages }) {
  const messagesEndRef = useRef(null);

 useEffect(() => {
  const timer = setTimeout(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, 50); // small debounce
  return () => clearTimeout(timer);
}, [messages]);
  return (
    <div className="h-full max-h-screen  flex flex-col bg-gradient-to-br from-gray-900 to-gray-950  shadow-xl">
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700 p-3 roundedl">
        <h1 className="text-lg font-semibold text-gray-200 font-poppins">
          Live Chat
        </h1>
        <p className="text-xs text-gray-400 font-poppins">
          Conversation History
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
  className={`max-w-[70%] break-words whitespace-pre-wrap px-3 py-2 rounded-lg text-sm font-poppins shadow-md ${
    message.role === 'user'
      ? 'bg-gradient-to-br from-gray-700 to-gray-800 text-gray-200 rounded-br-none border border-gray-600'
      : 'bg-gradient-to-br from-gray-800 to-gray-900 text-gray-200 border border-gray-700 rounded-bl-none'
  }`}

            >
              <div className="flex items-start space-x-2">
                {message.role === "assistant" && (
                  <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border border-gray-500">
                    <span className="text-xs font-medium text-gray-300 font-poppins">
                      AI
                    </span>
                  </div>
                )}
                <div className="flex-1">
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.role === "user"
                        ? "text-gray-400"
                        : "text-gray-500"
                    }`}
                  >
                    {message.timestamp}
                  </p>
                </div>
                {message.role === "user" && (
                  <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border border-gray-500">
                    <span className="text-xs font-medium text-white font-poppins">
                      U
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
