import { motion } from 'framer-motion';
import { ArrowRight, Activity, Wind, Car, Leaf, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const FloatingIcon = ({ Icon, className, delay, duration, x, y }) => (
    <motion.div
        className={`absolute text-slate-700/30 ${className}`}
        animate={{
            y: [0, y, 0],
            x: [0, x, 0],
            opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
            duration: duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay
        }}
    >
        <Icon strokeWidth={1} />
    </motion.div>
);

const Hero = () => {
    return (
        <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 z-10 w-full max-w-5xl mx-auto">

            {/* Floating Decorations */}
            <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
                {/* Top Left - Wind */}
                <FloatingIcon Icon={Wind} className="md:w-32 md:h-32 w-16 h-16 top-[15%] left-[10%]" x={20} y={-30} duration={8} delay={0} />
                {/* Top Right - Car */}
                <FloatingIcon Icon={Car} className="md:w-28 md:h-28 w-14 h-14 top-[20%] right-[15%]" x={-20} y={-20} duration={10} delay={1} />
                {/* Bottom Left - Leaf */}
                <FloatingIcon Icon={Leaf} className="md:w-24 md:h-24 w-12 h-12 bottom-[20%] left-[20%]" x={30} y={20} duration={9} delay={2} />
                {/* Bottom Right - Heart */}
                <FloatingIcon Icon={Heart} className="md:w-32 md:h-32 w-16 h-16 bottom-[15%] right-[10%]" x={-15} y={30} duration={11} delay={3} />

                {/* Smaller particles */}
                <FloatingIcon Icon={Activity} className="w-12 h-12 top-[40%] left-[5%]" x={10} y={10} duration={7} delay={4} />
            </div>

            {/* Badge */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8 relative z-20"
            >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 text-sm font-medium backdrop-blur-md">
                    <Activity className="w-4 h-4" />
                    City Intelligence Platform
                </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-6 relative z-20"
            >
                Every City Tells <br />
                <span className="text-cyan-400 bg-clip-text">A Story</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed relative z-20"
            >
                Transform disconnected urban data into coherent narratives. Understand how weather, air, traffic, and agriculture shape community health.
            </motion.p>

            {/* Buttons */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center gap-4 relative z-20"
            >
                <Link
                    to="/cities"
                    className="px-8 py-4 bg-cyan-400 hover:bg-cyan-300 text-slate-900 rounded-lg text-lg font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] flex items-center gap-2 group"
                >
                    Explore Cities
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>


                <Link
                    to="/simulation"
                    className="px-8 py-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-slate-200 rounded-lg text-lg font-medium backdrop-blur-sm transition-all duration-300 hover:border-slate-600"
                >
                    What-If Lab
                </Link>
            </motion.div>

        </section>
    );
};

export default Hero;
