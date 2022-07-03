import { connect } from "react-redux";
import { StateType } from "../../../redux/redux-store";
import { ISubscriptionsState, SubData } from "../../../types/subscriptions";
import classes from "./Subscriptions.module.css";
import SubscriptionsCard from "./SubscriptionsCard/SubscriptionsCard";

type SubscriptionsProps = {
  //from State
  subscriptionsCount: number
  subscriptionsArr: Array<SubData>

  //from parent
  isOwner: boolean
}

const Subscriptions = (props: SubscriptionsProps) => {

  if(props.subscriptionsCount == 0 && !props.isOwner) {
    return <h1>У данного пользователя отсутствуют платные подписки</h1>
  }

  const subscriptions = props.subscriptionsArr.map((sub: SubData) => <SubscriptionsCard key={sub.id} {...sub} />)

  return (
    <div className={classes.subscriptions_wrap}>
      <div className={classes.subscriptions}>
        {subscriptions}
      </div>
    </div>
  );
};

let mapStateToProps = (state: StateType) => ({
  subscriptionsCount: state.subscriptionsData.count,
  subscriptionsArr: state.subscriptionsData.results
})

export default connect(mapStateToProps)(Subscriptions);
