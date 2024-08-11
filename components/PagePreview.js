import Image from "next/image";
import { useEffect, useState } from "react";
import acmeLogo from "../public/acme-logo.svg";
import sampleForm from "../public/example-form.svg";
import sampleRec from "../public/sample-rec.svg";

function PagePreview({ preview }) {
    return (
        <div className="ml-10">
            <p className="text-center mb-5 text-2xl font-quicksand text-green-900 font-bold">
                Preview:
            </p>
            <div className="flex flex-col max-w-xl bg-white rounded-3xl mx-6 shadow-lg border-2 justify-center min-h-[500px]">
                <div className="m-auto text-center mx-10">
                    <Image
                        src={acmeLogo}
                        alt="Picture of the author"
                        width={250}
                        height={100}
                    />
                    <h1 className="text-2xl font-quicksand text-[#1B4332] font-bold">
                        <span className="border-dashed border-4 rounded-md border-gray-100 my-1 px-2 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-red-300">
                            {preview.teamName}
                        </span>{" "}
                        has invited you to share your thoughts for{" "}
                        <span className="border-dashed border-4 rounded-md border-gray-100 my-1 px-2 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-red-300">
                            {preview.organizerName}
                        </span>
                    </h1>
                    <p className="text-md pt-3 my-2 max-w-screen-sm text-gray-500">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt.
                    </p>
                    <Image
                        src={sampleForm}
                        alt="Picture of the author"
                        width={250}
                        height={100}
                    />
                </div>
                <div className="flex flex-col justify-center my-5">
                    <Image
                        src={sampleRec}
                        alt="Picture of the author"
                        width={100}
                        height={50}
                    />
                </div>
            </div>
        </div>
    );
}

export default PagePreview;
