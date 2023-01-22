import { useState } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";

export default function App() {
  const [dice, setDice] = useState(allNewDice());

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return newDice;
  }

  function rollDice() {
    setDice(allNewDice());
  }

  return (
    <main>
      <section className="die-container">
        {dice.map((die) => (
          <Die key={die.id} value={die.value} isHeld={die.isHeld} />
        ))}
      </section>
      <button className="roll-dice" onClick={rollDice}>
        Roll
      </button>
    </main>
  );
}
