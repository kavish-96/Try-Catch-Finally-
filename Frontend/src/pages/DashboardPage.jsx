import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft, Clock, Thermometer, Wind, Car, Droplets,
    Activity, Info, ChevronRight, TrendingUp
} from 'lucide-react';
import Navbar from '../components/Navbar';
import ParticleBackground from '../components/ParticleBackground';

// --- Mock Data ---
const CITY_DATA = {
    "New York City": {
        temp: { val: "30", unit: "°C", label: "Temperature", trend: "+2°", color: "text-sky-400", bg: "bg-sky-500/10", icon: Thermometer, chartData: [22, 24, 23, 25, 28, 27, 30] },
        aqi: { val: "147", unit: "AQI", label: "Air Quality", trend: "Unhealthy", color: "text-emerald-400", bg: "bg-emerald-500/10", icon: Wind, chartData: [120, 130, 125, 140, 135, 142, 147] },
        traffic: { val: "8", unit: "/10", label: "Traffic Density", sub: "Avg speed: 20 km/h", color: "text-purple-400", bg: "bg-purple-500/10", icon: Car, chartData: [3, 4, 6, 8, 9, 8, 8] },
        humidity: { val: "57", unit: "%", label: "Humidity", color: "text-blue-400", bg: "bg-blue-500/10", icon: Droplets, chartData: [50, 52, 55, 53, 56, 58, 57] },
        health: { score: 83, status: "Low Risk", desc: "Composite score based on air quality, weather conditions, and traffic patterns." },
        insight: "City conditions are within acceptable ranges. Air quality contributes 36% to overall health impact.",
        correlations: [
            { t1: "Weather", t2: "Air Quality", desc: "Current temperature of 30°C combined with 57% humidity affects pollutant dispersion patterns." },
            { t1: "Traffic", t2: "Health", desc: "Traffic density level 8/10 contributes approximately 24% to current air pollution levels." }
        ]
    },
    "Los Angeles": {
        temp: { val: "28", unit: "°C", label: "Temperature", trend: "+1°", color: "text-sky-400", bg: "bg-sky-500/10", icon: Thermometer, chartData: [26, 27, 28, 29, 28, 27, 28] },
        aqi: { val: "162", unit: "AQI", label: "Air Quality", trend: "Poor", color: "text-red-400", bg: "bg-red-500/10", icon: Wind, chartData: [150, 160, 155, 158, 162, 160, 162] },
        traffic: { val: "9", unit: "/10", label: "Traffic Density", sub: "Avg speed: 15 km/h", color: "text-purple-400", bg: "bg-purple-500/10", icon: Car, chartData: [7, 8, 9, 9, 10, 9, 9] },
        humidity: { val: "45", unit: "%", label: "Humidity", color: "text-blue-400", bg: "bg-blue-500/10", icon: Droplets, chartData: [40, 42, 45, 43, 44, 46, 45] },
        health: { score: 65, status: "High Risk", desc: "Elevated risk due to high traffic emissions and stagnant air." },
        insight: "High traffic congestion is significantly degrading local air quality today.",
        correlations: [
            { t1: "Traffic", t2: "Air Quality", desc: "Morning rush hour traffic has spiked NO2 levels by 40% in downtown areas." },
            { t1: "Heat", t2: "Health", desc: "Dry heat combined with smog poses respiratory risks for sensitive groups." }
        ]
    },
    "Chicago": {
        temp: { val: "22", unit: "°C", label: "Temperature", trend: "-1°", color: "text-sky-400", bg: "bg-sky-500/10", icon: Thermometer, chartData: [20, 21, 22, 23, 22, 21, 22] },
        aqi: { val: "85", unit: "AQI", label: "Air Quality", trend: "Good", color: "text-emerald-400", bg: "bg-emerald-500/10", icon: Wind, chartData: [60, 70, 75, 80, 82, 85, 85] },
        traffic: { val: "7", unit: "/10", label: "Traffic Density", sub: "Avg speed: 28 km/h", color: "text-purple-400", bg: "bg-purple-500/10", icon: Car, chartData: [5, 6, 7, 6, 7, 7, 7] },
        humidity: { val: "60", unit: "%", label: "Humidity", color: "text-blue-400", bg: "bg-blue-500/10", icon: Droplets, chartData: [55, 58, 60, 62, 60, 59, 60] },
        health: { score: 88, status: "Low Risk", desc: "Conditions are favorable for outdoor activities." },
        insight: "Air quality is good despite moderate traffic flow.",
        correlations: [
            { t1: "Wind", t2: "Air Quality", desc: "Lake breeze is effectively dispersing urban pollutants." },
            { t1: "Traffic", t2: "Noise", desc: "Traffic noise levels are slightly elevated in the loop area." }
        ]
    },
    "Houston": {
        temp: { val: "32", unit: "°C", label: "Temperature", trend: "+3°", color: "text-sky-400", bg: "bg-sky-500/10", icon: Thermometer, chartData: [30, 31, 32, 33, 32, 31, 32] },
        aqi: { val: "95", unit: "AQI", label: "Air Quality", trend: "Moderate", color: "text-amber-400", bg: "bg-amber-500/10", icon: Wind, chartData: [90, 85, 88, 92, 94, 95, 95] },
        traffic: { val: "6", unit: "/10", label: "Traffic Density", sub: "Avg speed: 35 km/h", color: "text-purple-400", bg: "bg-purple-500/10", icon: Car, chartData: [5, 6, 5, 6, 6, 6, 6] },
        humidity: { val: "75", unit: "%", label: "Humidity", color: "text-blue-400", bg: "bg-blue-500/10", icon: Droplets, chartData: [70, 72, 74, 75, 76, 75, 75] },
        health: { score: 78, status: "Low Risk", desc: "High humidity is the primary concern today.", chartData: [70, 75, 78, 80, 79, 78, 78] },
        insight: "Heat index is high due to 75% humidity.",
        correlations: [
            { t1: "Humidity", t2: "Comfort", desc: "High humidity is driving the 'Real Feel' temperature to 38°C." },
            { t1: "Industry", t2: "Air", desc: "Industrial emissions are remaining stable." }
        ]
    },
    "Phoenix": {
        temp: { val: "38", unit: "°C", label: "Temperature", trend: "+5°", color: "text-red-400", bg: "bg-red-500/10", icon: Thermometer, chartData: [35, 36, 37, 38, 38, 38, 38] },
        aqi: { val: "110", unit: "AQI", label: "Air Quality", trend: "Unhealthy for Sensitive", color: "text-amber-400", bg: "bg-amber-500/10", icon: Wind, chartData: [100, 105, 108, 110, 109, 110, 110] },
        traffic: { val: "5", unit: "/10", label: "Traffic Density", sub: "Avg speed: 45 km/h", color: "text-purple-400", bg: "bg-purple-500/10", icon: Car, chartData: [4, 5, 4, 5, 5, 5, 5] },
        humidity: { val: "15", unit: "%", label: "Humidity", color: "text-blue-400", bg: "bg-blue-500/10", icon: Droplets, chartData: [18, 16, 15, 15, 14, 15, 15] },
        health: { score: 70, status: "High Risk", desc: "Extreme heat warning in effect." },
        insight: "Caution advised due to extreme temperatures.",
        correlations: [
            { t1: "Heat", t2: "Ozone", desc: "Intense sunlight is accelerating ground-level ozone formation." },
            { t1: "Dryness", t2: "Dust", desc: "Low humidity increases risk of dust suspension." }
        ]
    },
    "Seattle": {
        temp: { val: "18", unit: "°C", label: "Temperature", trend: "0°", color: "text-sky-400", bg: "bg-sky-500/10", icon: Thermometer, chartData: [16, 17, 18, 17, 18, 18, 18] },
        aqi: { val: "42", unit: "AQI", label: "Air Quality", trend: "Excellent", color: "text-emerald-400", bg: "bg-emerald-500/10", icon: Wind, chartData: [40, 42, 41, 43, 42, 42, 42] },
        traffic: { val: "7", unit: "/10", label: "Traffic Density", sub: "Avg speed: 25 km/h", color: "text-purple-400", bg: "bg-purple-500/10", icon: Car, chartData: [6, 7, 7, 7, 7, 7, 7] },
        humidity: { val: "80", unit: "%", label: "Humidity", color: "text-blue-400", bg: "bg-blue-500/10", icon: Droplets, chartData: [78, 79, 80, 81, 80, 80, 80] },
        health: { score: 92, status: "Low Risk", desc: "Optimal environmental conditions." },
        insight: "Air quality is excellent following recent rain.",
        correlations: [
            { t1: "Rain", t2: "Air Quality", desc: "Precipitation has effectively washed particulates from the air." },
            { t1: "Clouds", t2: "Temp", desc: "Cloud cover is moderating temperatures." }
        ]
    }
};

