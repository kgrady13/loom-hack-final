import Image from "next/image";

function SharePreview({ formData }) {
    return (
        <div className="">
            <p className="text-center mb-2 text-2xl font-quicksand text-green-900 font-bold">
                Sample Invitation:
            </p>
            <div className="text-gray-500 mb-4 max-w-sm mx-auto px-4 text-center ">
                <p>
                    Copy the text below to get a head start on an email to your
                    team.
                </p>
            </div>
            <div className="flex flex-col min-w-xl bg-white rounded-3xl shadow-lg border-2 max-w-3xl mx-auto justify-center ">
                <div className="m-auto mx-10 py-10">
                    <div className="max-w-[150px] m-auto py-4">
                        <Image
                            src={formData.teamLogo}
                            alt="Picture of the author"
                            width={250}
                            height={100}
                            className="object-contain"
                        />
                    </div>

                    <p className="text-md pt-3 my-2  text-gray-500 leading-snug text-md">
                        Hello {formData.teamName}, <br />
                        <br />
                        As the year is wrapping up I thought it would be fun to
                        look forward, rather than back. <br />
                        <br />
                        Instead of a traditional New Years’ resolution, I
                        thought it would be fun to set our intentions for 2022
                        from a perspective of values and what values we want to
                        live more fully.
                        <br />
                        <br />
                        I found an interesting new app that lets us review a
                        list of values and select the one we want to live more
                        fully in 2022.
                        <br />
                        <br />
                        It’s simple. If you want to join me on this, you select
                        the value that most resonates with you from a curated
                        list and, using the power of
                        <a href="https://loom.com" target="_blank">
                            <span className="text-[#625df6] font-bold">
                                {" "}
                                Loom
                            </span>
                        </a>
                        , record a short video explaining:
                        <ul className="ml-2 mt-1 list-disc list-inside">
                            <li>What the value means to you</li>
                            <li>
                                {" "}
                                What living it more fully in 2022 will look like
                            </li>
                            <li>
                                How this will make a difference in your life
                            </li>
                        </ul>
                        <br />
                        It is simple, fun, and there is no wrong way to do it!
                        <br />
                        <br />
                        In the end, we will have a team page where we can see
                        what everyone wants more of next year, and maybe we can
                        learn something new and support one another in achieving
                        it!
                        <br />
                        <br />
                        My video is posted, but you have to complete yours in
                        order to see it!
                        <br />
                        <br />
                        Get started here:
                        <span className="ml-2 text-md font-quicksand text-[#1B4332] font-bold">
                            {formData.teamUrl}
                        </span>
                        <br />
                        <br />
                        <p>
                            I look forward to hearing more about the values that
                            mean something to you and sharing the value I want
                            to live more fully!
                        </p>
                        <br />
                        {formData.organizerName}
                        <br />
                        <br />
                        PS. This work is based on the work of Kathleen Seeley
                        and Karson Grady of Massively Human Leadership,
                        leadership development and culture transformation
                        consulting firm that believes everyone and every team is
                        values-driven; the defining difference is how conscious
                        they are about it!{" "}
                        <a
                            href="https://massivelyhuman.com?src=loom-hack"
                            target="_blank"
                            className="text-green-800"
                        >
                            Learn more here
                        </a>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SharePreview;
