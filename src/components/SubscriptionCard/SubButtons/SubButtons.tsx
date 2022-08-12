import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Button from '../../Button/Button';
import classes from './SubButtons.module.css';
import { CSSProperties } from 'react';

type SubButtonsProps = {
  isOwner: boolean;
  isFetching: boolean;
  id: number;
  price: string;
  price_currency: string;
  is_subscribed: boolean;
  openEditWindow(value: true): void;
  openDeletionWindow(value: true): void;
  subOrUnsub(subId: number, type: 'sub' | 'unsub'): void;
};

const SubButtons = (props: SubButtonsProps) => {
  const posBtn: CSSProperties = {
    backgroundColor: 'rgba(0, 0, 0, 0.322)',
    backdropFilter: 'blur(2px)',
    boxShadow: 'none',
    color: 'var(--main-button-color)',
    borderBottom: '1px solid var(--main-button-color)',
  };
  const negBtn: CSSProperties = {
    backgroundColor: '#c4c4c488',
    backdropFilter: 'blur(2px)',
    boxShadow: 'none',
    borderBottom: '1px solid white',
  };

  if (props.isOwner) {
    let el = (
      <div className={classes.buttons_wrap}>
        <Button
          styles={{
            width: '50px',
            marginRight: '5px',
            fontSize: '1.2em',
            ...negBtn,
          }}
          hoverStyles={{
            color: 'rgb(255, 61, 81)',
            backgroundColor: '#C4C4C4',
          }}
          handleClick={() => props.openDeletionWindow(true)}
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </Button>
        <Button
          styles={{ ...posBtn }}
          hoverStyles={{
            color: 'rgba(0, 0, 0, 0.692)',
            backgroundColor: 'var(--main-button-color)',
          }}
          handleClick={() => props.openEditWindow(true)}
        >
          Изменить
        </Button>
      </div>
    );
    return el;
  } else if (props.is_subscribed) {
    return (
      <Button
        isDisabled={props.isFetching}
        styles={{ ...negBtn }}
        hoverStyles={{ color: 'rgb(255, 61, 81)', backgroundColor: '#C4C4C4' }}
        handleClick={() => props.subOrUnsub(props.id, 'unsub')}
      >
        Отменить
      </Button>
    );
  } else {
    return (
      <Button
        isDisabled={props.isFetching}
        styles={{ ...posBtn }}
        hoverStyles={{
          color: 'rgba(0, 0, 0, 0.692)',
          backgroundColor: 'var(--main-button-color)',
        }}
        handleClick={() => props.subOrUnsub(props.id, 'sub')}
      >
        Оформить подписку
      </Button>
    );
  }
};

export default SubButtons;
