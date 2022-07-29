import SubCreateForm from './SubCreateForm/SubCreateForm';
import classes from './SubCreateWindow.module.css';
import { connect } from 'react-redux';
import { creatingSubscription } from '../../../../redux/subscriptions-reducer';
import { StateType } from '../../../../redux/redux-store';
import { SubscriptionData } from '../../../../types/subscriptions';
import ModalWindow from '../../../../components/ModalWindow/ModalWindow';

type SubCreateWindowProps = {
  setIsCreateWindow(value: boolean): void;
  creatingSubscription(data: SubscriptionData): void;
};

const SubCreateWindow = (props: SubCreateWindowProps) => {
  return (
    <ModalWindow closeWindow={props.setIsCreateWindow}>
      <div className={classes.sub_header}>
        <h2>Создание подписки</h2>
      </div>
      <SubCreateForm
        closeWindow={props.setIsCreateWindow}
        creatingSubscription={props.creatingSubscription}
      />
    </ModalWindow>
  );
};

let mapSateToProps = (state: StateType) => ({});

export default connect(mapSateToProps, {
  creatingSubscription,
})(SubCreateWindow);
