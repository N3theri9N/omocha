import Image from "next/image";
import classes from "./DiagramImage.module.css";

const DiagramImage = (): JSX.Element => {
  return (
    <div className={classes.imageLayout}>
      <Image
        src="/projectDiagram.png"
        alt="projectDiagram"
        fill
      />
    </div>
  );
};

export default DiagramImage;
