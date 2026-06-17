import React, { useState, useEffect } from 'react';
import { ArrowUpDown } from 'lucide-react';

// 1. Custom Hook logic (Embedded)
const useCurrencyInfo = (currency) => {
  const [data, setData] = useState({});
  useEffect(() => {
    fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
      .then((res) => res.json())
      .then((res) => setData(res[currency]));
  }, [currency]);
  return data;
};

// 2. Reusable InputBox Component (Embedded)
const InputBox = ({ label, amount, onAmountChange, onCurrencyChange, currencyOptions = [], selectCurrency = "usd" }) => (
  <div className="bg-white p-3 rounded-lg text-sm flex">
    <div className="w-1/2">
      <label className="text-black/40 mb-2 inline-block">{label}</label>
      <input
        type="number"
        className="outline-none w-full bg-transparent py-1.5"
        placeholder="Amount"
        value={amount}
        onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
      />
    </div>
    <div className="w-1/2 flex flex-wrap justify-end text-right">
      <p className="text-black/40 mb-2 w-full">Currency Type</p>
      <select
        className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
        value={selectCurrency}
        onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
      >
        {currencyOptions.map((currency) => (
          <option key={currency} value={currency}>{currency}</option>
        ))}
      </select>
    </div>
  </div>
);
export default function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  return (
    <div className="w-full h-screen flex flex-wrap justify-center items-center bg-gray-900">
      <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
        <form onSubmit={(e) => { e.preventDefault(); convert(); }}>
          <InputBox label="From" amount={amount} currencyOptions={options} onCurrencyChange={(currency) => setFrom(currency)} selectCurrency={from} onAmountChange={(amount) => setAmount(amount)} />
          <div className="relative w-full h-0.5">
            <button type="button" className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5" onClick={swap}>
              <ArrowUpDown size={20} />
            </button>
          </div>
          <InputBox label="To" amount={convertedAmount} currencyOptions={options} onCurrencyChange={(currency) => setTo(currency)} selectCurrency={to} />
          <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg mt-4">
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}