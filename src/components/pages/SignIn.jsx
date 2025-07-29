import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import showToast from "../../utils/showToast"
import logError from "../../utils/logError"


export default function SignIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [signingIn, setSigningIn] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setSigningIn(true);


        try {
            const response = await loginUser(email, password);
            const { token, user } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            showToast('success', 'Success!', 'Login successful.');
            navigate("/home");
        } catch (err) {
            logError(err);
        } finally {
            setSigningIn(false);
        }
    };

   
    return (
        <div className="min-h-screen bg-white flex">

            {/* Left side - Hero Image */}
            <div className="hidden lg:flex lg:w-[60%] bg-gray-900 relative overflow-hidden  h-screen justify-center items-center">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>

                {/* Large AI Brain Illustration */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <svg className="w-96 h-96" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={0.5}
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                    </svg>
                </div>

                <div className="relative z-10 flex flex-col justify-center items-center px-12 py-8 text-white h-full overflow-hidden">
                    <div className="max-w-lg text-center">
                        <div className="mt-8">
                            <div className="w-20 h-20 mx-auto mb-8 bg-white rounded-full flex items-center justify-center shadow-2xl">
                                <svg className="w-16 h-16 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                    />
                                </svg>
                            </div>
                            <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent font-roboto">
                                AI Tutor
                            </h1>
                            <p className="text-lg text-gray-300 mb-4 leading-relaxed font-poppins">
                                Transform your learning experience with personalized AI-powered education
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-6 text-left max-w-md mx-auto mb-2">
                            {[
                                { title: "Adaptive Learning", desc: "Personalized curriculum that adapts to your pace" },
                                { title: "24/7 AI Assistant", desc: "Get instant help whenever you need it" },
                                { title: "Progress Tracking", desc: "Monitor your learning journey in real-time" },
                            ].map((feature, index) => (
                                <div key={index} className="flex items-center space-x-4 bg-white/5 backdrop-blur-sm rounded-lg p-4">
                                    <div className="w-3 h-3 bg-white rounded-full flex-shrink-0"></div>
                                    <div>
                                        <h3 className="text-white font-semibold">{feature.title}</h3>
                                        <p className="text-gray-400 text-sm">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


                <div className="absolute top-20 left-20 w-4 h-4 bg-white/20 rounded-full animate-pulse"></div>
                <div className="absolute top-40 right-32 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
                <div className="absolute bottom-32 left-32 w-3 h-3 bg-white/25 rounded-full animate-bounce"></div>
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent"></div>
            </div>


            <div className="w-full lg:w-[40%] flex items-center justify-center  px-8">

                <div className="max-w-md w-full space-y-8">


                    <div className="lg:hidden text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-900 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">AI Tutor</h2>
                    </div>

                    <div >
                        <h2 className="text-3xl font-bold text-gray-900 text-center lg:text-left">Welcome back</h2>
                        <p className="mt-2 text-sm text-gray-600 text-center lg:text-left">
                            Sign in to continue your learning journey
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-transparent focus:z-10 sm:text-sm transition-all duration-200"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="appearance-none relative block w-full px-3 py-3 pr-12 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-transparent sm:text-sm transition-all duration-200"
                                        placeholder="Enter your password"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                                    >
                                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                    </button>
                                </div>



                            </div>
                        </div>



                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 transform hover:scale-[1.02]"
                            >
                                <FontAwesomeIcon icon={faRightToBracket} />
                                {signingIn ? "Signing In..." : "Sign In"}
                            </button>
                        </div>




                        <div className="text-center">
                            <span className="text-sm text-gray-600">
                                {"Don't have an account? "}
                                <Link to="/signup" className="font-medium text-gray-900 hover:text-gray-700 transition-colors duration-200">
                                    Sign up
                                </Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
