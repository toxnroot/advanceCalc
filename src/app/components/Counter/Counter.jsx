"use client"
import "./counter.css";
import { useEffect, useState } from "react";

const Counter = ({ numDay, iD, setEmploys }) => {
  const [counter, setCounter] = useState(numDay);

  useEffect(() => {
    const storedEmploys = JSON.parse(localStorage.getItem("employ")) || [];
    if (storedEmploys.length > 0) {
      setCounter(storedEmploys[iD]?.day || numDay);
    }
  }, [iD, numDay]);

  const updateDays = (newDays) => {
    if (newDays < 0) return; // ✅ يمنع القيم السالبة
  
    setCounter(newDays);
    const storedEmploys = JSON.parse(localStorage.getItem("employ")) || [];
    if (storedEmploys[iD]) {
      storedEmploys[iD].day = newDays;
      storedEmploys[iD].totalDue = storedEmploys[iD].salary * newDays; // تحديث المبلغ المستحق
      localStorage.setItem("employ", JSON.stringify(storedEmploys));
      setEmploys([...storedEmploys]);
    }
  };
  

  return (
    <div className="counter-container">
      <button className="plus" onClick={() => updateDays(counter + 1)}>+</button>
      <p className="count">{counter}</p>
      <button className="minus" onClick={() => updateDays(counter - 1)}>-</button>
    </div>
  );
};

export default Counter;
