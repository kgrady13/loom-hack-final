import Head from "next/head";
import Footer from "../../components/Footer"; // turn on later
import Topper from "../../components/Topper";
import Image from "next/image";
import { useState } from "react";
import { supabase } from "../../utils/supabaseClient";

export default function Team({ submissionData }) {
    const startingValues = submissionData;

    const [sort, setSort] = useState(startingValues);

    function sortReset() {
        setSort(startingValues);
    }

    function sortByAlphabetical() {
        const sortByValue = [...startingValues];
        sortByValue.sort((a, b) => a.value.localeCompare(b.value));
        setSort(sortByValue);
    }

    function sortByDate() {
        const sortByDate = [...startingValues];
        sortByDate.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
        });
        setSort(sortByDate);
    }

    return (
        <>
            <Head>
                <title>
                    Submissions for {submissionData[0].team_name} -{" "}
                    {submissionData.length}
                </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Topper />

            <div className="pt-12 pb-5 px-2 sm:px-4 max-w-screen-xl mx-auto">
                <Image
                    src={submissionData[0].team_logo}
                    alt={submissionData[0].team_name}
                    width={250}
                    height={100}
                    className="object-contain object-left"
                />
                <div className="my-6 border-b">
                    <h1 className="text-6xl font-quicksand font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-red-300 max-w-min whitespace-nowrap">
                        #{submissionData[0].team_name}
                    </h1>
                    <p className="text-md sm:text-md my-2 text-gray-400">
                        Organized by {submissionData[0].team_organizer}
                    </p>
                    <div className="flex my-6">
                        <button
                            className="relative rounded-2xl mx-2 px-6 py-2 bg-[#EAEAE6] text-sm md:text-base text-gray-500"
                            onClick={sortReset}
                        >
                            All
                            <span className="-m-1 flex flex-col justify-center align-middle absolute -top-2 -right-1 text-[11px] bg-white rounded-full shadow-sm border border-gray-300 text-gray-400 h-6 w-6">
                                {submissionData.length}
                            </span>
                        </button>
                        <button
                            className="relative rounded-2xl mx-2 px-6 py-2 bg-[#EAEAE6] text-sm md:text-base text-gray-500"
                            onClick={sortByAlphabetical}
                        >
                            Alphabetical
                        </button>
                        <button
                            className="relative rounded-2xl mx-2 px-6 py-2 bg-[#EAEAE6] text-sm md:text-base text-gray-500"
                            onClick={sortByDate}
                        >
                            Submission Date
                        </button>
                    </div>
                </div>
                {/* overall card container yes */}
                <div className="flex relative">
                    <div className="-ml-4 flex items-center overflow-x-auto py-5 pb-20">
                        {sort.map((submission) => (
                            // card itself
                            <div key={submission.id} className="mx-5 my-2">
                                <div
                                    key={submission.id}
                                    className="flex flex-col rounded-3xl shadow-lg w-[300px] md:w-[500px] overflow-hidden"
                                >
                                    {/* card */}

                                    <div className="flex-1 bg-green-50">
                                        {/* video */}
                                        <div
                                            className="aspect-video"
                                            dangerouslySetInnerHTML={{
                                                __html: `${submission.html}`,
                                            }}
                                        ></div>

                                        {/* details */}
                                        <div className="p-4 flex flex-col">
                                            <div className="py-2">
                                                <span className="bg-white text-green-800 inline-flex items-center px-4 py-1 rounded-xl text-md font-medium border border-gray-300">
                                                    {submission.value}
                                                </span>
                                            </div>
                                            <span className="text-4xl font-quicksand font-bold text-body">
                                                {submission.name}
                                            </span>
                                            <time
                                                className="text-sm text-gray-500 pt-1"
                                                dateTime={submission.created_at}
                                            >
                                                {submission.created_at}
                                            </time>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Divider to ensure last video not covered in gradient */}
                        <div className="mr-36"></div>
                    </div>
                    <div className="hidden md:block absolute right-0 w-56 h-full bg-gradient-to-r from-transparent to-main"></div>
                </div>
                <div className="sm:hidden fixed bottom-5 animate-bounce">
                    <div className="flex">
                        <p className="bg-gray-100 px-6 py-1 rounded-xl">
                            scroll >>>{" "}
                        </p>
                    </div>
                </div>
                <div className="border-t py-10">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
                        <svg
                            className="-ml-0.5 mr-1.5 h-2 w-2 text-green-400 animate-pulse"
                            fill="currentColor"
                            viewBox="0 0 8 8"
                        >
                            <circle cx={4} cy={4} r={3} />
                        </svg>
                        Thought of the day:
                    </span>
                    <h3 className="max-w-screen-md pl-1 pt-2 font-bold font-quicksand text-gray-500">
                    Whatever you are experiencing right now is the result of a decision you made in the past.  By declaring your intention for 2022 now, and repeating it often, you become the Architect of your life.  When we set a collective intention, anything is possible … together! 
                    </h3>
                </div>
            </div>
            <Footer />
        </>
    );
}

export async function getServerSideProps(context) {
    const id = context.query.team.split("-").pop();

    const { data, error, status } = await supabase
        .from("Submissions")
        .select(
            `id, team_id, name, loomUrl, value, team_name, team_organizer, active, html, created_at, team_logo`
        )
        .eq("team_id", id);

    if (error && status !== 406) {
        throw error;
    }

    // human readable date from created_at
    data.forEach((submission) => {
        const date = new Date(submission.created_at);
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour12: false,
        };
        submission.created_at = date.toLocaleString("en-US", options);
    });

    const submissionData = data;

    return {
        props: {
            submissionData,
        },
    };
}
