import Container from "./component/Introduction/Container";
import "../public/locales";

import Header from "./component/Introduction/header/Header";
import Navigation from "./component/Introduction/Navigation";

const Introduction: React.FC = () => {
  return (
    <>
      <Header />
      <Navigation />
      <Container />
    </>
  );
};

export default Introduction;
