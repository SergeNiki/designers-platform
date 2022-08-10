import { useEffect, useState } from 'react';
import { SubData } from '../../types/subscriptions';
import ConfirmWindow from '../ConfirmWindow/ConfirmWindow';
import ModalWindow from '../ModalWindow/ModalWindow';
import SubEditForm from '../SubCreateWindow/SubEditForm/SubEditForm';
import SubButtons from './SubButtons/SubButtons';
import classes from './SubscriptionCard.module.css';

type SubscriptionCardProps = SubData & {
  isOwner: boolean;
  isFetching: boolean;
  deleteSub(subId: number): void;
  subOrUnsub(subId: number, type: 'sub' | 'unsub'): void;
};

const SubscriptionCard = (props: SubscriptionCardProps) => {
  const [isEditWindow, setIsEditWindow] = useState<boolean>(false);
  const [isTextWrap, setIsTextWrap] = useState<boolean>(false);
  const [isConfirmDeletion, setIsConfirmDeletion] = useState<boolean>(false);

  useEffect(() => {
    for (let word of props.name.split(' ')) {
      if (
        word.length > 24 &&
        (window.innerWidth > 940 || window.innerWidth < 768)
      ) {
        setIsTextWrap(true);
      }
    }
  }, [window.innerWidth]);
  
  const deleteSubscription = () => {
    props.deleteSub(props.id)
  }

  const editHeader = <h2>Редактирование подписки</h2>;
  const confirmHeader = <h2>Удаление</h2>;

  return (
    <>
      {isEditWindow && (
        <ModalWindow closeWindow={setIsEditWindow} header={editHeader}>
          <SubEditForm
            subId={props.id}
            closeWindow={setIsEditWindow}
            subName={props.name}
            subDescription={props.description}
            subPrice={props.price}
            subCoverPreview={props.image}
          />
        </ModalWindow>
      )}
      {isConfirmDeletion && (
        <ConfirmWindow
          closeWindow={setIsConfirmDeletion}
          header={confirmHeader}
          handleClick={deleteSubscription}
          confirmTextBtn="Удалить"
        >
          Вы уверены, что хотите безвозвратно удалить подписку?
        </ConfirmWindow>
      )}
      <div
        className={classes.sub_wrap}
        style={{ backgroundImage: `url(${props.image})` }}
      >
        <div className={classes.sub_header}>
          <div className={classes.price_wrap}>
            {props.price.split('.')[0]} {props.price_currency}
          </div>
          <div
            className={classes.sub_name_wrap}
            style={{ wordBreak: isTextWrap ? 'break-all' : 'normal' }}
          >
            {props.name}
          </div>
        </div>

        <div></div>
        <div className={classes.sub_description}>{props.description}</div>
        <SubButtons
          isOwner={props.isOwner}
          isFetching={props.isFetching}
          id={props.id}
          price={props.price}
          price_currency={props.price_currency}
          is_subscribed={props.is_subscribed}
          openDeletionWindow={setIsConfirmDeletion}
          subOrUnsub={props.subOrUnsub}
          openEditWindow={setIsEditWindow}
        />
      </div>
    </>
  );
};

export default SubscriptionCard;
