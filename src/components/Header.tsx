import Image from "next/image";

export default function Header() {
    return (
        <header className="absolute top-0 left-0 w-full p-6 flex items-center z-10">
            <Image
                src="/logo2.png"
                alt="Logo Secundario"
                width={150}
                height={75}
                className="h-12 md:h-16 w-auto object-contain brightness-0 opacity-80"
            />
        </header>
    );
}
