import Image from "next/image"
import Link from "next/link"

export default function NotFound(){

    return(
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-800 to-black ">
            <Image 
                src={"/notFound.png"}
                alt={"not found image"}
                width={350}
                height={350}
            />
            <h2 className="text-white text-lg font-medium">You might want to return to the home page</h2>
            <Link href={"/"} className="bg-indigo-950 p-2 m-5 border-solid border-indigo-500 border-2 rounded-md shadow-md shadow-indigo-500/50 hover:bg-indigo-800">Home</Link>
            
        </div>
    )
}