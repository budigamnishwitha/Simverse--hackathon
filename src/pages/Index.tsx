import { useState, useMemo } from "react";
import CircuitDiagram from "@/components/CircuitDiagram";
import ControlPanel from "@/components/ControlPanel";
import FormulaCard from "@/components/FormulaCard";
import { Cpu } from "lucide-react";

const Index = () => {
  const [voltage, setVoltage] = useState(12);
  const [resistance, setResistance] = useState(10);

  // Calculate current using Ohm's Law: I = V / R
  const current = useMemo(() => {
    if (resistance === 0) return 0;
    return voltage / resistance;
  }, [voltage, resistance]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-10">
        <div className="container py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 electric-glow">
              <Cpu className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                Ohm's Law Circuit Builder
              </h1>
              <p className="text-sm text-muted-foreground">
                Interactive learning for electrical fundamentals
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-8 space-y-8">
        {/* Circuit Visualization */}
        <section className="glass-panel p-6 md:p-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Interactive Circuit</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className={`w-2 h-2 rounded-full ${current > 0 ? 'bg-current animate-pulse' : 'bg-muted-foreground'}`} />
              <span>{current > 0 ? 'Current flowing' : 'No current'}</span>
            </div>
          </div>
          <CircuitDiagram 
            voltage={voltage} 
            resistance={resistance} 
            current={current} 
          />
        </section>

        {/* Control Panel */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Adjust Circuit Values</h2>
          <ControlPanel
            voltage={voltage}
            resistance={resistance}
            current={current}
            onVoltageChange={setVoltage}
            onResistanceChange={setResistance}
          />
        </section>

        {/* Formula Reference */}
        <section>
          <FormulaCard />
        </section>

        {/* Tips Section */}
        <section className="glass-panel p-6">
          <h3 className="font-semibold mb-3">💡 Try These Experiments</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-voltage">•</span>
              Increase voltage while keeping resistance constant — watch the current increase!
            </li>
            <li className="flex items-start gap-2">
              <span className="text-resistance">•</span>
              Increase resistance while keeping voltage constant — the current decreases.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-current">•</span>
              Set voltage to 0 — no current flows because there's no electrical pressure.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              Notice how the electron flow animation speeds up with higher current.
            </li>
          </ul>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-6 mt-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>Built to make learning electronics fun and interactive ⚡</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
