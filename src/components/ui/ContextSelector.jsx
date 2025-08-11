import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Listbox } from "@headlessui/react";
import React, { useEffect, useState } from "react";

const predefinedContexts = [
  "Explain like I'm 5 years old.",
  "Use simple English with examples.",
  "Act like a friendly tutor.",
  "Answer like I'm a beginner.",
  "Respond in a professional and concise way.",
  "Custom context...",
];

const ContextSelector = ({ selectedContext, setSelectedContext, defaultProfileContext }) => {
  const [customContext, setCustomContext] = useState("");

    const isCustom = selectedContext === "Custom context...";

  const handleChange = (value) => {
    if (value === "Custom context...") {
      setSelectedContext(value);
    } else {
      setSelectedContext(value);
      setCustomContext("");
    }
  };

  
  return (
    <div className="bg-white rounded-xl border border-gray-300 rounded-xl p-4 shadow-sm mb-6">
      <h4 className="text-xl font-semibold text-gray-800 mb-2 font-robotoCondensed">
        Customize Assistant Behavior
      </h4>

      

      <Listbox value={selectedContext} onChange={handleChange}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm font-poppins">
          {selectedContext || defaultProfileContext}
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <FontAwesomeIcon icon={faChevronDown} className="text-gray-400 text-sm" />
            </span>
          </Listbox.Button>

          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-50">
            <Listbox.Option
              key="default"
              value=""
              className={({ active }) =>
                `relative cursor-default select-none py-2 pl-10 pr-4 font-poppins text-sm ${
                  active ? "bg-gray-100 text-gray-900 font-poppins" : "text-gray-700 font-poppins"
                }`
              }
            >
              {defaultProfileContext}
            </Listbox.Option>

            {predefinedContexts.map((ctx, idx) => (
              <Listbox.Option
                key={idx}
                value={ctx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 font-poppins ${
                    active ? "bg-gray-200 text-gray-900" : "text-gray-700"
                  }`
                }
              >
                {ctx}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>

      
      <div className="mt-6 min-h-[60px]">
        <div
          className={`transition-opacity duration-300 ${
            isCustom ? "opacity-100" : "opacity-0 pointer-events-none absolute"
          }`}
        >
          
          <input
            type="text"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-gray-500 font-poppins font-normal text-sm placeholder:font-poppins"
            value={customContext}
            onChange={(e) => setCustomContext(e.target.value)}
            placeholder="Type your custom context..."
          />
        </div>
      </div>
    </div>
  );
};

export default ContextSelector;
