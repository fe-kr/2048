import { configure } from "mobx";
import { BoardComponent } from "../components/board";

configure({
  enforceActions: "never",
});

const Game2048 = () => {
  return <BoardComponent />;
};

export default Game2048;
