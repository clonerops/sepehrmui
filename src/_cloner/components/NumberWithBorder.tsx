import React, { FC } from 'react';

interface IProps {
    number: number
}

const NumberDisplay:FC<IProps> = ({ number }) => {
  const digits = number.toString().split('').reverse(); // Split the number into digits

  return (
    <div className="flex ">
      {digits.map((digit, index) => (
        <span key={index} className={`border border-black border-solid px-2 print:px-1 text-center ${index === 0 ? 'first' : ''}`}>
          {digit}
        </span>
      ))}
    </div>
  );
}

export default NumberDisplay;
