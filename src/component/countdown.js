import React, {useState} from "react";
import { useCountdown } from "../hooks/useCountdown";

const CountdownTimer = () => {
  const [canLoginAt] = useState(localStorage.getItem("canLoginAt") ? localStorage.getItem("canLoginAt") : '')
  const [seconds] = useCountdown(canLoginAt);

  return (
      <>
          <h3>Terlalu banyak percobaan, harap tunggu beberapa saat</h3>
          <div className="d-flex justify-content-center mt-3 countdown">
              <p className="text-danger fs-3">{seconds}</p>
              <span>Detik</span>
          </div>
      </>
  )
};

export default CountdownTimer;