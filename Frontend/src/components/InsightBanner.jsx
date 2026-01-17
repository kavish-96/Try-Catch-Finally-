import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

const InsightBanner = () => {
    return (
        <section className="py-12 px-6 relative z-10 w-full max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-slate-900/60 border-l-4 border-cyan-500 rounded-r-xl p-8 md:p-10 backdrop-blur-md shadow-2xl"
            >
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-cyan-950/50 flex items-center justify-center text-cyan-400">
                        <Lightbulb className="w-6 h-6" />
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold text-white mb-2">Example Insight</h4>
                        <p className="text-slate-400 leading-relaxed font-light text-lg">
                            "When traffic density exceeds level 7 combined with temperatures above 30°C,
                            air quality typically drops by 15% within 4 hours, increasing respiratory health risk
                            for vulnerable populations."
                        </p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default InsightBanner;
