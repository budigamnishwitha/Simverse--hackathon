import { BookOpen } from "lucide-react";

const FormulaCard = () => {
  return (
    <div className="glass-panel p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10 electric-glow">
          <BookOpen className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-lg font-semibold">Understanding Ohm's Law</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-secondary/50 rounded-lg p-4 text-center">
          <p className="text-3xl font-mono font-bold mb-2">
            <span className="text-voltage">V</span>
            <span className="text-muted-foreground"> = </span>
            <span className="text-current">I</span>
            <span className="text-muted-foreground"> × </span>
            <span className="text-resistance">R</span>
          </p>
          <p className="text-sm text-muted-foreground">Find Voltage</p>
        </div>
        
        <div className="bg-secondary/50 rounded-lg p-4 text-center border-2 border-primary/30">
          <p className="text-3xl font-mono font-bold mb-2">
            <span className="text-current">I</span>
            <span className="text-muted-foreground"> = </span>
            <span className="text-voltage">V</span>
            <span className="text-muted-foreground"> ÷ </span>
            <span className="text-resistance">R</span>
          </p>
          <p className="text-sm text-primary">Find Current (Active)</p>
        </div>
        
        <div className="bg-secondary/50 rounded-lg p-4 text-center">
          <p className="text-3xl font-mono font-bold mb-2">
            <span className="text-resistance">R</span>
            <span className="text-muted-foreground"> = </span>
            <span className="text-voltage">V</span>
            <span className="text-muted-foreground"> ÷ </span>
            <span className="text-current">I</span>
          </p>
          <p className="text-sm text-muted-foreground">Find Resistance</p>
        </div>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-4 justify-center text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-voltage" />
          <span><strong className="text-voltage">V</strong> = Voltage (Volts)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-current" />
          <span><strong className="text-current">I</strong> = Current (Amperes)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-resistance" />
          <span><strong className="text-resistance">R</strong> = Resistance (Ohms)</span>
        </div>
      </div>
    </div>
  );
};

export default FormulaCard;
