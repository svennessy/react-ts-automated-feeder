import React from "react";
interface TimerProps {
  seconds: number;
  minutes: number;
  hours: number;
  changeSeconds: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeMinutes: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeHours: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Timer: React.FC<TimerProps> = ({
  seconds,
  minutes,
  hours,
  changeSeconds,
  changeMinutes,
  changeHours,
}) => {
  return (
    <div className="flex ml-[1em]">
      <div className="flex items-center flex-col">
        <label className="mr-4 mb-2 text-white">Hours</label>
        <input
          className="w-[100px] bg-white mr-4 text-black outline-none border-none text-[4.5em] font-[600] text-center py-0 px-2 rounded-[5px]"
          type="number"
          value={hours}
          onChange={changeHours}
        />
      </div>
      {""}
      <div className="flex items-center flex-col ">
        <label className="mr-4 mb-2 text-white">Minutes</label>
        <input
          className="w-[100px] bg-white mr-4 text-black outline-none border-none text-[4.5rem] font-[600] text-center py-0 px-2 rounded-[5px]"
          type="number"
          value={minutes}
          onChange={changeMinutes}
        />
      </div>
      {""}
      <div className="flex items-center flex-col">
        <label className="mr-4 mb-2 text-white">Seconds</label>
        <input
          className="w-[100px] bg-white mr-4 text-black outline-none border-none text-[4.5rem] font-[600] text-center py-0 px-2 rounded-[5px]"
          type="number"
          value={seconds}
          onChange={changeSeconds}
        />
      </div>
      {""}
    </div>
  );
};

export default Timer;
