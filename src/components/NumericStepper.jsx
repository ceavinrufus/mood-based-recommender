// NumericStepper.js
import React from "react";

function NumericStepper({ value, onChange }) {
  return (
    <div className="">
      <input
        type="number"
        className="text-black px-2 py-1"
        value={value}
        min={1}
        max={20}
        onChange={(e) => {
          onChange(parseInt(e.target.value));
        }}
      />
    </div>
  );
}

export default NumericStepper;
