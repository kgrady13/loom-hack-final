import { ClipboardIcon, LightningBoltIcon } from "@heroicons/react/outline";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";

function ShareInput({ formData }) {
    const notify = () =>
        toast("Copied link to clipboard", {
            duration: 6000,
            // Styling
            style: {
                background: "#e2ece2",
                "font-weight": "bold",
            },
            className: "",
            // Custom Icon
            icon: "⚡",
            // Change colors of success/error/loading icon
        });

    const notify2 = () =>
        toast.custom((t) => (
            <div
                className={`${
                    t.visible ? "animate-enter" : "animate-leave"
                }  bg-[#e2ece2] text-green-900 shadow-lg rounded-xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 h-14 items-center text-center justify-center px-6 py-4 my-6`}
            >
                <div className="flex items-center text-center">
                    <div className="rounded-full bg-white h-10 w-10 p-1 mr-2">
                        <LightningBoltIcon className="h-full w-full"/>
                    </div>
                    <p className="font-quicksand font-bold">
                        Copied link to clipboard
                    </p>
                </div>
            </div>
        ));
    return (
        <div className="min-w-[550px]">
            <div className="mt-1 flex rounded-md shadow-sm">
                <div className="relative flex items-stretch flex-grow focus-within:z-10">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                    <input
                        name="name"
                        id="name"
                        type="text"
                        value={formData.teamUrl}
                        readOnly={true}
                        className="select-all rounded-l-md focus:outline-none tracking-wider font-quicksand font-bold text-[#15532d] text-xl shadow-sm block w-full sm:text-sm border-gray-300 bg-[#EFEFEF] pl-4 py-4 border-transparent focus:border-gray-300 focus:ring-0"
                    />
                </div>
                <CopyToClipboard
                    // onCopy={onCopy}
                    text={formData.teamUrl}
                >
                    <button
                        type="button"
                        className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-[#EFEFEF] hover:bg-gray-100 focus:outline-none border-transparent focus:border-gray-300"
                        onClick={notify2}
                    >
                        <ClipboardIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                </CopyToClipboard>
            </div>
        </div>
    );
}

export default ShareInput;
