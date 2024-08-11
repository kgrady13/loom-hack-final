// function Question({ title, text }) {
function Question({ main, subline, div }) {
    return (
        <div className="">
            <h1 className="text-3xl font-quicksand font-bold text-body">
                {main || "Main Line"}
            </h1>
            <p className="text-xl my-2 max-w-screen-sm text-gray-500">
                {subline || "Subline"}
            </p>
            {div ? (
                <div className="h-1 bg-[#E2EBE2] opacity-25 my-5 max-w-screen-lg"></div>
                
            ) : (
                <div className="my-5"></div>
            )}
        </div>
    );
}

export default Question;
