import { connect } from "react-redux";
import { StateType } from "../../../redux/redux-store";
import { ISubscriptionsState, SubData } from "../../../types/subscriptions";
import { getSubscriptions } from "../../../redux/subscriptions-reducer"
import classes from "./Subscriptions.module.css";
import SubscriptionsCard from "./SubscriptionsCard/SubscriptionsCard";
import { useEffect, useState } from "react";

type SubscriptionsProps = {
  //from State
  subscriptionsCount: number
  subscriptionsArr: Array<SubData>
  getSubscriptions(id: number): void

  //from parent
  isOwner: boolean
  ownerUserId: number
}

const Subscriptions = (props: SubscriptionsProps) => {

  useEffect(() => {
    props.getSubscriptions(props.ownerUserId)
  }, [props.ownerUserId])

  const [isCreateWindow, setIsCreateWindow] = useState<boolean>(false)

  if(props.subscriptionsCount == 0 && !props.isOwner) {
    return <h1>У данного пользователя отсутствуют платные подписки</h1>
  }

  const subscriptions = props.subscriptionsArr.map((sub: SubData) => <SubscriptionsCard key={sub.id} {...sub} />)

  return (
    <div className={classes.subscriptions_wrap}>
      {isCreateWindow}
      <div className={classes.subscriptions}>
        {props.isOwner && <div className={classes.add_sub_btn} onClick={() => setIsCreateWindow(true)} >
          добавить
        </div>}
        {subscriptions}
      </div>
    </div>
  );
};

let mapStateToProps = (state: StateType) => ({
  subscriptionsCount: state.subscriptionsData.count,
  subscriptionsArr: state.subscriptionsData.results
})

export default connect(mapStateToProps, {
  getSubscriptions
})(Subscriptions);
