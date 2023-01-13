import Container from "./component/Introduction/Container";
import "../public/locales";
import Header from "./component/Introduction/header/Header";

const Introduction: React.FC = () => {
  return (
    <>
      <Header />
      <Container />
    </>
  );
};

export default Introduction;