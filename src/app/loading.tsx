export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="relative w-24 h-24">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-purple-500 border-opacity-20 rounded-full"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-purple-300 font-bold text-sm">
                    Loading...
                </div>
            </div>
        </div>
    );
}
