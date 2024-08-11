import "tailwindcss/tailwind.css";
import "../style.css";
import { Toaster } from "react-hot-toast";
import { ExclamationCircleIcon } from "@heroicons/react/solid";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <div className="hidden md:block">
                <Component {...pageProps} />
                <Toaster position="bottom-center" />
            </div>
            {/* <div className="hidden md:flex flex-col h-screen justify-center text-center text-gray-500">
                <ExclamationCircleIcon className="h-32 -mb-10 w-32 mx-auto" />
                <h1 className="font-bold font-quicksand text-3xl ">
                    <span className="text-9xl leading-relaxed text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-red-300">
                        Sorry!
                    </span>{" "}
                    <br />
                    Mobile is not supported yet
                </h1>
                <p className="pt-2 text-lg font-bold font-quicksand">
                    Tryi again on a larger device
                </p>
            </div> */}
        </>
    );
}

export default MyApp;
