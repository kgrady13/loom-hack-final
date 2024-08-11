import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
// import Footer from "../../components/Footer"; // turn on later
import Topper from "../../components/Topper";
import { supabase } from "../../utils/supabaseClient";
import { setup, isSupported } from "@loomhq/loom-sdk";
import { useEffect, useState, useRef } from "react";
import {
    RefreshIcon,
    ChevronDownIcon,
    InformationCircleIcon,
} from "@heroicons/react/solid";

export default function Submit({ quizData }) {
    const router = useRouter();
    const [loomSupported, setLoomSupported] = useState(false);
    const [recording, setRecording] = useState(false);
    const [preview, setPreview] = useState(false);
    const [name, setName] = useState();
    const [showOptions, setShowOptions] = useState(false);
    const buttonRef = useRef(null);
    const loomApiKey = process.env.NEXT_PUBLIC_LOOM_API_KEY;

    const finalValues = quizData.values;
    const finalFinalValues = finalValues.map((v) => v.name);

    const [value, setValue] = useState(
        finalFinalValues[Math.floor(Math.random() * finalValues.length)]
    );

    const handleInputData = (input) => (e) => {
        const { value } = e.target;
        setName(value);
    };
    function RandomValue() {
        const [refresh, setRefresh] = useState("rotate-180");

        const rotate = showOptions ? "rotate-180" : "rotate-0";

        function showAllValues() {
            setShowOptions(!showOptions);
        }
        function newValue() {
            let randomValue =
                finalFinalValues[
                    Math.floor(Math.random() * finalValues.length)
                ];
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
                <div className="relative flex items-center justify-center my-3 mt-5">
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
                        {finalValues.map((option) => (
                            <button
                                key={option.id}
                                className="text-gray-500 hover:text-gray-700 p-2 font-bold cursor-pointer text-lg select-none transition hover:font-bold hover:bg-[#ebf9ee]  rounded-lg font-quicksand py-1"
                                onClick={() => {
                                    setValue(option.name);
                                    setShowOptions(false);
                                }}
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
                                These are all options your organizer made
                                available
                            </p>
                        </div>
                    </div>
                ) : null}
            </>
        );
    }

    function goTeamPage() {
        router.push(`${quizData.team_page}`);
    }

    useEffect(() => {
        async function setupLoom() {
            const { supported, error } = await isSupported();

            if (!supported) {
                console.warn(`Error setting up Loom: ${error}`);
                return;
            }
            setLoomSupported(true);

            const { configureButton } = await setup({
                apiKey: loomApiKey,
                element: buttonRef.current,
                config: {
                    insertButtonText: "Submit to Team Page",
                },
            });

            const sdkButton = configureButton({
                element: buttonRef.current,
            });

            if (!sdkButton) {
                return;
            }

            sdkButton.on("start", async () => {
                setRecording(true);
            });
            sdkButton.on("cancel", async () => {
                setRecording(false);
            });

            sdkButton.on("insert-click", async (video) => {
                try {
                    const updates = {
                        active: true,
                        team_id: quizData.id,
                        name: name,
                        loomUrl: video.sharedUrl,
                        html: `<div class="lo-emb-vid" style="position: relative; padding-bottom: 75%; height: 0;"><iframe src="https://www.loom.com/embed/${video.id}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>`,
                        value: value,
                        team_name: quizData.team_name,
                        team_logo: quizData.team_logo,
                        team_organizer: quizData.team_organizer,
                        created_at: new Date(),
                    };

                    let { error } = await supabase
                        .from("Submissions")
                        .insert(updates);

                    if (error) {
                        throw error;
                    }
                    goTeamPage();
                } catch (error) {
                    alert(error.message);
                } finally {
                    // setLoading(false);
                }
            });
        }

        setupLoom();
    }, [value, preview, name]);

    function togglePreview() {
        setPreview(!preview);
    }
    return (
        <>
            <Head>
                <title>Submit for {quizData.team_name}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Topper />

            <div className="flex flex-col align-middle justify-center content-center max-w-screen-md pt-12 pb-5 px-4 m-auto">
                {!recording && !preview ? (
                    <div className="m-auto text-center mx-10">
                        <div className="my-6">
                            <Image
                                src={quizData.team_logo}
                                alt="Picture of the author"
                                width={250}
                                height={100}
                                className="object-contain"
                            />
                        </div>
                        <h1 className="leading-relaxed text-2xl font-quicksand text-[#1B4332] font-bold">
                            <span className="border-dashed border-4 rounded-md border-gray-100 my-1 px-2 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-red-300">
                                {quizData.team_organizer}
                            </span>{" "}
                            has invited to you to choose the value you want to
                            live more fully in 2022 and share your intentions
                            with{" "}
                            <span className="border-dashed border-4 rounded-md border-gray-100 my-1 px-2 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-red-300">
                                {quizData.team_name}
                            </span>
                        </h1>
                        <p className="mt-5 font-quicksand font-bold text-body">
                            Let's start with your name:
                        </p>
                        <input
                            name="name"
                            id="name"
                            type="text"
                            value={name}
                            placeholder="Your Name"
                            onChange={handleInputData("name")}
                            className="text-center tracking-wider font-quicksand font-bold text-[#15532d] text-2xl shadow-sm border-4 border-green-700/25 border-dashed block w-[400px] mx-auto sm:text-sm  rounded-md placeholder-gray-400/75 bg-[#EFEFEF] pl-4 py-4 mb-5 mt-2"
                        />
                        {name ? (
                            <>
                                <p className="text-lg pt-3 my-2 text-gray-500 m-auto max-w-[500px] font-quicksand font-bold">
                                    Surprise! A random value was selected,{" "}
                                    <span className="text-body">{name}</span>.
                                    Want a different value? Roll again with the
                                    button or click the drop down below to
                                    select from a list of values.
                                </p>
                                <RandomValue values={finalValues} />
                            </>
                        ) : null}
                    </div>
                ) : (
                    <div className="m-auto text-center mx-10">
                        <div className="my-6">
                            <Image
                                src={quizData.team_logo}
                                alt="Picture of the author"
                                width={250}
                                height={100}
                                className="object-contain"
                            />
                        </div>
                        <p className="text-lg pt-3 my-2 text-gray-500 m-auto max-w-[500px] font-quicksand font-bold">
                            The value <span className="text-body">{name} </span>
                            wants to focus on for 2022 is...
                        </p>
                        <h1 className="leading-relaxed bg-white text-7xl animate-pulse font-quicksand text-[#1B4332] font-bold border-dashed border-4 rounded-md border-gray-100 my-1 px-2 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-red-300">
                            {value}
                        </h1>
                        <div className=" font-quicksand mt-16 bg-gray-100 p-6 rounded-2xl border-dashed border-4 border-body/25">
                            <p className="text-xl text-body font-bold pb-4">
                                Please share:
                            </p>
                            <ul className="space-y-4">
                                <li>
                                    What{" "}
                                    <span className="leading-relaxed text-xl font-quicksand text-[#1B4332] font-bold border-dashed border-4 rounded-md border-green-500/25 my-1 px-2 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-red-300">
                                        {value}
                                    </span>{" "}
                                    means to you
                                </li>
                                <li>
                                    What living{" "}
                                    <span className="leading-relaxed text-xl font-quicksand text-[#1B4332] font-bold border-dashed border-4 rounded-md border-green-500/25 my-1 px-2 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-red-300">
                                        {value}
                                    </span>{" "}
                                    more fully in 2022 will look like
                                </li>
                                <li>
                                    How more{" "}
                                    <span className="leading-relaxed text-xl font-quicksand text-[#1B4332] font-bold border-dashed border-4 rounded-md border-green-500/25 my-1 px-2 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-red-300">
                                        {value}
                                    </span>{" "}
                                    will make a difference in your life
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
            {name && !showOptions && (
                <>
                    {!loomSupported ? (
                        <h1 className="text-center bg-red-100 text-red-500 py-4 px-8 rounded-xl max-w-max mx-auto">
                            Loom Not Supported
                        </h1>
                    ) : (
                        <div className="flex justify-center fixed bottom-5 w-full">
                            {!recording && !preview ? (
                                <>
                                    <div className="flex flex-col">
                                        <button
                                            className="bg-body text-white font-quicksand font-bold rounded-lg max-w-max px-3 py-1 mx-auto mb-2 shadow-sm"
                                            onClick={togglePreview}
                                        >
                                            Preview Before Recording
                                        </button>
                                        <button
                                            ref={buttonRef}
                                            className="font-bold font-quicksand text-xl sm:text-3xl bg-[#EAEAE6] rounded-3xl px-6 py-6 text-body"
                                        >
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 bg-[#FF4545] rounded-full mr-4" />
                                                <span>Record a Response</span>
                                            </div>
                                            <span className="text-sm">
                                                powered by{" "}
                                                <span className="text-[#625df6] font-bold">
                                                    loom
                                                </span>
                                            </span>
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex flex-col">
                                        {preview ? (
                                            <>
                                                <button
                                                    className="bg-red-200 text-red-400 font-quicksand font-bold rounded-lg max-w-max px-3 py-1 mx-auto mb-2 shadow-sm"
                                                    onClick={togglePreview}
                                                >
                                                    Cancel Preview
                                                </button>
                                                <button className="font-bold font-quicksand text-xl sm:text-3xl bg-[#EAEAE6] rounded-3xl px-6 py-6 text-body animate-pulse">
                                                    <div className="flex items-center">
                                                        <div className="h-10 w-10 bg-[#FF4545] rounded-full mr-4 animate-pulse" />
                                                        <span>
                                                            Fake Recording...
                                                        </span>
                                                    </div>
                                                    <span className="text-sm">
                                                        powered by{" "}
                                                        <span className="text-[#625df6] font-bold">
                                                            loom
                                                        </span>
                                                    </span>
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    ref={buttonRef}
                                                    className="font-bold font-quicksand text-xl sm:text-3xl bg-[#EAEAE6] rounded-3xl px-6 py-6 text-body animate-pulse"
                                                >
                                                    <div className="flex items-center">
                                                        <div className="h-10 w-10 bg-[#FF4545] rounded-full mr-4 animate-pulse" />
                                                        <span>
                                                            Recording...
                                                        </span>
                                                    </div>
                                                    <span className="text-sm">
                                                        powered by{" "}
                                                        <span className="text-[#625df6] font-bold">
                                                            loom
                                                        </span>
                                                    </span>
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </>
            )}
        </>
    );
}

export async function getServerSideProps(context) {
    const id = context.query.team.split("-").pop();

    const { data, error, status } = await supabase
        .from("Teams")
        .select(
            `id, team_name, team_organizer, team_logo, url, values, active, team_page`
        )
        .eq("id", id)
        .single();

    if (error && status !== 406) {
        throw error;
    }

    const quizData = data;

    return {
        props: {
            quizData,
        },
    };
}
