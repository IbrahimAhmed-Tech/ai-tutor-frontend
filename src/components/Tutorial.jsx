import { faMicrophone, faStop } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Tutorial = () => {
  return (
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
  )
}

export default Tutorial
