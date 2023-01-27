import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Stats from "./Stats";

export default function Die(props) {
  const styles = {
    color: props.isHeld ? "#51ce83" : "#000000",
  };

  return (
    <div className="die-face" style={styles}>
      <FontAwesomeIcon
        icon={["fas", `fa-dice-${[props.value]}`]}
        size="4x"
        className={props.holdDice && "die-shaking"}
        onClick={props.holdDice}
      />
    </div>
  );
}
