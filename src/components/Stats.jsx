import React from "react";

export default function Stats(props) {
  const stylesFirstTime = {
    color: "#00FF00",
  };

  const stylesAfterPlayedOnce = {
    color: props.bestRoll > props.rollClicks ? "#00FF00" : "#FF0000",
  };

  return (
    <div className="stats-container">
      <section className="current-section">
        <p>
          Rolls:{" "}
          <span
            className="current-rolls"
            style={props.bestRoll ? stylesAfterPlayedOnce : stylesFirstTime}
          >
            {props.rollClicks}
          </span>
        </p>
        <p>
          Current time:
          <br />
          <span className="current-time">{props.formattedTime}</span>
        </p>
      </section>
      {props.bestRoll >= 1 && (
        <section className="best-section">
          {props.bestRoll ? (
            <p>
              Best rolls: <span className="best-rolls">{props.bestRoll}</span>
            </p>
          ) : (
            ""
          )}
          {props.bestTime ? (
            <p>
              Best time:
              <br />
              <span className="best-time">{props.bestTime}</span>
            </p>
          ) : (
            ""
          )}
        </section>
      )}
    </div>
  );
}
