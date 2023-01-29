import React from "react";

export default function Stats(props) {
  return (
    <div className="stats-container">
      <p>Rolls: {props.rollClicks}</p>
      {props.bestRoll ? <div>Best rolls: {props.bestRoll}</div> : ""}
      {/* <p>Time it took to win: {props.currentTime}</p> */}
    </div>
  );
}
