import React, { useEffect, useState } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import ReactConfetti from "react-confetti";
import Stats from "./components/Stats";

export default function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [rolls, setRolls] = useState(0);
  const [bestRoll, setBestRoll] = React.useState(
    parseInt(localStorage.getItem("bestRoll")) || 0
  );

  React.useEffect(() => {
    localStorage.setItem("bestRoll", bestRoll.toString());
  }, [bestRoll]);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  function generateNewDie() {
    let sides = ["one", "two", "three", "four", "five", "six"];
    return {
      value: sides[Math.floor(Math.random() * sides.length)],
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    setRolls((oldRolls) => oldRolls + 1);
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setRolls(0);
      setTenzies(false);
      setDice(allNewDice());
      if (!bestRoll || rolls < bestRoll) {
        setBestRoll(rolls);
      }
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  return (
    <main>
      {tenzies && <ReactConfetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until <span className="fw-bold">all dice are the same</span>. Click
        each die to freeze
        <br />
        it at its current value between rolls.
      </p>
      <section className="die-container">
        {dice.map((die) => (
          <Die
            holdDice={() => holdDice(die.id)}
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
          />
        ))}
      </section>
      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
      <Stats rollClicks={rolls} bestRoll={bestRoll} />
    </main>
  );
}

// TODO: 1 - Track the time it took to win
// TODO: 2 - Save the best time to localStorage
