import React from "react";

const SelectCurrency = ({ name, handleChange, value, currencies }) => {
  return (
    <>
      <select
        className="p-2 h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
        value={value.code}
        name={name}
        onChange={handleChange}
      >
        <option defaultChecked value="0">
          XXX
        </option>
        {currencies.map((c) => (
          <option value={c.code} key={c.code} title={c.name}>
            {c.code}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectCurrency;