const DEFAULT_DATA = CITY_DATA["New York City"];

// --- Components ---

const StatCard = ({ data }) => (
    <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl backdrop-blur-sm hover:border-slate-700 transition-all h-full">
        <div className="flex justify-between items-start mb-4">
            <div className={`w-10 h-10 rounded-lg ${data.bg} flex items-center justify-center`}>
                <data.icon className={`w-5 h-5 ${data.color}`} />
            </div>
            {data.trend && <span className={`text-xs font-bold ${data.color}`}>{data.trend}</span>}
        </div>
        <div className="flex items-end gap-2 mb-1">
            <span className="text-3xl font-bold text-white">{data.val}</span>
            <span className="text-sm text-slate-500 font-medium mb-1.5">{data.unit}</span>
        </div>
        <div className="text-slate-400 text-sm">{data.label}</div>
        {data.sub && <div className="text-slate-500 text-xs mt-1">{data.sub}</div>}
    </div>
);

const Gauge = ({ score }) => {
    const radius = 50;
    const normalizedScore = Math.min(100, Math.max(0, score));

    return (
        <div className="relative w-32 h-32 flex items-center justify-center">
            {/* Background Circle */}
            <svg className="w-full h-full transform -rotate-90">
                <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#1e293b"
                    strokeWidth="10"
                    fill="transparent"
                />
                <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke={score > 70 ? "#22c55e" : score > 50 ? "#f59e0b" : "#ef4444"}
                    strokeWidth="10"
                    fill="transparent"
                    strokeDasharray="351.86"
                    strokeDashoffset={351.86 - (351.86 * score) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-3xl font-bold ${score > 70 ? "text-green-400" : score > 50 ? "text-amber-400" : "text-red-400"}`}>{score}</span>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mt-1">Health Score</span>
            </div>
        </div>
    );
};

const InteractiveSparkline = ({ data, color, height = 50 }) => {
    const [hover, setHover] = useState(null);
    const svgRef = useRef(null);
    const width = 100; // viewBox width

    // Normalize data points to path
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;

    // Create Points
    const points = data.map((val, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((val - min) / range) * (height * 0.6) - (height * 0.2); // Padding
        return { x, y, val };
    });

    const pathD = `M ${points.map(p => `${p.x} ${p.y}`).join(' L ')}`;
    const areaD = `${pathD} V ${height} H 0 Z`;

    const handleMouseMove = (e) => {
        if (!svgRef.current) return;
        const rect = svgRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const viewBoxX = (x / rect.width) * width;

        // Find closest point
        const closest = points.reduce((prev, curr) =>
            Math.abs(curr.x - viewBoxX) < Math.abs(prev.x - viewBoxX) ? curr : prev
        );

        setHover(closest);
    };

    return (
        <div
            className="relative h-12 w-full cursor-crosshair"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHover(null)}
        >
            <svg
                ref={svgRef}
                className="w-full h-full overflow-visible"
                viewBox={`0 0 ${width} ${height}`}
                preserveAspectRatio="none"
            >
                {/* Gradient Definition */}
                <defs>
                    <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" className={color} />
                        <stop offset="100%" stopColor="currentColor" stopOpacity="0" className={color} />
                    </linearGradient>
                </defs>

                {/* Area */}
                <path d={areaD} fill={`url(#grad-${color})`} />

                {/* Line */}
                <path
                    d={pathD}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={color}
                />

                {/* Hover Indicator */}
                {hover && (
                    <>
                        <line
                            x1={hover.x} y1="0"
                            x2={hover.x} y2={height}
                            stroke="white"
                            strokeWidth="1"
                            strokeDasharray="2 2"
                            className="transition-all duration-75"
                        />
                        <circle
                            cx={hover.x} cy={hover.y} r="3"
                            fill="white"
                            stroke="currentColor"
                            strokeWidth="2"
                            className={color}
                        />
                    </>
                )}
            </svg>

            {/* Tooltip */}
            {hover && (
                <div
                    className="absolute bottom-full mb-2 bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs shadow-xl pointer-events-none z-10 w-24"
                    style={{ left: `${(hover.x / width) * 100}%`, transform: 'translateX(-50%)' }}
                >
                    <div className="font-bold text-white mb-0.5">{hover.val}</div>
                    <div className={`font-mono ${color}`}>Value</div>
                </div>
            )}
        </div>
    );
};

const DomainCard = ({ title, value, unit, color, icon: Icon, chartData }) => (
    <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl backdrop-blur-sm hover:border-slate-700 transition-all group overflow-visible">
        <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded bg-slate-800 flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 ${color}`} />
                </div>
                <span className="text-white font-medium">{title}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
        </div>

        <div className="flex items-end gap-2 mb-6">
            <span className={`text-2xl font-bold ${color}`}>{value}</span>
            <span className="text-xs text-slate-500 mb-1">{unit}</span>
        </div>

        {/* Interactive Sparkline */}
        <InteractiveSparkline data={chartData} color={color} />
    </div>
);


const DashboardPage = () => {
    const { cityName } = useParams();
    const city = decodeURIComponent(cityName || '');
    const data = CITY_DATA[city] || DEFAULT_DATA;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [city]);

    return (
        <div className="relative min-h-screen bg-slate-950 font-sans text-white selection:bg-cyan-500/30 selection:text-cyan-200">
            <ParticleBackground />
            <Navbar />

            <div className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <Link to="/cities" className="flex items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors text-sm mb-2 group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Cities
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-bold text-white">{city || "New York City"}</h1>
                    </div>

                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/80 border border-slate-800 rounded-lg text-sm text-slate-400 backdrop-blur-md">
                        <Clock className="w-4 h-4" />
                        <span>Last updated: {new Date().toLocaleTimeString()}</span>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                    {/* Left 4 Cards */}
                    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <StatCard data={data.temp} />
                        <StatCard data={data.aqi} />
                        <StatCard data={data.traffic} />
                        <StatCard data={data.humidity} />
                    </div>

                    {/* Right Health Gauge */}
                    <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-2xl backdrop-blur-sm flex flex-col items-center justify-center text-center">
                        <Gauge score={data.health.score} />
                        <div className={`mt-6 px-4 py-1.5 rounded-full text-xs font-bold text-slate-950 ${data.health.score > 70 ? "bg-green-400" : data.health.score > 50 ? "bg-amber-400" : "bg-red-400"}`}>
                            {data.health.status}
                        </div>
                        <p className="text-sm text-slate-400 mt-4 max-w-[200px]">
                            {data.health.desc}
                        </p>
                    </div>
                </div>

                {/* Insight Banner */}
                <div className="mb-12 relative overflow-hidden rounded-xl bg-slate-900/60 border-l-4 border-cyan-500 p-8 backdrop-blur-md">
                    <div className="relative z-10 flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0">
                            <TrendingUp className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white mb-1">Current Insight</h3>
                            <p className="text-slate-400">{data.insight}</p>
                        </div>
                    </div>
                </div>

                {/* Domain Overview */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-white mb-6">Domain Overview</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <DomainCard title="Weather" value={data.temp.val} unit={data.temp.unit} color={data.temp.color} icon={Thermometer} chartData={data.temp.chartData} />
                        <DomainCard title="Air Quality" value={data.aqi.val} unit="AQI" color={data.aqi.color} icon={Wind} chartData={data.aqi.chartData} />
                        <DomainCard title="Traffic" value={data.traffic.val} unit="/10" color={data.traffic.color} icon={Car} chartData={data.traffic.chartData} />
                        <DomainCard title="Health Index" value={data.health.score} unit="/100" color="text-rose-400" icon={Activity} chartData={data.health.chartData || [80, 82, 85, 83, 84, 83, 83]} />
                    </div>
                </div>

                {/* System Correlations */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-6">System Correlations</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {data.correlations.map((corr, i) => (
                            <div key={i} className="bg-slate-900/40 border-l-4 border-blue-500 p-6 rounded-r-xl backdrop-blur-sm flex items-start gap-4">
                                <div className="mt-1">
                                    <Info className="w-5 h-5 text-blue-500" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2">{corr.t1} <span className="text-slate-500">→</span> {corr.t2}</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        {corr.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DashboardPage;
