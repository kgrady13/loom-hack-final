const options = [
    {
        id: "all",
        name: "All",
        totalOptions: 13,
    },
    { id: "alphabetical", name: "Alphabetical" },
    { id: "popularity", name: "Popularity" },
    // { id: "random", name: "Random" },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

function Filter() {
    return (
        <div className="flex my-6">
            {options.map((option) => (
                <button
                    className={classNames(
                        "relative rounded-2xl mx-2 px-6 py-2 bg-[#EAEAE6] text-sm md:text-base text-gray-500"
                    )}
                    key={option.id}
                >
                    {option.name}
                    {!option.totalOptions ? null : (
                        <span className="-m-1 flex flex-col justify-center align-middle absolute -top-2 -right-1 text-[11px] bg-white rounded-full shadow-sm border border-gray-300 text-gray-400 h-6 w-6">
                            {option.totalOptions}
                        </span>
                    )}
                </button>
            ))}
        </div>
    );
}

export default Filter;
