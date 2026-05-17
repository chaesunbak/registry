"use client";

import { useState } from "react";
import { RollingNumber } from "@/registry/default/components/rolling-number";
import { Button } from "@/components/ui/button";
import { Plus, Minus, RefreshCw } from "lucide-react";

export function RollingNumberExample() {
  const [number, setNumber] = useState(12345);

  const increment = () => setNumber((prev) => prev + 1);
  const decrement = () => setNumber((prev) => prev - 1);
  const addTen = () => setNumber((prev) => prev + 10);
  const subtractTen = () => setNumber((prev) => prev - 10);
  const randomize = () => setNumber(Math.floor(Math.random() * 90000) + 10000);

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <div className="text-4xl font-mono font-bold tracking-wider py-4 px-6 min-w-[200px] text-center">
        <RollingNumber number={number} />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={decrement}
          aria-label="Decrement"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={subtractTen}>
          -10
        </Button>
        <Button variant="outline" size="sm" onClick={addTen}>
          +10
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={increment}
          aria-label="Increment"
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={randomize}
          className="gap-2"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          랜덤
        </Button>
      </div>
    </div>
  );
}
