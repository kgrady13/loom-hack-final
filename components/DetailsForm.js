import Question from "../components/Question";
import Button from "./Button";
import Input from "./Input";
import { ArrowCircleRightIcon } from "@heroicons/react/outline";
import { ArrowCircleLeftIcon } from "@heroicons/react/outline";

function DetailsForm({ NextOnClick, PrevOnClick, handleFormData }) {
    return (
        <>
            <div>
                <Question
                    main="#2a. Name Your Link"
                    subline="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et"
                />
                <Input
                    name="teamName"
                    id="teamName"
                    type="text"
                    placeholder="Team Acme"
                    onChange={handleFormData("teamName")}
                />

                <Question
                    main="#2b. Organizer Name"
                    subline="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et"
                />
                <Input
                    name="teamOrganizer"
                    id="teamOrganizer"
                    type="text"
                    placeholder="Bethany Anderson"
                    onChange={handleFormData("organizerName")}
                />

                <Question
                    main="#2c. Organizer Logo"
                    subline="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et"
                />
                {/* <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"> */}
                <label
                    htmlFor="cover-photo"
                    className="hidden text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                    Organization Logo
                </label>
                <div className="my-1 sm:mt-0 sm:col-span-2 bg-[#EFEFEF]">
                    <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
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
                            <div className="flex text-sm text-gray-600">
                                <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer bg-white rounded-md py-1 px-2 font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-body"
                                >
                                    <span className="text-green-800">
                                        Upload a file
                                    </span>
                                    <input
                                        id="file-upload"
                                        name="file-upload"
                                        type="file"
                                        className="sr-only"
                                    />
                                </label>
                                <p className="pl-2 pt-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                                PNG, JPG, GIF up to 10MB
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex space-x-5">
                    <Button
                        title="Back"
                        icon={<ArrowCircleLeftIcon />}
                        onClick={PrevOnClick}
                        IconLeft={true}
                        color="bg-[#EAEAE6]"
                    />
                    <Button
                        title="Next"
                        icon={<ArrowCircleRightIcon />}
                        onClick={NextOnClick}
                    />
                </div>
            </div>
        </>
    );
}

export default DetailsForm;
