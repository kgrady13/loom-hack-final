import { valuesList } from "../valuesList.js";
import { useState } from "react";
import Checkbox from "./Checkbox.js";

const valuesOptions = valuesList;

function ValuesGroup() {
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);

    const handleSelectAll = (e) => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(valuesList.map((li) => li.id));
        if (isCheckAll) {
            setIsCheck([]);
        }
    };

    const handleClick = (e) => {
        const { id, name, checked } = e.target;
        setIsCheck([...isCheck, id]);
        if (!checked) {
            setIsCheck(isCheck.filter((item) => item !== id));
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

    const ValuesList = () => (
        <>
            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-8 md:max-w-max my-6">
                {valuesOptions.map((option) => (
                    <label
                        key={option.id}
                        className="-ml-1 text-gray-700 cursor-pointer w-min flex items-center m-1 rounded-xl"
                    >
                        <Checkbox
                            key={option.id}
                            type="checkbox"
                            name={option.name}
                            id={option.id}
                            value={option.id} // was not there
                            handleClick={handleClick}
                            isChecked={isCheck.includes(option.id)}
                            className="peer rounded text-[#707070] absolute ml-2 cursor-pointer"
                        />

                        <span className="peer-checked:bg-[#E2EBE2] text-lg pl-8 select-none transition peer-checked:font-bold  peer-checked:shadow-xl pr-3 rounded-lg font-quicksand">
                            {option.name}
                        </span>
                    </label>
                ))}
            </div>
            <SelectAll />
        </>
    );

    return <ValuesList />;
}

export default ValuesGroup;
