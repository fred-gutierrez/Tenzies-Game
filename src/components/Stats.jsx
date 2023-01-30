import React from "react";

export default function Stats(props) {
  return (
    <div className="stats-container">
      <section>
        <p>Rolls: {props.rollClicks}</p>
        <p>
          Current time: {props.minutes}:{props.seconds},{props.milliseconds}ms
        </p>
      </section>
      <section>
        {props.bestRoll ? <p>Best rolls: {props.bestRoll}</p> : ""}
        {props.bestTime ? <p>Best time: {props.bestTime}</p> : ""}
      </section>
    </div>
  );
}
