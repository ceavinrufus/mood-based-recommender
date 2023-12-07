// NumericStepper.js
import React from "react";

function NumericStepper({ value, onChange }) {
  return (
    <div className="numeric-stepper">
      <input
        type="number"
        className="text-black px-2 py-1 rounded-md"
        value={value}
        min={1}
        max={20}
        onChange={(e) => {
          onChange(parseInt(e.target.value));
        }}
        onBlur={() => {
          if (value > 20) onChange(20);
          else if (value < 1) onChange(1);
        }}
      />
    </div>
  );
}

export default NumericStepper;
