import { StateType } from '../../redux/redux-store';
import { SubData } from '../../types/subscriptions';
import classes from './SubscriptionCard.module.css';

type SubscriptionCardProps = SubData & {
  isOwner: boolean;
  deleteSub(subId: number): void;
  subOrUnsub(subId: number, type: 'sub' | 'unsub'): void;
};

const SubscriptionCard = (props: SubscriptionCardProps) => {
  const getSubButtons = (): JSX.Element => {
    if (props.isOwner) {
      let el = (
        <div className={classes.button_del_wrap} >
          <div className={classes.price_wrap}>
            {props.price} {props.price_currency}
          </div>
          <button
            className={classes.unsub_button}
            onClick={() => props.deleteSub(props.id)}
          >
            Удалить
          </button>
        </div>
      );
      return el;
    } else if (props.is_subscribed) {
      return <button className={classes.unsub_button} 
      onClick={() => props.subOrUnsub(props.id, 'unsub')} 
      >Отменить</button>;
    } else {
      return (
        <button
          className={classes.sub_button}
          onClick={() => props.subOrUnsub(props.id, 'sub')}
        >
          {props.price} {props.price_currency}
        </button>
      );
    }
  };

  return (
    <div className={classes.sub_wrap} style={{backgroundImage: `url(${props.image})`}} >
      <div className={classes.sub_name_wrap}>
        <h3>{props.name}</h3>
      </div>
      <div></div>
      <div className={classes.sub_description}>{props.description}</div>
      {getSubButtons()}
    </div>
  );
};

let mapSateToProps = (state: StateType) => ({});

export default SubscriptionCard;
