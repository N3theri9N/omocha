import { useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import classes from "./LeaderBoard.module.css";

const queryClient = new QueryClient();

const LeaderBoard: React.FC<{ quizId: string }> = ({ quizId }) => {
  const [leaderBoardVisible, setLeaderBoardVisible] = useState<boolean>(true);

  const toggleLeaderBoard = () => {
    setLeaderBoardVisible((prevState) => !prevState);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className={classes.leaderBoard}>
        <button className={classes.leaderBoardButton} onClick={toggleLeaderBoard}>TOP 5</button>
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
        `https://react-post-de8f7-default-rtdb.firebaseio.com/omocha/sudoku/solutions/${quizId}.json`
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

  return (
    <div className={classes.leaderBoardList}>
      {recordArray.map((item, index) => {
        if (index > 5) {
          return null;
        }
        const [hours, remains] = divValueAndRest(item.record, 3600);
        const [minutes, seconds] = divValueAndRest(remains, 60);
        return (
          <div key={index} className={classes.leaderBoardRow}>
            {hours ? hours + " 시간" : ""}
            {minutes ? minutes + " 분" : ""}
            {seconds ? seconds + " 초" : ""} : {item.message}
          </div>
        );
      })}
    </div>
  );
};

export default LeaderBoard;
