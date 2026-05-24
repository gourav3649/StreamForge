import React from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

type Props = {
  credits: number;
  tier: string;
};

const CreditTracker = ({ credits, tier }: Props) => {
  const used = isNaN(credits) ? 0 : credits;
  const total = tier === "Unlimited" ? "Unlimited" : tier === "Pro" ? 100 : 10;
  
  const percentage = total === "Unlimited" ? 100 : Math.min(100, Math.max(0, (used / (total as number)) * 100));

  return (
    <div className="p-6">
      <Card className="p-6">
        <CardContent className="flex flex-col gap-6">
          <CardTitle className="font-light">Credit Tracker</CardTitle>
          <Progress
            value={percentage}
            className="w-full"
          />
          <div className="flex justify-end">
            <p>
              {used}/{total}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreditTracker;
