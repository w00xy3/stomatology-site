import {
  Baby, Stethoscope, Puzzle, Scissors, Smile, HeartPulse,
  Monitor, Sparkles, Shield, Sun,
} from "@/components/icons";

const iconMap: Record<string, React.ReactNode> = {
  Baby: <Baby className="w-6 h-6" />,
  Stethoscope: <Stethoscope className="w-6 h-6" />,
  Puzzle: <Puzzle className="w-6 h-6" />,
  Scissors: <Scissors className="w-6 h-6" />,
  Smile: <Smile className="w-6 h-6" />,
  HeartPulse: <HeartPulse className="w-6 h-6" />,
  Monitor: <Monitor className="w-6 h-6" />,
  Sparkles: <Sparkles className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
  Sun: <Sun className="w-6 h-6" />,
};

export function getServiceIcon(iconName: string): React.ReactNode {
  return iconMap[iconName] || <Stethoscope className="w-6 h-6" />;
}
