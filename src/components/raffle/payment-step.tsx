'use client';

interface PaymentStepProps {
  totalAmount: number;
  ticketCount: number;
  multiplier: number;
  bonusPercentage: number;
  onComplete: () => void;
}

export default function PaymentStep({
  totalAmount,
  ticketCount,
  multiplier,
  bonusPercentage,
  onComplete,
}: PaymentStepProps) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-[#1A1A1A] rounded-lg p-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2 text-white">Payment Details</h2>
          <p className="text-gray-400">Complete your purchase to secure your raffle tickets</p>
        </div>

        {/* Order Summary */}
        <div className="bg-[#2A2A2A] rounded-lg p-6 mb-8">
          <h3 className="text-lg font-medium text-white mb-4">Order Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Base Tickets</span>
              <span className="text-white">{ticketCount / multiplier}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Multiplier</span>
              <span className="text-[#3399FF]">{multiplier}x</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Bonus Odds</span>
              <span className="text-[#00FFCC]">+{bonusPercentage}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Final Ticket Count</span>
              <span className="text-white font-bold">{ticketCount}</span>
            </div>
            <div className="pt-3 mt-3 border-t border-gray-700">
              <div className="flex justify-between">
                <span className="text-white">Total Amount</span>
                <span className="text-[#3399FF] font-bold">${totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-white">Payment Method</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['Credit Card', 'PayPal', 'Crypto', 'Apple Pay'].map(method => (
              <button
                key={method}
                className="flex items-center justify-center space-x-2 p-4 rounded-lg bg-[#2A2A2A] text-white hover:bg-[#3399FF] transition-colors"
              >
                <span>{method}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Terms */}
        <div className="mt-8 text-sm text-gray-400">
          <p className="mb-4">
            By proceeding with the payment, you agree to our terms and conditions. All purchases are
            final and non-refundable.
          </p>
        </div>

        {/* Complete Payment Button */}
        <button
          onClick={onComplete}
          className="w-full mt-6 py-3 bg-gradient-to-r from-[#3399FF] to-[#00FFCC] text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          Complete Payment
        </button>
      </div>
    </div>
  );
}
