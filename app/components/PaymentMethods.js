import { CreditCard, Wallet } from "lucide-react";

export default function PaymentMethods({ selected, onSelect }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        onClick={() => onSelect("card")}
        className={`flex flex-col items-center justify-center p-6 rounded-2xl border transition-all ${
          selected === "card"
            ? "bg-violet-600/10 border-violet-500 text-white shadow-[0_0_20px_rgba(124,58,237,0.2)]"
            : "bg-neutral-900/30 border-white/10 text-neutral-400 hover:bg-neutral-900/50 hover:border-white/20"
        }`}
      >
        <CreditCard
          className={`w-8 h-8 mb-3 ${
            selected === "card" ? "text-violet-400" : "text-neutral-500"
          }`}
        />
        <span className="font-medium text-sm">Credit Card</span>
      </button>

      <button
        onClick={() => onSelect("paypal")}
        className={`flex flex-col items-center justify-center p-6 rounded-2xl border transition-all ${
          selected === "paypal"
            ? "bg-blue-600/10 border-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.2)]"
            : "bg-neutral-900/30 border-white/10 text-neutral-400 hover:bg-neutral-900/50 hover:border-white/20"
        }`}
      >
        <Wallet
          className={`w-8 h-8 mb-3 ${
            selected === "paypal" ? "text-blue-400" : "text-neutral-500"
          }`}
        />
        <span className="font-medium text-sm">PayPal</span>
      </button>
    </div>
  );
}
