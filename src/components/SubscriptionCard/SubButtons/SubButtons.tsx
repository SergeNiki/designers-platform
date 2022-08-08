import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Button from '../../Button/Button'
import classes from './SubButtons.module.css'

type SubButtonsProps = {
    isOwner: boolean
    isFetching: boolean
    id: number
    price: string
    price_currency: string
    is_subscribed: boolean
    openEditWindow(value: true): void
    deleteSub(subId: number): void;
    subOrUnsub(subId: number, type: 'sub' | 'unsub'): void;
}

const SubButtons = (props: SubButtonsProps) => {
    if (props.isOwner) {
        let el = (
          <div className={classes.buttons_wrap}>
            <Button
            styles={{'width': '50px', 
            'marginRight': '5px', 
            'backgroundColor': '#c4c4c488',
            'fontSize': '1.2em',
            'boxShadow': 'none',
            'borderBottom': '1px solid white'
          }}
              hoverStyles={{'color': 'rgb(255, 61, 81)', 'backgroundColor': '#C4C4C4'}}
              handleClick={() => props.deleteSub(props.id)}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </Button>
            <Button
            styles={{'backgroundColor': 'rgba(0, 0, 0, 0.322)',
            'backdropFilter': 'blur(2px)',
            'boxShadow': 'none',
            'color': '#6DEFC0',
            'borderBottom': '1px solid #6DEFC0',
          }}
              hoverStyles={{'color': 'black', 'backgroundColor': '#6DEFC0'}}
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
          styles={{
            'marginRight': '5px', 
            'backgroundColor': '#c4c4c488',
            'fontSize': '1.2em',
            'boxShadow': 'none',
            'borderBottom': '1px solid white'
          }}
              hoverStyles={{'color': 'rgb(255, 61, 81)', 'backgroundColor': '#C4C4C4'}}
            handleClick={() => props.subOrUnsub(props.id, 'unsub')}
          >
            Отменить
          </Button>
        );
      } else {
        return (
          <Button
          isDisabled={props.isFetching}
          styles={{'backgroundColor': 'rgba(0, 0, 0, 0.322)',
            'backdropFilter': 'blur(2px)',
            'boxShadow': 'none',
            'color': '#6DEFC0',
            'borderBottom': '1px solid #6DEFC0',
          }}
              hoverStyles={{'color': 'black', 'backgroundColor': '#6DEFC0'}}
            handleClick={() => props.subOrUnsub(props.id, 'sub')}
          >
            Оформить подписку
          </Button>
        );
      }
}

export default SubButtons