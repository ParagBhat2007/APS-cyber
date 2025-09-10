import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <div className="glass-card p-6 neon-glow group cursor-pointer">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="p-4 rounded-2xl bg-gradient-to-r from-cyber-blue/20 to-cyber-cyan/20 border border-cyber-border group-hover:from-cyber-blue/30 group-hover:to-cyber-cyan/30 transition-all duration-300">
          <Icon className="h-8 w-8 text-cyber-cyan" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;