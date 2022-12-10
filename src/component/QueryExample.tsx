import { useQuery } from "@tanstack/react-query";
import { Group } from "next/dist/shared/lib/router/utils/route-regex";

const QueryExample: React.FC = () => {
  const {
    isLoading,
    error,
    data,
  }: { isLoading: boolean; error: any; data: any } = useQuery<Group[], Error>({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("https://api.github.com/repos/tannerlinsley/react-query").then(
        (res) => res.json()
      ),
  });

  if (isLoading) return (<div>Loading...</div>);

  if (error) return (<div>`An error has occurred: %{error.message}`</div>);

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
    </div>
  );

  return <div>QUERY RESULT</div>;
};

export default QueryExample;
