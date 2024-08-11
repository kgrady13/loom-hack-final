import logo from "../public/logo.svg";
import Image from "next/image";

function Footer() {
    return (
        <footer className="hidden md:flex justify-end pr-5 pb-5 right-0 bottom-0 fixed">

            
            <a
                className="text-center"
                href="#"
                // target="_blank"
                // rel="noopener noreferrer"
            >
                <div className="bg-[#EAEAE6] rounded-3xl shadow-xl px-4 pb-2">
                    <Image
                        src={logo}
                        alt="Karson Grady Logo"
                        width={80}
                        height={80}
                    />
                    <p className="font-quicksand font-black text-[#707070] -mt-6">
                        creation
                    </p>
                </div>
            </a>
        </footer>
    );
}

export default Footer;
