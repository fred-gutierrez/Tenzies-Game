import React, { useRef, useEffect, useState } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import ReactConfetti from "react-confetti";
import Stats from "./components/Stats";
import useLocalStorage from "./hooks/useLocalStorage";

export default function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [rolls, setRolls] = useState(0);
  const { bestRoll, setBestRoll, bestTime, setBestTime } = useLocalStorage();

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
      // if (!bestTime || timeElapsed < bestTime) {
      //   setBestTime(timeElapsed);
      // }
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

  const milliseconds = ("000" + (timeElapsed % 1000)).slice(-3);
  const seconds = ("00" + (Math.floor(timeElapsed / 1000) % 60)).slice(-2);
  const minutes = ("00" + Math.floor(timeElapsed / 60000)).slice(-2);

  const bestMilliseconds = ("000" + (bestTime % 1000)).slice(-3);
  const bestSeconds = ("00" + (Math.floor(bestTime / 1000) % 60)).slice(-2);
  const bestMinutes = ("00" + Math.floor(bestTime / 60000)).slice(-2);

  useEffect(() => {
    if (tenzies) {
      clearInterval(intervalId.current);
      setTimeElapsed(timeElapsed);
      setRunning(false);
      // ^ This resets the timer ^
    }
  }, [tenzies]);

  const formattedTime = `${minutes}:${seconds}:${milliseconds}ms`;
  const bestFormattedTime = `${bestMinutes}:${bestSeconds}:${bestMilliseconds}ms`;

  //-------- TIMER --------//

  return (
    <main>
      {tenzies && <ReactConfetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until <span className="fw-bold">all dice are the same</span>. Click
        each die to freeze it at its current value between rolls.
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
        formattedTime={formattedTime}
        bestTime={bestFormattedTime}
      />
    </main>
  );
}

// TODO: Change styling to have a more solid look, rather than experimental
