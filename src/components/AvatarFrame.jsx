import avatarImage from "../assets/avatar2.jpg"

export default function AvatarFrame() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Main Avatar Frame */}
                <div className="relative flex flex-col items-center justify-center rounded-3xl p-8 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 shadow-xl shadow-slate-500/20">
                    {/* Decorative Ring */}
                    <div className="absolute inset-4 rounded-3xl border-2 border-white/10" />

                    {/* Avatar Container */}
                    <div className="relative mb-6">
                        <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white/20">
                            <img src={avatarImage} alt= "avatar" className="w-full h-full object-cover" />
                        </div>

                        {/* Status Indicator */}
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-4 border-white bg-gray-400" />
                    </div>

                    {/* Status Text */}
                    <div className="text-center mb-4">
                        <p className="text-white/80 text-sm font-medium">Ready to chat</p>
                    </div>
                </div>

                {/* Caption/Response Area */}
                <div className="mt-6 p-6 rounded-2xl bg-white shadow-lg border border-gray-200">
                    <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                        <p className="text-gray-800 text-sm leading-relaxed font-medium">
                            Hello! I'm your AI assistant. How can I help you today?
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
  