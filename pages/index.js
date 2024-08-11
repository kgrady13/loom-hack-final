import Head from "next/head";
import Footer from "../components/Footer"; // turn on later
import Topper from "../components/Topper";
import { supabase } from "../utils/supabaseClient";
import { useState } from "react";
import Question from "../components/Question";
import Button from "../components/Button";
import {
    ArrowCircleRightIcon,
    ArrowCircleLeftIcon,
} from "@heroicons/react/solid";

import Image from "next/image";
import acmeLogo from "../public/acme-logo.svg";
import sampleForm from "../public/example-form.svg";
import sampleRec from "../public/sample-rec.svg";
import { valuesList } from "../valuesList.js";
import Checkbox from "../components/Checkbox";
import SharePreview from "../components/SharePreview";
import SharePage from "../components/SharePage";
import Uploading from "../components/Uploading";

const slugify = require("slugify");

export default function Home() {
    const [page, setPage] = useState(1);
    const [formData, setFormData] = useState({
        teamName: "Team Acme",
        organizerName: "Bethany Anderson",
        teamLogo: { acmeLogo },
        formValid: false,
    });
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [realLogo, setRealLogo] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [uploadingLogo, setUploadingLogo] = useState(false);

    async function handleLogoUpload(event) {
        try {
            setUploadingLogo(true);

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error("You must select an image to upload.");
            }

            const file = event.target.files[0];
            const fileExt = file.name.split(".").pop();
            const randomNumber = Math.floor(1000 + Math.random() * 9000);
            const fileName = slugify(
                `${formData.teamName}-${randomNumber}.${fileExt}`
            );
            const filePath = `${fileName}`;

            const reader = new FileReader();
            reader.readAsDataURL(file);

            let { error: uploadError } = await supabase.storage
                .from("loom-hack")
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }
            setFormData({
                ...formData,
                teamLogo:
                    "https://kzjstgyjeakeoebbwnhc.supabase.in/storage/v1/object/public/loom-hack/" +
                    fileName,
            });

            setRealLogo(true);
            // onUpload(filePath);
        } catch (error) {
            alert(error.message);
        } finally {
            setUploadingLogo(false);
        }
    }

    function goNextPage() {
        if (page === 3) return;

        if (isCheck.length <= 4) {
            alert("Please select at least five values");
            return;
        }
        if (page === 2) {
            if (!realLogo) {
                alert("Please upload a logo");
                return;
            }

            if (!teamName.value && !teamOrganizer.value) {
                alert("Team Organizer & Team Name cannot be empty");
                return;
            }
            if (!teamOrganizer.value) {
                alert("Team Organizer cannot be empty");
                return;
            }
            if (!teamName.value) {
                alert("Team Name cannot be empty");
                return;
            }
        }
        setPage((page) => page + 1);
    }
    function clearInputField() {
        setFormData({
            ...formData,
            teamLogo: { acmeLogo },
        });
        setRealLogo(false);
    }
    function goPreviousPage() {
        if (page === 1) return;
        setPage((page) => page - 1);
    }

    const handleInputData = (input) => (e) => {
        const { value } = e.target;

        setFormData((prevState) => ({
            ...prevState,
            [input]: value,
        }));
    };

    const valuesOptions = valuesList.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    });

    function handleSelectAll() {
        setIsCheckAll(!isCheckAll);
        setIsCheck([
            ...isCheck,
            ...valuesOptions.map(({ id, name }) => ({
                id,
                name,
            })),
        ]);
        if (isCheckAll) {
            setIsCheck([]);
        }
    }
    const handleClick = (e) => {
        const { id, name, checked } = e.target;
        setIsCheck([...isCheck, { id, name }]);

        if (!checked) {
            setIsCheck(
                isCheck.filter(function (item) {
                    return item.id !== id;
                })
            );
        }
    };

    const SelectAll = () => {
        return (
            <label className="-ml-1 m-1 rounded-lg cursor-pointer flex items-center bg-[#EFEFEF] w-max">
                <Checkbox
                    type="checkbox"
                    name="selectAll"
                    id="selectAll"
                    handleClick={handleSelectAll}
                    isChecked={isCheckAll}
                    className="peer rounded text-[#94A69B] absolute ml-2 cursor-pointer"
                />
                <span className="text-[#94A69B] font-bold text-lg pl-8 select-none transition pr-3 rounded-lg font-quicksand py-2">
                    Make all values available
                </span>
            </label>
        );
    };

    async function submitTeam() {
        try {
            // setLoading(true);
            const slugTeamName = slugify(formData.teamName).toLowerCase();
            const randomNumber = Math.floor(1000 + Math.random() * 9000);
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
                team_page:
                    "https://loom-hack.vercel.app/" +
                    "team/" +
                    `${slugTeamName}` +
                    "-" +
                    `${randomNumber}`,
                team_id: `${randomNumber}`,
                values: isCheck,
                created_at: new Date(),
            };

            let { error } = await supabase.from("Teams").insert(updates, {
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
    }
    return (
        <>
            <Head>
                <title>Loom Hackothon - Karson Grady</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Topper />
            <div className="flex flex-col max-w-screen-xl pt-12 pb-5 px-4 m-auto">
                {page === 1 && (
                    <>
                        <div className="py-4">
                            <progress
                                max="3"
                                value={page}
                                className="border-2 w-96 rounded-full shadow-lg overflow-hidden"
                            />
                        </div>
                        <div className="">
                            <Question
                                div={true}
                                main="#1. Values Selection"
                                subline="From the list below, please select FIVE or more the values you would like to be presented as options to your co-workers."
                            />
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 my-6 max-w-fit">
                                {valuesOptions.map((option) => (
                                    <label
                                        key={option.id}
                                        className="capitalize -ml-1 text-gray-700 cursor-pointer flex items-center m-1 rounded-xl"
                                    >
                                        <Checkbox
                                            key={option.id}
                                            type="checkbox"
                                            name={option.name}
                                            id={option.id}
                                            value={option.id} // was not there
                                            handleClick={handleClick}
                                            isChecked={isCheck.some(
                                                (element) => {
                                                    if (
                                                        element.id === option.id
                                                    ) {
                                                        return true;
                                                    }
                                                }
                                            )}
                                            className="peer rounded text-[#707070] absolute ml-2 cursor-pointer"
                                        />

                                        <span className="peer-checked:bg-[#E2EBE2] text-lg pl-8 select-none peer-checked:font-bold pr-3 rounded-lg font-quicksand">
                                            {option.name}
                                        </span>
                                    </label>
                                ))}
                            </div>
                            <SelectAll />
                            <Button
                                title="Next Step"
                                icon={<ArrowCircleRightIcon />}
                                onClick={goNextPage}
                            />
                        </div>
                    </>
                )}
                {page === 2 && (
                    <>
                        <div className="py-4">
                            <progress
                                max="3"
                                value={page}
                                className="border-2 w-96 rounded-full shadow-lg overflow-hidden"
                            />
                        </div>
                        <div className="flex items-stretch ">
                            <div className="max-w-lg">
                                <Question
                                    main="#2a. Organizer Name"
                                    subline="We use this to let people know who setup the link. Please enter your name."
                                />
                                <input
                                    name="teamOrganizer"
                                    id="teamOrganizer"
                                    type="text"
                                    // value={formData.organizerName}
                                    placeholder="Bethany Anderson"
                                    onChange={handleInputData("organizerName")}
                                    className="tracking-wider font-quicksand font-bold text-[#15532d] text-xl shadow-sm focus:ring-[#15532d] focus:border-[#15532d] block w-full sm:text-sm border-gray-300 rounded-md placeholder-gray-400/75 bg-[#EFEFEF] pl-4 py-4 mb-10"
                                />
                                <Question
                                    main="#2b. Your Team Name"
                                    subline="Select a name for your team. This will be the name of the link you will share with your co-workers."
                                />
                                <input
                                    name="teamName"
                                    id="teamName"
                                    type="text"
                                    // value={formData.teamName}
                                    placeholder="Team Acme"
                                    // onChange={handleInputData("teamName")}
                                    onChange={handleInputData("teamName")}
                                    className="tracking-wider font-quicksand font-bold text-[#15532d] text-xl shadow-sm focus:ring-[#15532d] focus:border-[#15532d] block w-full sm:text-sm border-gray-300 rounded-md placeholder-gray-400/75 bg-[#EFEFEF] pl-4 py-4 mb-10"
                                />

                                <Question
                                    main="#2c. Team Logo"
                                    subline="Add a logo for your team. This will be the image used on the link you will share with your co-workers."
                                />

                                <label
                                    htmlFor="cover-photo"
                                    className="hidden text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                >
                                    Organization Logo
                                </label>
                                <div className="my-1 sm:mt-0 sm:col-span-2 ">
                                    <div className="max-w-lg bg-[#EFEFEF] flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                        {realLogo ? (
                                            <div className="flex flex-col">
                                                <div className="max-w-[250px]">
                                                    <Image
                                                        src={formData.teamLogo}
                                                        alt="Picture of the author"
                                                        width={250}
                                                        height={100}
                                                        className="object-contain"
                                                    />
                                                </div>
                                                <label className="relative cursor-pointer bg-white rounded-md py-1 px-2 font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-body text-center max-w-fit mx-auto mt-4">
                                                    <span className="text-red-800 ">
                                                        Cancel
                                                    </span>
                                                    <button
                                                        onClick={
                                                            clearInputField
                                                        }
                                                    />
                                                </label>
                                            </div>
                                        ) : (
                                            <div className="space-y-1 text-center">
                                                <svg
                                                    className="mx-auto h-12 w-12 text-gray-400"
                                                    stroke="currentColor"
                                                    fill="none"
                                                    viewBox="0 0 48 48"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>

                                                <div className="text-sm text-gray-600">
                                                    <label
                                                        htmlFor="fileUpload"
                                                        className="relative cursor-pointer bg-white rounded-md py-1 px-2 font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-body"
                                                    >
                                                        <span className="text-green-800">
                                                            Upload a file
                                                        </span>
                                                        <input
                                                            id="fileUpload"
                                                            name="file-upload"
                                                            type="file"
                                                            className="sr-only"
                                                            onChange={
                                                                handleLogoUpload
                                                            }
                                                        />
                                                    </label>
                                                    {/* <p className="pl-2 pt-1">
                                                        or drag and drop
                                                    </p> */}
                                                </div>
                                                <p className="text-xs text-gray-500 pt-2">
                                                    PNG, JPG, GIF up to 1MB
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex space-x-5">
                                    <Button
                                        title="Back"
                                        icon={<ArrowCircleLeftIcon />}
                                        onClick={goPreviousPage}
                                        IconLeft={true}
                                        color="bg-[#EAEAE6]"
                                    />
                                    <Button
                                        title="Next"
                                        icon={<ArrowCircleRightIcon />}
                                        onClick={submitTeam}
                                    />
                                </div>
                            </div>
                            <div className="ml-10">
                                <div className="text-center mb-5">
                                    <p className=" text-2xl font-quicksand text-green-900 font-bold">
                                        Preview:
                                    </p>
                                    <p className="text-gray-400">
                                        (what your team will see)
                                    </p>
                                </div>
                                <div className="flex flex-col max-w-xl bg-white rounded-3xl mx-6 shadow-lg border-2 justify-center min-h-[500px]">
                                    <div className="m-auto text-center mx-10">
                                        <div className="max-w-[150px] m-auto py-4">
                                            {realLogo ? (
                                                <Image
                                                    src={formData.teamLogo}
                                                    alt="Picture of the author"
                                                    width={250}
                                                    height={100}
                                                    className="object-contain"
                                                />
                                            ) : (
                                                <Image
                                                    src={acmeLogo}
                                                    alt="Picture of the author"
                                                    width={250}
                                                    height={100}
                                                />
                                            )}
                                        </div>

                                        <h1 className="text-2xl font-quicksand text-[#1B4332] font-bold">
                                            <span className="border-dashed border-4 rounded-md border-gray-100 my-1 px-2 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-red-300 whitespace-nowrap">
                                                {formData.organizerName}
                                            </span>{" "}
                                            has invited to you to choose the
                                            value you want to live more fully in
                                            2022 and share your intentions with{" "}
                                            <span className="border-dashed border-4 rounded-md border-gray-100 my-1 px-2 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-red-300 whitespace-nowrap">
                                                {formData.teamName}
                                            </span>
                                        </h1>
                                        <p className="text-md pt-3 my-2 max-w-screen-sm text-gray-500">
                                            The value I want to focus on for
                                            2022 is...
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
                        </div>
                        {uploadingLogo ? (
                            <div
                                className="flex flex-col mb-10 items-center absolute bottom-0 mx-auto w-full text-center
                        "
                            >
                                <Uploading />
                            </div>
                        ) : null}
                    </>
                )}
                {/* <div className="flex items-stretch"> */}
                {page === 3 && (
                    <div className="">
                        <SharePage formData={formData} />
                        <div className="w-3/4 h-2 bg-gray-200 rounded-md my-10 mx-auto" />
                        <SharePreview formData={formData} />
                    </div>
                )}
            </div>
            {/* <Footer /> */}
        </>
    );
}
