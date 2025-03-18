import React, { useState } from "react";

const ThriftRandomizer = () => {
  const [people, setPeople] = useState([
    "AY",
    "Afeez",
    "Samuel",
    "Tioluwani",
    "Khalid",
    "Nifemi",
  ]);

  const shuffleNames = () => {
    const shuffled = [...people]
      .filter((person) => person !== "Tioluwani")
      .sort(() => Math.random() - 0.5);
    shuffled.splice(1, 0, "Tioluwani"); // Insert "Tioluwani" at position 2
    setPeople(shuffled);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-gray-100 rounded-lg shadow-lg w-80 mx-auto">
      <h2 className="text-xl font-bold">Thrift Randomizer</h2>
      <ul className="list-disc text-lg text-gray-700">
        {people.map((person, index) => (
          <li key={index}>{person}</li>
        ))}
      </ul>

      {/* Normal Button with Tailwind */}
      <button
        onClick={shuffleNames}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        style={{ backgroundColor: "blue" }}
      >
        Randomize
      </button>
    </div>
  );
};

export default ThriftRandomizer;
