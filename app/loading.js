/* Global loading page
    inspired by StackOverflow: https://stackoverflow.com/questions/71685632/animated-svg-in-react
*/
export default function Loading(){

    return(
        <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-800 to-black ">
            <div className="flex flex-col items-center">
                {/* svg icon used as animated spinner to give the user a loading feeling */}
                <svg
                className="animate-spin h-12 w-12 text-indigo-600 mb-4"
                xmlns="http://www.w3.org/2000/svg"      // xml namespace
                fill="none"
                viewBox="0 0 24 24"
                >
                <circle             // base circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"       //taking indigo color from text before 
                    strokeWidth="4"
                />
                <path               // rotating part 
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"         // defines the path that the SVG should draw
                />
                </svg>
                <h1 className="text-indigo-600 text-lg font-medium">Loading...</h1>
            </div>
        </div>
    )
}