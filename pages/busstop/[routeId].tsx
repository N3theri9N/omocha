import { GetServerSideProps, GetStaticPropsContext } from "next";
import BusStopApp from "../../src/BusStopApp";

const BusStopWithRouteId: React.FC<{ routeId: string; }> = (
  props: { routeId: string } 
) => {
  return <BusStopApp routeId={props.routeId} />;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetStaticPropsContext

  ) => {
  const routeId: string | undefined = context.params?.routeId?.toString();
  return { props: { routeId } };
};

export default BusStopWithRouteId;
