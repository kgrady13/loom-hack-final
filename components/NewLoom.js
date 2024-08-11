import { setup, isSupported } from "@loomhq/loom-sdk";
import { oembed } from "@loomhq/loom-embed";
import { useEffect, useState, useRef } from "react";
import { supabase } from "../utils/supabaseClient";

function NewLoom() {
    const [videoHTML, setVideoHTML] = useState("");
    const [loomSupported, setLoomSupported] = useState(false);
    const [recording, setRecording] = useState(false);
    const [loomUrl, setLoomUrl] = useState("");
    const buttonRef = useRef(null);

    useEffect(() => {
        async function setupLoom() {
            const { supported, error } = await isSupported();

            if (!supported) {
                console.warn(`Error setting up Loom: ${error}`);
                return;
            }
            setLoomSupported(true);

            // const button = document.getElementById(BUTTON_ID);

            const { configureButton } = await setup({
                apiKey: "65c2782f-de7a-4907-9c8d-246b9c8abd41",
                element: buttonRef.current,
            });

            const sdkButton = configureButton({ element: buttonRef.current });

            if (!sdkButton) {
                return;
            }

            sdkButton.on("insert-click", async (video) => {
                setLoomUrl(video.sharedUrl);
                try {
                    const updates = {
                        active: true,
                        id: `${randomNumber}`,
                        team_name: `${formData.teamName}`,
                        team_organizer: `${formData.organizerName}`,
                        team_logo: `${formData.teamLogo}`,
                        url:
                            "https://loom-hack.vercel.app/" +
                            "submit/" +
                            `${slugTeamName}` +
                            "-" +
                            `${randomNumber}`,
                        values: isCheck,
                        created_at: new Date(),
                    };

                    let { error } = await supabase
                        .from("Teams")
                        .insert(updates, {
                            // returning: "minimal", // Don't return the value after inserting
                        });

                    if (error) {
                        throw error;
                    }
                    setFormData({
                        ...formData,
                        teamUrl: updates.url,
                    });
                    goNextPage();
                } catch (error) {
                    alert(error.message);
                } finally {
                    // setLoading(false);
                }
            });
        }

        setupLoom();
    }, []);

    return (
        <>
            {/* <button id={BUTTON_ID}>Record</button> */}
            <div dangerouslySetInnerHTML={{ __html: videoHTML }}></div>
            <div className="flex justify-center fixed bottom-5 w-full">
                {!loomSupported && !recording ? (
                    <h2>Loom Not Supported</h2>
                ) : (
                    <button
                        ref={buttonRef}
                        // id={BUTTON_ID}
                        className="font-bold font-quicksand text-xl sm:text-3xl bg-[#EAEAE6] rounded-3xl px-6 py-6 text-body"
                    >
                        <div className="flex items-center">
                            <div className="h-10 w-10 bg-[#FF4545] rounded-full mr-4"></div>
                            <span>Record a Response</span>
                            <span>Powered by Loom</span>
                        </div>
                    </button>
                )}
            </div>
        </>
    );
}

export default NewLoom;
