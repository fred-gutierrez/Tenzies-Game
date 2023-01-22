import { useState } from "react";
import Die from "./components/Die";

export default function App() {
  const [dice, setDice] = useState(allNewDice());

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(Math.ceil(Math.random() * 6));
    }
    return newDice;
  }

  return (
    <main>
      <section className="die-container">
        {dice.map((die) => (
          <Die value={die} />
        ))}
      </section>
    </main>
  );
}
