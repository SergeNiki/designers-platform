import Button from '../Button/Button'
import ModalWindow from '../ModalWindow/ModalWindow'
import classes from './ConfirmWindow.module.css'

type ConfirmWindowProps = {
    children?: React.ReactNode
    header?: JSX.Element
    confirmTextBtn: string
    handleClick(e: any): void;
    closeWindow(): void
}

const ConfirmWindow = (props: ConfirmWindowProps) => {
    return <ModalWindow styles={{'width': '480px'}} closeWindow={props.closeWindow} header={props.header} >
        <div className={classes.message} >{props.children}</div>
        <div className={classes.buttons_wrap}>
            <Button
            styles={{'marginRight': '5px'}}
                handleClick={props.handleClick}
            >{props.confirmTextBtn}
            </Button>
            <Button
            handleClick={props.closeWindow} >
                Отменить
            </Button>
        </div>
    </ModalWindow>
}

export default ConfirmWindow