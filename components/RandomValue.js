import {
    RefreshIcon,
    ChevronDownIcon,
    InformationCircleIcon,
} from "@heroicons/react/solid";
import { useState } from "react";

function RandomValue({ values }) {
    const finalValues = values.map((v) => v.name);

    const [value, setValue] = useState(
        finalValues[Math.floor(Math.random() * values.length)]
    );

    const [showOptions, setShowOptions] = useState(false);
    const [refresh, setRefresh] = useState("rotate-180");

    
    const rotate = showOptions ? "rotate-180" : "rotate-0";
    
    function showAllValues() {
        setShowOptions(!showOptions);
    }
    function newValue() {
        let randomValue =
            finalValues[Math.floor(Math.random() * values.length)];
        setValue(randomValue);
        if (showOptions) {
            setShowOptions(false);
        } else {
            setShowOptions(true);
        }
        setShowOptions(false);
    }
    return (
        <>
            <div className="relative flex items-center justify-center mt-5">
                <div className=" py-6 px-24 bg-[#EBF9ED] rounded-3xl">
                    <h1
                        suppressHydrationWarning
                        className="text-3xl font-quicksand font-bold text-body"
                    >
                        {value}
                    </h1>
                </div>
                <button
                    type="button"
                    className="inline-flex items-center p-3 border-white border-4 rounded-full shadow-md text-[#727373] bg-[#E5E7E7] -ml-8"
                    onClick={newValue}
                >
                    <RefreshIcon
                        className={`transition-all h-5 w-5 ${refresh} hover:rotate-12`}
                        aria-hidden="true"
                    />
                </button>
            </div>
            {/* Click random twice then give them the option to select any value (dropdown) */}
            <div className="flex items-center justify-center text-gray-500 pb-3">
                <button
                    onClick={showAllValues}
                    className="flex items-center justify-center cursor-pointer hover:text-gray-700"
                >
                    <p className="">Choose Your Value</p>
                    <ChevronDownIcon
                        className={`transition-all h-5 w-5 ${rotate}`}
                        aria-hidden="true"
                    />
                </button>
            </div>
            {showOptions ? (
                <div className="bg-white shadow-md rounded-xl p-6">
                    {values.map((option) => (
                        <button
                            key={option.id}
                            className="text-gray-500 hover:text-gray-700 p-2 font-bold cursor-pointer text-lg select-none transition hover:font-bold hover:bg-[#ebf9ee]  rounded-lg font-quicksand py-1"
                            onClick={() => {
                                setValue(option.name)
                                setShowOptions(false)}}
                        >
                            {option.name}
                        </button>
                    ))}
                    <div className="flex mt-6 justify-center items-center text-gray-400">
                        <InformationCircleIcon
                            className="-mb-1 hidden sm:block h-5 w-5 pr-1"
                            aria-hidden="true"
                        />{" "}
                        <p className="-mb-1">
                            These are all options your organizer made available
                        </p>
                    </div>
                </div>
            ) : null}
        </>
    );
}

export default RandomValue;
