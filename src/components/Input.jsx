import React, { useEffect, useState } from "react";
import SelectCurrency from "./SelectCurrency";

const Input = ({
  name,
  title,
  handleChange,
  value,
  currency,
  handleSelect,
  currencies,
  disabled,
  icon,
}) => {
  return (
    <>
      <div className="flex flex-col gap-1">
        <label className="font-bold" htmlFor={name}>
          Valor {title}:
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">{icon}</span>
          </div>
          <input
            type="number"
            name={name}
            id={name}
            className="block w-full rounded-md border-0 py-1.5 pl-9 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="0.00"
            onChange={handleChange}
            value={value}
            disabled={disabled}
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <label htmlFor="currency" className="sr-only">
              Currency
            </label>
            <SelectCurrency
              name={name}
              value={currency ?? 0}
              handleChange={handleSelect}
              currencies={currencies}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Input;
