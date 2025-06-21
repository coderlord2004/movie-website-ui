import React from 'react'

export default function Footer() {
    return (
        <footer className="bg-gray-900 border-t border-gray-800 py-12">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-6 md:mb-0">
                        <h3 className="text-2xl font-bold text-blue-500">MovieStream</h3>
                        <p className="text-gray-400 mt-2">The best streaming experience</p>
                    </div>
                    <div className="flex space-x-6">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">About</a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
                    © {new Date().getFullYear()} MovieStream. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
