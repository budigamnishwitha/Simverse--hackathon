import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, Activity, Gauge } from "lucide-react";

interface ControlPanelProps {
  voltage: number;
  resistance: number;
  current: number;
  onVoltageChange: (value: number) => void;
  onResistanceChange: (value: number) => void;
}

const ControlPanel = ({
  voltage,
  resistance,
  current,
  onVoltageChange,
  onResistanceChange,
}: ControlPanelProps) => {
  const handleVoltageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= 24) {
      onVoltageChange(value);
    }
  };

  const handleResistanceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 100) {
      onResistanceChange(value);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Voltage Control */}
      <div className="glass-panel p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-voltage/10 voltage-glow">
            <Zap className="w-5 h-5 text-voltage" />
          </div>
          <div>
            <Label className="text-sm text-muted-foreground">Voltage</Label>
            <p className="text-2xl font-semibold font-mono text-voltage">{voltage.toFixed(1)}V</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <Slider
            value={[voltage]}
            onValueChange={([val]) => onVoltageChange(val)}
            min={0}
            max={24}
            step={0.5}
            className="voltage-slider"
          />
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={voltage}
              onChange={handleVoltageInput}
              min={0}
              max={24}
              step={0.5}
              className="font-mono text-center bg-secondary border-voltage/30 focus:border-voltage"
            />
            <span className="text-muted-foreground text-sm">volts</span>
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground">
          Voltage is the electrical pressure that pushes current through a circuit.
        </p>
      </div>

      {/* Resistance Control */}
      <div className="glass-panel p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-resistance/10 resistance-glow">
            <Activity className="w-5 h-5 text-resistance" />
          </div>
          <div>
            <Label className="text-sm text-muted-foreground">Resistance</Label>
            <p className="text-2xl font-semibold font-mono text-resistance">{resistance.toFixed(1)}Ω</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <Slider
            value={[resistance]}
            onValueChange={([val]) => onResistanceChange(val)}
            min={1}
            max={100}
            step={1}
            className="resistance-slider"
          />
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={resistance}
              onChange={handleResistanceInput}
              min={1}
              max={100}
              step={1}
              className="font-mono text-center bg-secondary border-resistance/30 focus:border-resistance"
            />
            <span className="text-muted-foreground text-sm">ohms</span>
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground">
          Resistance opposes the flow of current in a circuit.
        </p>
      </div>

      {/* Current Display */}
      <div className="glass-panel p-6 space-y-4 current-glow">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-current/10">
            <Gauge className="w-5 h-5 text-current" />
          </div>
          <div>
            <Label className="text-sm text-muted-foreground">Current (Calculated)</Label>
            <p className="text-2xl font-semibold font-mono text-current">{current.toFixed(3)}A</p>
          </div>
        </div>
        
        {/* Current visualization bar */}
        <div className="space-y-2">
          <div className="h-3 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-current to-electric-blue rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (current / 10) * 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground font-mono">
            <span>0A</span>
            <span>10A</span>
          </div>
        </div>
        
        <div className="pt-2 border-t border-border/50">
          <p className="text-xs text-muted-foreground mb-2">Ohm's Law Formula:</p>
          <div className="bg-secondary/50 rounded-lg p-3 text-center">
            <p className="font-mono text-sm">
              <span className="text-current">I</span>
              <span className="text-muted-foreground"> = </span>
              <span className="text-voltage">V</span>
              <span className="text-muted-foreground"> ÷ </span>
              <span className="text-resistance">R</span>
            </p>
            <p className="font-mono text-xs text-muted-foreground mt-1">
              {voltage} ÷ {resistance} = {current.toFixed(3)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
