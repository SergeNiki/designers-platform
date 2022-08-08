import { connect } from 'react-redux';
import { StateType } from '../../../redux/redux-store';
import { SubData } from '../../../types/subscriptions';
import {
  getSubscriptions,
  subscribeOrUnsubscribe,
  deleteSubscription,
  editSubscription,
} from '../../../redux/subscriptions-reducer';
import classes from './Subscriptions.module.css';
import SubscriptionCard from '../../../components/SubscriptionCard/SubscriptionCard';
import { useEffect, useState } from 'react';

type SubscriptionsProps = {
  //from State
  subscriptionsCount: number;
  subscriptionsArr: Array<SubData>;
  isFetching: boolean;
  getSubscriptions(id: number): void;
  deleteSubscription(subId: number): void;
  subscribeOrUnsubscribe(subId: number, type: 'sub' | 'unsub'): void;

  //from parent
  isOwner: boolean;
  ownerUserId: number;
};

const Subscriptions = (props: SubscriptionsProps) => {
  useEffect(() => {
    props.getSubscriptions(props.ownerUserId);
  }, [props.ownerUserId, props.subscriptionsCount]);

  const subOrUnsub = async (subId: number, type: 'sub' | 'unsub') => {
    await props.subscribeOrUnsubscribe(subId, type);
    props.getSubscriptions(props.ownerUserId);
  };
  const deleteSub = (subId: number) => {
    props.deleteSubscription(subId);
    props.getSubscriptions(props.ownerUserId);
  };

  const subscriptions = props.subscriptionsArr.map((sub: SubData) => (
    <SubscriptionCard
      key={sub.id}
      subOrUnsub={subOrUnsub}
      isOwner={props.isOwner}
      isFetching={props.isFetching}
      deleteSub={deleteSub}
      {...sub}
    />
  ));

  // if(props.isFetching) {
  //   return <p>Loading...</p>
  // }
  if (props.subscriptionsCount == 0 && !props.isOwner) {
    return <h1>У данного пользователя отсутствуют платные подписки</h1>;
  }

  return (
      <div className={classes.subscriptions_wrap}>
        <div className={classes.subscriptions}>{subscriptions}</div>
      </div>
  );
};

let mapStateToProps = (state: StateType) => ({
  subscriptionsCount: state.subscriptionsData.count,
  subscriptionsArr: state.subscriptionsData.results,
  isFetching: state.subscriptionsData.isFetching,
});

export default connect(mapStateToProps, {
  getSubscriptions,
  deleteSubscription,
  subscribeOrUnsubscribe,
  editSubscription,
})(Subscriptions);
