import React from 'react';
import './App.css';
import { useSpring, animated } from "react-spring";

function get_days(): number{
  const oneDay: number = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const firstDay: Date = new Date(2022, 11, 6);
  const today: Date = new Date();
  const easternTimeZoneOffset: number = today.getTimezoneOffset() / 60 + 5;
  const eastern_timezone_today: Date = new Date(today.getTime() + easternTimeZoneOffset * 60 * 60 * 1000);
  const days: number = Math.round(Math.abs(( eastern_timezone_today.getTime() - firstDay.getTime()) / oneDay));
  return days;
}

interface NumberProps {
  n: number;
}

function DisplayDays({ n }: NumberProps) {
  const { number } = useSpring({
    from: { number: 0 },
    number: n, 
    delay: 200, 
    config: {mass: 1, tension: 20, friction: 10},
  });
  return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h1>
        ELIO
        <DisplayDays n={get_days()} />
        DAYS
      </h1>
      </header>
    </div>
  );
}

export default App;
