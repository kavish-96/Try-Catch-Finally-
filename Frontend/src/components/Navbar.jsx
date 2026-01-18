import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Menu, X, Home, Map, LayoutDashboard, FlaskConical, Github } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect for glassmorphism
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path) => {
        if (path === '/dashboard') return location.pathname.startsWith('/dashboard');
        return location.pathname === path;
    };

    const navLinks = [
        { name: 'Home', path: '/', icon: Home },
        { name: 'Cities', path: '/cities', icon: Map },
        { name: 'Dashboard', path: '/dashboard/1', icon: LayoutDashboard }, // Defaulting to demo ID 1
        { name: 'Simulation', path: '/simulation', icon: FlaskConical },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/80 backdrop-blur-lg border-b border-slate-800 md:bg-transparent md:backdrop-blur-none md:border-none py-3 md:py-5' : 'py-5'}`}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
                    <div className="relative w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden">
                        <img src="/favicon_un.png" alt="UrbanNexus Logo" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-white tracking-tight leading-none">UrbanNexus</span>
                        <span className="text-xs text-slate-500 uppercase tracking-widest font-medium">City Intelligence</span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center rounded-full p-1.5 border border-slate-800/60 shadow-inner shadow-black/20 backdrop-blur-md bg-slate-900/50">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 relative ${isActive(link.path) ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}
                        >
                            {isActive(link.path) && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-slate-800 rounded-full shadow-sm border border-slate-700"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10">{link.name}</span>
                        </Link>
                    ))}
                </div>

                {/* Desktop CTA */}
                <div className="hidden md:flex items-center gap-4">
                    <Link
                        to="/cities"
                        className="px-5 py-2 bg-cyan-400 hover:bg-cyan-300 text-slate-900 rounded-md text-sm font-bold shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all transform hover:scale-105"
                    >
                        Explore Metrics
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden relative z-50 p-2 text-slate-300 hover:text-white transition-colors"
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="md:hidden bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 overflow-hidden"
                    >
                        <div className="px-6 py-6 space-y-4">
                            {navLinks.map((link, idx) => (
                                <motion.div
                                    key={link.path}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <Link
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className={`flex items-center gap-4 p-3 rounded-xl transition-colors ${isActive(link.path) ? 'bg-slate-800 text-cyan-400 border border-slate-700' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
                                    >
                                        <link.icon className="w-5 h-5" />
                                        <span className="font-medium text-lg">{link.name}</span>
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="pt-4 border-t border-slate-800 mt-4"
                            >
                                <Link
                                    to="/cities"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center justify-center w-full p-3 bg-cyan-400 hover:bg-cyan-300 text-slate-900 rounded-lg text-sm font-bold shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                                >
                                    Start Exploring
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
