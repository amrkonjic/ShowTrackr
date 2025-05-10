
import Image from "next/image";

export default function ShowsLayout({ children }) {
    return (
        <main className='bg-gradient-to-b from-gray-800 to-black text-white flex flex-col items-center'>
            <div>{children}</div>

            <section className="flex flex-row content-between bg-indigo-100 text-black rounded-md m-10 gap-2">
                <div className="p-4 flex flex-col items-center">
                    <Image src="/menu.png" alt="actor icon" width={20} height={20}></Image>
                    <p>Episodes</p>
                </div>
                <div className="p-4 flex flex-col items-center">
                    <Image src="/drama.png" alt="actor icon" width={20} height={20}></Image>
                    <p>Cast</p>
                </div>
                <div className="p-4 flex flex-col items-center">
                    <Image src="/list.png" alt="actor icon" width={20} height={20}></Image>
                    <p>Favorites</p>
                </div>
            </section>
        </main>
        

    );
  }