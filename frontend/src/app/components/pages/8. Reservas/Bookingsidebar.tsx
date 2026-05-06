import { Check } from 'lucide-react';

export interface WizardStep {
  number: number;
  label: string;
  sublabel: string;
}

interface BookingSidebarProps {
  steps: WizardStep[];
  currentStep: number;
  completed: boolean; // true cuando la reserva fue confirmada exitosamente
}

export function BookingSidebar({ steps, currentStep, completed }: BookingSidebarProps) {
  return (
    <aside className="bg-[#0b3c5d] rounded-2xl p-7 flex flex-col gap-1 min-w-[200px] h-full">
      {/* Logo / título */}
      <div className="flex items-center gap-2.5 mb-8">
        <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white font-bold text-lg">
          +
        </div>
        <div>
          <p className="text-white text-sm font-semibold leading-tight">Red Salud Norte</p>
          <p className="text-white/50 text-[11px]">Reserva de hora</p>
        </div>
      </div>

      {/* Steps */}
      {steps.map((step, idx) => {
        const isDone    = completed || step.number < currentStep;
        const isActive  = !completed && step.number === currentStep;
        const upcoming  = !completed && step.number > currentStep;

        return (
          <div key={step.number}>
            <div
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all
                ${isActive ? 'bg-white/10' : ''}
                ${upcoming ? 'opacity-40' : ''}
              `}
            >
              {/* Círculo */}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-semibold border-[1.5px] transition-all
                  ${isDone
                    ? 'bg-[#5bc0eb] border-[#5bc0eb] text-white'
                    : isActive
                      ? 'bg-white border-white text-[#0b3c5d] font-bold'
                      : 'border-white/30 text-white/60'
                  }`}
              >
                {isDone ? <Check size={13} /> : step.number}
              </div>

              {/* Labels */}
              <div>
                <p className="text-white/90 text-[13px] font-medium leading-tight">{step.label}</p>
                <p className="text-white/40 text-[11px] mt-0.5">{step.sublabel}</p>
              </div>
            </div>

            {/* Conector */}
            {idx < steps.length - 1 && (
              <div className="ml-[22px] w-[1.5px] h-4 bg-white/10 my-0.5" />
            )}
          </div>
        );
      })}
    </aside>
  );
}