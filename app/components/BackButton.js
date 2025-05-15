"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function BackButton() {
    const router = useRouter();

    function handleClick() {
        router.back();
    }

    return (
        <button
            onClick={handleClick}
            className='bg-zinc-600 hover:bg-violet-500 text-black px-3 rounded-l-md transition-colors flex flex-col items-center justify-center'>
            <Image src={"/left-arrows.png"} alt="back button icon" width={20} height={20}/>
            Back
        </button>
    );
}
