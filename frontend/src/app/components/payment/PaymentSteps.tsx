'use client';

interface PaymentStepsProps {
  currentStep: number;
}

const steps = [
  { id: 1, name: '确认订单' },
  { id: 2, name: '支付中' },
  { id: 3, name: '支付完成' },
];

export function PaymentSteps({ currentStep }: PaymentStepsProps) {
  return (
    <nav className="flex items-center justify-center" aria-label="Progress">
      <ol className="flex items-center space-x-8">
        {steps.map((step) => (
          <li key={step.id} className="flex items-center">
            {step.id < currentStep ? (
              <div className="flex items-center">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                <span className="ml-3 text-sm font-medium text-blue-600">
                  {step.name}
                </span>
              </div>
            ) : step.id === currentStep ? (
              <div className="flex items-center">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                <span className="ml-3 text-sm font-medium text-blue-600">
                  {step.name}
                </span>
              </div>
            ) : (
              <div className="flex items-center">
                <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
                <span className="ml-3 text-sm font-medium text-gray-500">
                  {step.name}
                </span>
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
