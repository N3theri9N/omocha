import { useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import classes from "./LeaderBoard.module.css";

const queryClient = new QueryClient();

const LeaderBoard: React.FC<{ quizId: string }> = ({ quizId }) => {
  const [leaderBoardVisible, setLeaderBoardVisible] = useState<boolean>(true);

  const toggleLeaderBoard = () => {
    setLeaderBoardVisible((prevState) => !prevState);
  };

  const arrow = () => {
    return leaderBoardVisible ? <>&#8420;</> : <>&#9660;</>;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className={classes.leaderBoard}>
        <button
          className={classes.leaderBoardButton}
          onClick={toggleLeaderBoard}
        >
          <div className={classes.text}>TOP 5</div>
          <div className={classes.arrow}>{arrow()}</div>
        </button>
        {leaderBoardVisible && <Example quizId={quizId} />}
      </div>
    </QueryClientProvider>
  );
};

const divValueAndRest = (main: number, by: number): number[] => {
  const value: number = Math.floor(main / by);
  const rest: number = main % by;
  return [value, rest];
};

const Example: React.FC<{ quizId: string }> = ({ quizId }) => {
  type recordData = {
    record: number;
    message: string;
  };

  const { error, data, isFetching, isLoading } = useQuery(
    `leaderBoard${quizId}`,
    async () => {
      const response = await fetch(
        `/api/sudoku/leaderBoard/${quizId}`
      );
      return await response.json();
    },
    { staleTime: 30000 }
  );

  const recordArray: recordData[] = [];

  for (let key of Object.keys(data || {})) {
    const value = data[key];
    recordArray.push({ message: value.message, record: value.record });
  }
  recordArray.sort((a: recordData, b: recordData) => a.record - b.record);

  // if (isLoading) return <>'is Loading...'</>;

  // if (error) return <>'error has occured'</>;

  type Records = {
    message: string,
    record: number,
  }

  return (
    <div className={classes.leaderBoardList}>
      {recordArray.length < 1 && (
        <div className={classes.leaderBoardRow}> * 기록이 없습니다.</div>
      )}
      {recordArray.map((item:Records, index) => {
        if (index >= 5) {
          return null;
        }
        const [hours, remains] = divValueAndRest(item.record, 3600);
        const [minutes, seconds] = divValueAndRest(remains, 60);

        let message:string = item.message || "";
        if(message.trim().length <= 0){
          message = "(내용이 없습니다.)"
        }

        return (
          <div key={index} className={classes.leaderBoardRow}>
            {hours > 0 && `${hours} 시간 `}
            {minutes > 0 && `${minutes} 분 `}
            {seconds > 0 && `${seconds} 초 `} : {message}
          </div>
        );
      })}
    </div>
  );
};

export default LeaderBoard;
