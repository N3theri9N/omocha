const divValueAndRest = (main: number, by: number): number[] => {
  const value: number = Math.floor(main / by);
  const rest: number = main % by;
  return [value, rest];
};

export const secondToTime = (second : number) : string => {
  const [hours, remains] = divValueAndRest(second, 3600);
  const [minutes, seconds] = divValueAndRest(remains, 60); 

  let hourStr = hours > 0 ? `${hours} 시간` : "";
  let minStr = minutes > 0 ? `${minutes} 분` : "";
  return `${hourStr} ${minStr} ${seconds} 초`;
}