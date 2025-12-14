export default function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 pt-20 pb-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <h2 className="text-2xl font-bold mb-6 text-white">
                            ORVOX<span className="text-cyan-400">AI</span>
                        </h2>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Transforming complexity into clarity. We deliver secure, intelligent solutions that help industries unlock growth beyond borders.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Services</h3>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">Blockchain Solutions</a></li>
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">AI & ML Solutions</a></li>
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">Web Development</a></li>
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">Data Analysis</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Company</h3>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">Portfolio</a></li>
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contact</h3>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li>Lahore, Pakistan</li>
                            <li>Sharjah, UAE</li>
                            <li><a href="mailto:info@orvoxai.com" className="hover:text-cyan-400 transition-colors">info@orvoxai.com</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-xs">© 2025 Orvox AI. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="text-gray-500 hover:text-white transition-colors text-xs">Privacy Policy</a>
                        <a href="#" className="text-gray-500 hover:text-white transition-colors text-xs">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
