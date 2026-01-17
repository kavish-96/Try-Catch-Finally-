import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FooterCTA = () => {
    return (
        <section className="py-20 flex flex-col items-center justify-center relative z-10">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center px-6 max-w-3xl"
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white tracking-tight">
                    Ready to Explore?
                </h2>

                <p className="text-xl text-slate-400 mb-12 font-light">
                    Dive into the data of major cities. Discover patterns. Understand impacts. Make informed decisions.
                </p>

                <Link
                    to="/cities"
                    className="group inline-flex items-center gap-3 px-10 py-5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-lg text-xl font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_40px_rgba(34,211,238,0.5)] transform hover:scale-[1.02]"
                >
                    Explore Cities
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
            </motion.div>
        </section>
    );
};

export default FooterCTA;
