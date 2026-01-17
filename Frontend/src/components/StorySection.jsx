import { motion } from 'framer-motion';
import { TrendingUp, AlertTriangle, Lightbulb } from 'lucide-react';

const steps = [
    {
        icon: TrendingUp,
        title: "Observe Cause",
        text: "Temperature rises by 5°C. Traffic congestion increases. Rainfall patterns shift.",
        highlight: "Environmental triggers",
        color: "text-blue-400"
    },
    {
        icon: AlertTriangle,
        title: "Track Effect",
        text: "Air quality deteriorates. Crop stress increases. Urban heat islands intensify.",
        highlight: "Cascading impacts",
        color: "text-cyan-400"
    },
    {
        icon: Lightbulb,
        title: "Understand Impact",
        text: "Health risk scores shift. Decision makers gain actionable insights. Communities adapt.",
        highlight: "Informed decisions",
        color: "text-rose-400"
    }
];

const StorySection = () => {
    return (
        <section className="py-10 px-6 relative z-10 w-full max-w-6xl mx-auto">

            <div className="text-center mb-10">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Data Becomes Story</h2>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                    We don't just show numbers. We reveal the narrative hidden within urban data.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        className="bg-slate-900/40 border border-slate-800 p-8 rounded-2xl backdrop-blur-sm hover:border-slate-700 transition-colors group"
                    >
                        <div className={`w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                            <step.icon className={`w-6 h-6 ${step.color}`} />
                        </div>

                        <h3 className="text-2xl font-semibold text-white mb-4">{step.title}</h3>
                        <p className="text-slate-400 mb-6 leading-relaxed">
                            {step.text}
                        </p>

                        <span className={`text-sm font-medium ${step.color} opacity-80 uppercase tracking-wider`}>
                            {step.highlight}
                        </span>
                    </motion.div>
                ))}
            </div>

        </section>
    );
};

export default StorySection;
