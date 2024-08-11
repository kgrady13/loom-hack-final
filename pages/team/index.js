import Head from "next/head";
import Topper from "../../components/Topper";
import { ExclamationCircleIcon } from "@heroicons/react/solid";

export default function TeamError() {
    return (
        <>
            <Head>
                <title>Loom Hackothon - Karson Grady</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Topper />
            <div className="flex flex-col h-screen justify-center text-center text-gray-500">
                <ExclamationCircleIcon className="h-32 -mb-10 w-32 mx-auto" />
                <h1 className="font-bold font-quicksand text-3xl ">
                    <span className="text-9xl leading-relaxed text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-red-300">
                        Oops!
                    </span>{" "}
                    <br />
                    Looks like you have the wrong link
                </h1>
                <p className="pt-2 text-lg font-bold font-quicksand">
                    Try your link again or ask your Team Organizer
                </p>
            </div>
        </>
    );
}
