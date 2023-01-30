import React, { useRef, useEffect, useState } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import ReactConfetti from "react-confetti";
import Stats from "./components/Stats";

export default function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [rolls, setRolls] = useState(0);
  const [bestRoll, setBestRoll] = useState(
    parseInt(localStorage.getItem("bestRoll")) || 0
  );

  const [bestTime, setBestTime] = useState(
    parseInt(localStorage.getItem("bestTime") || 0)
  );

  useEffect(() => {
    localStorage.setItem("bestRoll", bestRoll.toString());
  }, [bestRoll]);

  useEffect(() => {
    localStorage.setItem("bestTime", bestTime.toString());
  }, [bestTime]);

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
      // FINISHED GAME
      setRolls(0);
      setTenzies(false);
      setDice(allNewDice());
      setTimeElapsed(0);
      if (!bestRoll || rolls < bestRoll) {
        setBestRoll(rolls);
      }
      if (!bestTime || timeElapsed < bestTime) {
        setBestTime(timeElapsed);
      }
    }
    // START TIMER
    if (!running && tenzies === false) {
      setRunning(true);
      intervalId.current = setInterval(() => {
        setTimeElapsed((time) => time + 1);
      }, 1);
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
    // START TIMER
    if (!running) {
      setRunning(true);
      intervalId.current = setInterval(() => {
        setTimeElapsed((time) => time + 1);
      }, 1);
    }
  }

  //-------- TIMER --------//

  const [timeElapsed, setTimeElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalId = useRef(null);

  const milliseconds = timeElapsed % 1000;
  const seconds = Math.floor(timeElapsed / 1000) % 600;
  const minutes = Math.floor(timeElapsed / 60000);

  // const milliseconds = timeElapsed % 1000;
  // const seconds = Math.floor(timeElapsed / 1000) % 600;
  // const minutes = Math.floor(timeElapsed / 60000);

  useEffect(() => {
    if (tenzies) {
      clearInterval(intervalId.current);
      setTimeElapsed(timeElapsed);
      setRunning(false);
      // ^ This resets the timer ^
    }
  }, [tenzies]);

  //-------- TIMER --------//

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
      <Stats
        rollClicks={rolls}
        bestRoll={bestRoll}
        minutes={minutes}
        seconds={seconds}
        milliseconds={milliseconds}
        bestTime={bestTime}
      />
    </main>
  );
}

// TODO: 1 - Find a way to format the minutes and seconds to 00:00
// TODO: 2 - Make the best time display correctly (00:00,0ms)
// TODO: 3 - Style the sections for Current and Best (Stats)
