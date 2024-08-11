import Button from "../components/Button";
import ValuesList from "../components/ValuesList";
import Question from "../components/Question";
import { ArrowCircleRightIcon } from "@heroicons/react/outline";

function PageOne({onClick}) {
    return (
        <div className="">
            <Question
                div={true}
                main="#1. Values Selection"
                subline="From the list below, select the values you would like to be presented as options to your co-workers."
            />
            <ValuesList />
            <Button title="Next Step" icon={<ArrowCircleRightIcon />} onClick={onClick}/>
        </div>
    );
}

export default PageOne;
