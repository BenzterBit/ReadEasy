import "./Button.css";
export default function Button({ id, value, currentSpeed, setCurrentSpeed }) {
  const increaseSpeed = (inputSpeed) => {
    var max_speed = 2500;
    var speed = parseInt(inputSpeed, 10);
    speed = Math.floor(speed / 5);
    speed = Math.max(speed + 1, Math.floor(1.05 * speed));
    speed = speed * 5;
    speed = speed > max_speed ? max_speed : speed;
    return speed;
  };

  const decreaseSpeed = (inputSpeed) => {
    var min_speed = 50;
    var speed = parseInt(inputSpeed, 10);
    speed = Math.floor(speed / 5);
    speed = Math.floor(0.953 * speed);
    speed = speed * 5;
    speed = speed < min_speed ? min_speed : speed;
    inputSpeed = speed;
    return speed;
  };

  const handleClick = (e) => {
    if (e.target.id === "fasterButton") {
      setCurrentSpeed(increaseSpeed(currentSpeed));
    }
    if (e.target.id === "slowerButton") {
      setCurrentSpeed(decreaseSpeed(currentSpeed));
    }
  };
  return (
    <input
      type="button"
      className="controlButton"
      id={id}
      value={value}
      onClick={handleClick}
    />
  );
}
