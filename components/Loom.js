import { useRef, useState, useEffect } from "react";
import { isSupported, setup } from "@loomhq/loom-sdk";

function Loom() {
    const buttonRef = useRef(null);
    const [loom, setLoom] = useState(null);
    const [loomUrl, setLoomUrl] = useState(null);
    const [name, setName] = useState(null);

    useEffect(() => {
        const startSdk = async () => {
            if (loom === null) {
                const instance = await setup({
                    apiKey: "65c2782f-de7a-4907-9c8d-246b9c8abd41",

                    insertButtonText: "Submit My Recording!",
                });
                setLoom(instance);
            }
        };

        if (buttonRef?.current && loom !== null) {
            loom.configureButton({
                element: buttonRef.current,
                hooks: {
                    onInsertClicked: (shareLink) => {
                        // console.log("clicked insert");
                        console.log(shareLink.sharedUrl);
                        setLoomUrl(shareLink.sharedUrl);
                    },
                    // onStart: () => console.log("start"),
                    // onCancel: () => console.log("cancelled"),
                    // onComplete: () => console.log("complete"),
                },
            });
        }
        startSdk();
    }, [loom]);

    return (
        // <div className="flex justify-center pb-5">
        <div className="flex justify-center fixed bottom-5 w-full">
            {!isSupported ? (
                <h2>Loom Not Supported</h2>
            ) : (
                <button
                    ref={buttonRef}
                    className="font-bold font-quicksand text-xl sm:text-3xl bg-[#EAEAE6] rounded-3xl px-6 py-6 text-body"
                >
                    <div className="flex items-center">
                        <div className="h-10 w-10 bg-[#FF4545] rounded-full mr-4"></div>
                        <span>Record a Response</span>
                    </div>
                </button>
            )}
        </div>
    );
}

export default Loom;
