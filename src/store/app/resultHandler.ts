import { resultMoney } from "../../data/money";

const resultHandler = (scoredGoals: number, concededGoals: number) => {
  if (scoredGoals > concededGoals) {
    return resultMoney.win;
  } else if (scoredGoals < concededGoals) {
    return resultMoney.lose;
  } else {
    return resultMoney.draw;
  }
};

export default resultHandler;
