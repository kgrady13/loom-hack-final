function Button({ title, icon, onClick, color, IconLeft }) {
    return (
        <button
            type="button"
            className={`px-8 py-3 font-bold font-quicksand text-xl mt-6 my-4 ${color || 'bg-[#E2EBE2]'} rounded-2xl 
inline-flex items-center border border-transparent shadow-sm hover:bg-[#E2EBE2]/50 text-body focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E2EBE2] transition-all duration-500 ease-in-out`}
            onClick={onClick}
        >
            {/* {!IconLeft && <span className="mr-2">{icon}</span> : null} */}
            <div className="flex items-center ">
            {!!icon && IconLeft && (
                <span className="-ml-1 mr-3 h-5 w-5" aria-hidden="true">
                    {icon}
                </span>
            )}

            {title || "An Error Occurred"}
            {!!icon && !IconLeft && (
                <span className="-mr-1 ml-3 h-5 w-5" aria-hidden="true">
                    {icon}
                </span>
            )}
            </div>

        </button>
    );
}

export default Button;
