import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4 text-center">
            <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">404</h1>
            <h2 className="text-4xl font-bold mt-4 mb-6">Page Not Found</h2>
            <p className="text-xl text-gray-400 mb-8 max-w-md">
                The canvas is blank here. The page you are looking for might have been moved or deleted.
            </p>
            <Link
                href="/"
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold hover:opacity-90 transition-opacity"
            >
                Return Home
            </Link>
        </div>
    );
}
