import { Check } from "lucide-react";

interface Step {
  number: number;
  label: string;
  completed: boolean;
  current: boolean;
}

export function ProgressStepper({ steps }: { steps: Step[] }) {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between relative">
        {steps.map((step, index) => (
          <div key={step.number} className="flex flex-col items-center flex-1 relative z-10">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                step.completed
                  ? "bg-primary text-primary-foreground"
                  : step.current
                  ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                  : "bg-muted text-muted-foreground"
              }`}
              data-testid={`step-indicator-${step.number}`}
            >
              {step.completed ? <Check className="w-5 h-5" /> : step.number}
            </div>
            <span
              className={`mt-2 text-xs font-medium text-center ${
                step.current ? "text-foreground" : "text-muted-foreground"
              }`}
              data-testid={`text-step-label-${step.number}`}
            >
              {step.label}
            </span>
            {index < steps.length - 1 && (
              <div
                className={`absolute top-5 left-1/2 w-full h-0.5 -z-10 ${
                  step.completed ? "bg-primary" : "bg-border"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
