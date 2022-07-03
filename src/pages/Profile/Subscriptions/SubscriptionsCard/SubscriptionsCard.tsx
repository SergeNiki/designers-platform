import { useState } from "react";
import { SubData } from "../../../../types/subscriptions";
import classes from "./SubscriptionsCard.module.css";

const SubscriptionsCard = (props: SubData) => {
  return (
    <div className={classes.sub_wrap}>
      <div className={classes.sub_name_wrap}>
        <h3>{props.name}</h3>
      </div>
      <img src={props.image} alt="preview" />
      <div className={classes.sub_description}>{props.description}</div>
      {props.is_subscribed ? (
        <button
          className={classes.unsub_button}
        >
          Отменить
        </button>
      ) : (
        <button
          className={classes.sub_button}
        >
          {props.price} {props.price_currency}
        </button>
      )}
    </div>
  );
};

export default SubscriptionsCard;
