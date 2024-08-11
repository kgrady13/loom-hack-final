function Input({ type, name, placeholder, id, readOnly, value, onChange }) {
    return (
        <div>
            <div className="mt-1 relative rounded-md shadow-sm mb-10">
                <label htmlFor={type} className="sr-only">
                    {name}
                </label>
                <input
                    type={type}
                    name={name}
                    id={id}
                    className="tracking-wider font-quicksand font-bold text-[#15532d] text-xl shadow-sm focus:ring-[#15532d] focus:border-[#15532d] block w-full sm:text-sm border-gray-300 rounded-md placeholder-gray-400/75 bg-[#EFEFEF] pl-4 py-4"
                    placeholder={placeholder || ""}
                    value={value || ""}
                    readOnly={readOnly || false}
                    onChange={onChange || null}
                />
            </div>

            {/* Validation Stuff / Messages */}
            <p className="hidden mt-2 text-sm text-red-600" id="email-error">
                Your password must be less than 4 characters.
            </p>
        </div>
    );
}

export default Input;
