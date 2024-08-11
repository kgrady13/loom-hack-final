import Question from "../components/Question";
import Button from "./Button";
import ShareInput from "./ShareInput";
import { ExternalLinkIcon } from "@heroicons/react/outline";

function SharePage({ formData }) {
    return (
        <>
            <div className="flex flex-col items-center text-center">
                <Question
                    main="#3. Share Your Link"
                    subline="Success! Your link is ready to share with your co-workers. We have also provided a sample email invitation for you to copy/paste."
                />
                <ShareInput formData={formData} />

                <p className="pt-4 text-gray-500">
                    Why not lead by example? Click below to submit your
                    response!
                </p>

                <div className="flex">
                    <a href={formData.teamUrl} target="_blank">
                        <Button
                            title="Submit a Response"
                            icon={<ExternalLinkIcon />}
                        />
                    </a>
                </div>
            </div>
        </>
    );
}

export default SharePage;
