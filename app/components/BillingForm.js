import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function BillingForm({ method }) {
  return (
    <div className="bg-neutral-900/30 border border-white/5 rounded-3xl p-6 lg:p-8 space-y-6">
      {/* Name & Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-neutral-300">Full Name</Label>
          <Input
            placeholder="John Doe"
            className="bg-neutral-800/50 border-white/10 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-neutral-300">Email Address</Label>
          <Input
            placeholder="john@example.com"
            className="bg-neutral-800/50 border-white/10 text-white"
          />
        </div>
      </div>

      {/* Card Details (Only show if Card is selected) */}
      {method === "card" && (
        <div className="p-6 bg-neutral-950 rounded-2xl border border-white/10 mt-6 relative overflow-hidden">
          {/* Card Visual Background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl pointer-events-none"></div>

          <h3 className="text-white font-medium mb-4">Card Information</h3>

          <div className="space-y-4 relative z-10">
            <div className="space-y-2">
              <Label className="text-neutral-400 text-xs uppercase tracking-wider">
                Card Number
              </Label>
              <Input
                placeholder="0000 0000 0000 0000"
                className="bg-neutral-800 border-white/10 text-white font-mono placeholder:text-neutral-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-neutral-400 text-xs uppercase tracking-wider">
                  Expiry
                </Label>
                <Input
                  placeholder="MM / YY"
                  className="bg-neutral-800 border-white/10 text-white font-mono placeholder:text-neutral-600"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-neutral-400 text-xs uppercase tracking-wider">
                  CVC
                </Label>
                <Input
                  placeholder="123"
                  className="bg-neutral-800 border-white/10 text-white font-mono placeholder:text-neutral-600"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {method === "paypal" && (
        <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-center">
          <p className="text-blue-200 text-sm">
            You will be redirected to PayPal to complete your purchase securely.
          </p>
        </div>
      )}

      <div className="flex items-center space-x-2 pt-2">
        <Checkbox
          id="terms"
          className="border-white/20 data-[state=checked]:bg-violet-600"
        />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-neutral-400"
        >
          I agree to the{" "}
          <span className="text-white hover:underline cursor-pointer">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="text-white hover:underline cursor-pointer">
            Privacy Policy
          </span>
          .
        </label>
      </div>
    </div>
  );
}
