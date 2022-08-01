import { connect } from "react-redux";
import { StateType } from "../../../redux/redux-store";
import { SubData } from "../../../types/subscriptions";
import { getSubscriptions, subscribeOrUnsubscribe, deleteSubscription } from "../../../redux/subscriptions-reducer"
import classes from "./Subscriptions.module.css";
import SubscriptionCard from "../../../components/SubscriptionCard/SubscriptionCard";
import { useEffect, useState } from "react";
import SubCreateWindow from "./SubCreateWindow/SubCreateWindow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";

type SubscriptionsProps = {
  //from State
  subscriptionsCount: number
  subscriptionsArr: Array<SubData>
  isFetching: boolean
  getSubscriptions(id: number): void
  deleteSubscription(subId: number): void
  subscribeOrUnsubscribe(subId: number, type: 'sub' | 'unsub'): void

  //from parent
  isOwner: boolean
  ownerUserId: number
}

const Subscriptions = (props: SubscriptionsProps) => {

  useEffect(() => {
    props.getSubscriptions(props.ownerUserId)
  }, [props.ownerUserId])

  const [isCreateWindow, setIsCreateWindow] = useState<boolean>(false)

  const openSubCreateWindow = (): void => {
    document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
    setIsCreateWindow(true);
  }

  const subOrUnsub = async (subId: number, type: 'sub' | 'unsub') => {
    await props.subscribeOrUnsubscribe(subId, type)
    props.getSubscriptions(props.ownerUserId)
  }
  const deleteSub = (subId: number) => {
    props.deleteSubscription(subId)
    props.getSubscriptions(props.ownerUserId)
  }

  const subscriptions = props.subscriptionsArr.map((sub: SubData) => 
    <SubscriptionCard key={sub.id} subOrUnsub={subOrUnsub} isOwner={props.isOwner} deleteSub={deleteSub} {...sub} 
  />)

  if(props.isFetching) {
    return <p>Loading...</p>
  }
  if(props.subscriptionsCount == 0 && !props.isOwner) {
    return <h1>У данного пользователя отсутствуют платные подписки</h1>
  }

  return (
    <div className={classes.subscriptions_wrap}>
      {isCreateWindow && <SubCreateWindow setIsCreateWindow={setIsCreateWindow} />}
      <div className={classes.subscriptions}>
        {props.isOwner && <div className={classes.add_sub_btn} onClick={openSubCreateWindow} >
          <FontAwesomeIcon icon={faSquarePlus} />
        </div>}
        {subscriptions}
      </div>
    </div>
  );
};

let mapStateToProps = (state: StateType) => ({
  subscriptionsCount: state.subscriptionsData.count,
  subscriptionsArr: state.subscriptionsData.results,
  isFetching: state.subscriptionsData.isFetching
})

export default connect(mapStateToProps, {
  getSubscriptions,
  deleteSubscription,
  subscribeOrUnsubscribe
})(Subscriptions);
