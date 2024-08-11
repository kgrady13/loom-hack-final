import { CheckIcon } from "@heroicons/react/outline";

const steps = [
    { name: "Step 1", href: "#", status: "complete" },
    { name: "Step 2", href: "#", status: "current" },
    { name: "Step 3", href: "#", status: "upcoming" },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

function Stepper() {
    return (
        <nav aria-label="Progress">
            <ol role="list" className="flex items-center justify-center mt-10">
                {steps.map((step, stepIdx) => (
                    <li
                        key={step.name}
                        className={classNames(
                            stepIdx !== steps.length - 1 ? "pr-8 sm:pr-20" : "",
                            "relative"
                        )}
                    >
                        {step.status === "complete" ? (
                            <>
                                <div
                                    className="absolute inset-0 flex items-center"
                                    aria-hidden="true"
                                >
                                    <div className="h-0.5 w-full bg-body" />
                                </div>
                                <a
                                    href="#"
                                    className="relative w-8 h-8 flex items-center justify-center bg-body rounded-full hover:bg-indigo-900"
                                >
                                    <CheckIcon
                                        className="w-5 h-5 text-white"
                                        aria-hidden="true"
                                    />
                                    <span className="sr-only">{step.name}</span>
                                </a>
                            </>
                        ) : step.status === "current" ? (
                            <>
                                <div
                                    className="absolute inset-0 flex items-center"
                                    aria-hidden="true"
                                >
                                    <div className="h-0.5 w-full bg-gray-200" />
                                </div>
                                <a
                                    href="#"
                                    className="relative w-8 h-8 flex items-center justify-center bg-white border-2 border-body rounded-full"
                                    aria-current="step"
                                >
                                    <span
                                        className="h-2.5 w-2.5 bg-body rounded-full"
                                        aria-hidden="true"
                                    />
                                    <span className="sr-only">{step.name}</span>
                                </a>
                            </>
                        ) : (
                            <>
                                <div
                                    className="absolute inset-0 flex items-center"
                                    aria-hidden="true"
                                >
                                    <div className="h-0.5 w-full bg-gray-200" />
                                </div>
                                <a
                                    href="#"
                                    className="group relative w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full hover:border-gray-400"
                                >
                                    <span
                                        className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300"
                                        aria-hidden="true"
                                    />
                                    <span className="sr-only">{step.name}</span>
                                </a>
                            </>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}

export default Stepper;
