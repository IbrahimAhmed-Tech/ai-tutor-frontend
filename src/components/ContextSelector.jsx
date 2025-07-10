import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Listbox } from "@headlessui/react";
import React from "react";

const predefinedContexts = [
  "Explain like I'm 5 years old.",
  "Use simple English with examples.",
  "Act like a friendly tutor.",
  "Answer like I'm a beginner.",
  "Respond in a professional and concise way.",
];

const ContextSelector = ({ selectedContext, setSelectedContext, defaultProfileContext }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-xl p-4 shadow-sm mb-6">
      <h4 className="text-lg font-semibold text-gray-800 mb-2 font-roboto">
        Customize Assistant Behavior
      </h4>

      <label className="block text-sm font-medium text-gray-700 mb-1 font-poppins">
        Select a predefined behavior
      </label>
      <Listbox value={selectedContext} onChange={setSelectedContext}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm">
          { selectedContext ||defaultProfileContext}
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <FontAwesomeIcon icon={faChevronDown} className="text-gray-400 text-sm" />
            </span>
          </Listbox.Button>
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-50">
            <Listbox.Option
              key="default"
              value=""
              className={({ active }) =>
                `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-gray-100 text-gray-900" : "text-gray-700"
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
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-gray-200 text-gray-900" : "text-gray-700"
                  }`
                }
              >
                {ctx}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>

      <label className="block text-sm font-medium text-gray-700 my-1 font-poppins">
        Or type your own
      </label>
      <input
        type="text"
        className="w-full border border-gray-300 rounded  p-2 focus:outline-none focus:ring-1 focus:ring-gray-500 font-oppins font-normal text-sm placeholder:font-poppins"
        value={selectedContext || defaultProfileContext}
        onChange={(e) => setSelectedContext(e.target.value)}
      />
    </div>
  );
};

export default ContextSelector;
