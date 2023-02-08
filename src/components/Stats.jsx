import React from "react";

export default function Stats(props) {
  const conditionalStyles = {
    color: props.rollClicks < props.bestRoll ? "#00FF00" : "#FF0000",
  };

  return (
    <div className="stats-container">
      <section className="current-section">
        <p>
          Rolls:{" "}
          <span className="current-rolls" style={conditionalStyles}>
            {props.rollClicks}
          </span>
        </p>
        <p>
          Current time:{" "}
          <span className="current-time">{props.formattedTime}</span>
        </p>
      </section>
      {props.bestRoll > 1 && (
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
              Best time: <span className="best-time">{props.bestTime}</span>
            </p>
          ) : (
            ""
          )}
        </section>
      )}
    </div>
  );
}
