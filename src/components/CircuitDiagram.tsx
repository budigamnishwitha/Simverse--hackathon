import { useMemo } from "react";

interface CircuitDiagramProps {
  voltage: number;
  resistance: number;
  current: number;
}

const CircuitDiagram = ({ voltage, resistance, current }: CircuitDiagramProps) => {
  // Calculate animation speed based on current (higher current = faster flow)
  const flowSpeed = useMemo(() => {
    if (current <= 0) return 0;
    // Map current to speed: more current = faster animation
    const speed = Math.max(0.2, 2 - current * 0.15);
    return speed;
  }, [current]);

  const currentIntensity = useMemo(() => {
    // Normalize current for visual intensity (0-1 scale)
    return Math.min(1, current / 10);
  }, [current]);

  return (
    <div className="relative w-full aspect-[4/3] max-w-2xl mx-auto">
      <svg
        viewBox="0 0 400 300"
        className="w-full h-full"
        style={{ filter: current > 0 ? `drop-shadow(0 0 ${10 + currentIntensity * 20}px hsl(175 100% 45% / ${0.3 + currentIntensity * 0.4}))` : 'none' }}
      >
        {/* Background grid */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="hsl(222 30% 15%)" strokeWidth="0.5" />
          </pattern>
          
          {/* Gradient for battery */}
          <linearGradient id="batteryGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(45 100% 55%)" />
            <stop offset="100%" stopColor="hsl(35 100% 50%)" />
          </linearGradient>
          
          {/* Gradient for resistor */}
          <linearGradient id="resistorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(25 95% 55%)" />
            <stop offset="100%" stopColor="hsl(15 90% 50%)" />
          </linearGradient>
          
          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        <rect width="400" height="300" fill="url(#grid)" />
        
        {/* Circuit wires - base layer */}
        <g stroke="hsl(220 20% 25%)" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Top wire */}
          <path d="M 80 80 L 320 80" />
          {/* Right wire */}
          <path d="M 320 80 L 320 220" />
          {/* Bottom wire */}
          <path d="M 320 220 L 80 220" />
          {/* Left wire */}
          <path d="M 80 220 L 80 80" />
        </g>
        
        {/* Animated current flow */}
        {current > 0 && (
          <g 
            stroke="hsl(175 100% 45%)" 
            strokeWidth="3" 
            fill="none" 
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="8 12"
            style={{ 
              '--flow-speed': `${flowSpeed}s`,
              opacity: 0.6 + currentIntensity * 0.4
            } as React.CSSProperties}
            className="animate-electron-flow"
            filter="url(#glow)"
          >
            {/* Top wire */}
            <path d="M 80 80 L 320 80" />
            {/* Right wire */}
            <path d="M 320 80 L 320 220" />
            {/* Bottom wire */}
            <path d="M 320 220 L 80 220" />
            {/* Left wire */}
            <path d="M 80 220 L 80 80" />
          </g>
        )}
        
        {/* Battery (left side) */}
        <g transform="translate(60, 120)">
          {/* Battery body */}
          <rect 
            x="0" 
            y="0" 
            width="40" 
            height="60" 
            rx="6" 
            fill="hsl(222 40% 12%)" 
            stroke="url(#batteryGradient)" 
            strokeWidth="2"
            className={voltage > 0 ? "voltage-glow" : ""}
          />
          {/* Battery terminal + */}
          <rect x="14" y="-8" width="12" height="8" rx="2" fill="hsl(45 100% 55%)" />
          {/* Plus symbol */}
          <text x="20" y="25" textAnchor="middle" fill="hsl(45 100% 55%)" fontSize="16" fontWeight="bold">+</text>
          {/* Minus symbol */}
          <text x="20" y="50" textAnchor="middle" fill="hsl(210 40% 96%)" fontSize="16" fontWeight="bold">−</text>
          {/* Voltage label */}
          <text x="20" y="80" textAnchor="middle" fill="hsl(45 100% 55%)" fontSize="12" fontFamily="JetBrains Mono" fontWeight="500">
            {voltage}V
          </text>
        </g>
        
        {/* Resistor (right side) */}
        <g transform="translate(280, 110)">
          {/* Resistor body with zigzag */}
          <rect 
            x="0" 
            y="0" 
            width="40" 
            height="80" 
            rx="6" 
            fill="hsl(222 40% 12%)" 
            stroke="url(#resistorGradient)" 
            strokeWidth="2"
            className={resistance > 0 ? "resistance-glow" : ""}
          />
          {/* Zigzag symbol */}
          <path 
            d="M 20 15 L 10 25 L 30 35 L 10 45 L 30 55 L 20 65" 
            stroke="hsl(25 95% 55%)" 
            strokeWidth="3" 
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Resistance label */}
          <text x="20" y="100" textAnchor="middle" fill="hsl(25 95% 55%)" fontSize="12" fontFamily="JetBrains Mono" fontWeight="500">
            {resistance}Ω
          </text>
        </g>
        
        {/* Current meter indicator (top) */}
        <g transform="translate(200, 60)">
          <circle 
            cx="0" 
            cy="0" 
            r="25" 
            fill="hsl(222 40% 12%)" 
            stroke={current > 0 ? "hsl(175 100% 45%)" : "hsl(220 20% 30%)"} 
            strokeWidth="2"
            className={current > 0 ? "current-glow" : ""}
          />
          <text x="0" y="-5" textAnchor="middle" fill="hsl(175 100% 45%)" fontSize="8" fontWeight="600">AMPS</text>
          <text x="0" y="10" textAnchor="middle" fill="hsl(210 40% 96%)" fontSize="14" fontFamily="JetBrains Mono" fontWeight="500">
            {current.toFixed(2)}
          </text>
        </g>
        
        {/* Electron particles when current flows */}
        {current > 0 && (
          <g className="animate-pulse-glow">
            {[...Array(Math.min(8, Math.ceil(current * 2)))].map((_, i) => (
              <circle
                key={i}
                r="3"
                fill="hsl(175 100% 60%)"
                filter="url(#glow)"
              >
                <animateMotion
                  dur={`${flowSpeed * 4}s`}
                  repeatCount="indefinite"
                  begin={`${i * (flowSpeed * 4 / 8)}s`}
                >
                  <mpath href="#electronPath" />
                </animateMotion>
              </circle>
            ))}
            <path
              id="electronPath"
              d="M 80 150 L 80 80 L 320 80 L 320 220 L 80 220 L 80 150"
              fill="none"
              stroke="none"
            />
          </g>
        )}
        
        {/* Flow direction arrows */}
        <g fill="hsl(175 100% 45%)" opacity={current > 0 ? 0.8 : 0.3}>
          {/* Top arrow */}
          <polygon points="200,75 205,80 200,78 195,80" transform="rotate(0 200 77)" />
          {/* Right arrow */}
          <polygon points="325,150 320,145 322,150 320,155" transform="rotate(90 322 150)" />
          {/* Bottom arrow */}
          <polygon points="200,225 195,220 200,222 205,220" transform="rotate(180 200 222)" />
          {/* Left arrow */}
          <polygon points="75,150 80,155 78,150 80,145" transform="rotate(-90 78 150)" />
        </g>
        
        {/* Ohm's Law formula display */}
        <g transform="translate(200, 265)">
          <text textAnchor="middle" fill="hsl(215 20% 55%)" fontSize="11" fontFamily="JetBrains Mono">
            I = V ÷ R = {voltage} ÷ {resistance} = {current.toFixed(2)} A
          </text>
        </g>
      </svg>
    </div>
  );
};

export default CircuitDiagram;
