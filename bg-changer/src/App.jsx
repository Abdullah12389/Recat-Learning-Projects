import { useState } from 'react';
import Card from './components/Card';

function App() {
  // State for background color
  const [bgColor, setBgColor] = useState("bg-gray-100");

  // Array of colors for the selector
  const colors = [
    { name: "Gray", class: "bg-gray-100" },
    { name: "Red", class: "bg-red-200" },
    { name: "Blue", class: "bg-blue-200" },
    { name: "Green", class: "bg-green-200" },
    { name: "Yellow", class: "bg-yellow-200" },
    { name: "Purple", class: "bg-purple-200" },
    { name: "Pink", class: "bg-pink-200" }
  ];

  return (
    <div className={`min-h-screen p-10 flex flex-wrap justify-center transition-colors duration-500 ${bgColor}`}>
      <h1 className="text-3xl font-bold w-full text-center mb-10">Team Members</h1>
      
      {/* Cards */}
      <div className="flex flex-wrap justify-center w-full">
        <Card username="Hitesh Choudhary" btnText="View Profile" />
        <Card username="John Doe" />
        <Card username="Jane Smith" btnText="Contact" />
      </div>

      {/* Color Selector Bar */}
      <div className="fixed bottom-10 bg-white p-4 rounded-full shadow-lg flex gap-3">
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => setBgColor(color.class)}
            className={`w-10 h-10 rounded-full border-2 transition-all ${
              bgColor === color.class ? "border-black scale-110" : "border-transparent"
            } ${color.class}`}
            title={color.name}
          />
        ))}
      </div>
    </div>
  );
}

export default App;