// components/payment/PaymentSteps.tsx
interface Step {
    id: number;
    title: string;
  }
  
  const steps: Step[] = [
    { id: 1, title: "确认订单" },
    { id: 2, title: "选择支付方式" },
    { id: 3, title: "完成支付" }
  ];
  
  export function PaymentSteps({ currentStep }: { currentStep: number }) {
    return (
      <div className="flex items-center gap-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`
              flex items-center justify-center w-8 h-8 rounded-full
              ${currentStep >= step.id ? 'bg-blue-500 text-white' : 'bg-gray-200'}
            `}>
              {step.id}
            </div>
            <span className="ml-2">{step.title}</span>
            {index < steps.length - 1 && (
              <div className="w-12 h-px bg-gray-300 mx-2" />
            )}
          </div>
        ))}
      </div>
    );
  }
  