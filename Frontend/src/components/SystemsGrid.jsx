import { motion } from 'framer-motion';
import { CloudRain, Wind, Car, Sprout, Heart } from 'lucide-react';

const systems = [
    { icon: CloudRain, title: "Weather Patterns", desc: "Temperature, humidity, and rainfall directly influence air quality and agricultural yields.", color: "text-sky-400" },
    { icon: Wind, title: "Air Quality", desc: "Pollutant levels affect respiratory health and determine outdoor activity safety.", color: "text-emerald-400" },
    { icon: Car, title: "Traffic Flow", desc: "Congestion patterns correlate with emissions, affecting both air quality and stress levels.", color: "text-purple-400" },
    { icon: Sprout, title: "Agriculture", desc: "Crop health responds to climate conditions, affecting food security and local economy.", color: "text-lime-400" },
    { icon: Heart, title: "Health Index", desc: "The culmination of all factors—a single metric for community wellbeing.", color: "text-rose-400" },
];

const SystemsGrid = () => {
    return (
        <section className="py-10 px-6 relative z-10 w-full max-w-7xl mx-auto">

            <div className="text-center mb-10">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Interconnected Systems</h2>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                    Urban environments are complex ecosystems. Every change creates ripples across all domains.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {systems.map((sys, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group bg-slate-900/40 border border-slate-800 p-8 rounded-2xl backdrop-blur-sm hover:bg-slate-800/60 transition-colors"
                    >
                        <div className={`w-16 h-16 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-center mb-6 shadow-lg shadow-black/40 group-hover:border-slate-600 group-hover:bg-slate-900 transition-all duration-300 group-hover:scale-110 group-hover:shadow-${sys.color.replace('text-', '')}/20`}>
                            <sys.icon className={`w-8 h-8 ${sys.color} transition-transform duration-300`} />
                        </div>

                        <h3 className="text-xl font-bold text-white mb-3">{sys.title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            {sys.desc}
                        </p>
                    </motion.div>
                ))}
            </div>

        </section>
    );
};

export default SystemsGrid;
