import Button from '../Button/Button'
import ModalWindow from '../ModalWindow/ModalWindow'
import classes from './ConfirmWindow.module.css'

type ConfirmWindowProps = {
    children?: React.ReactNode
    header?: JSX.Element
    confirmTextBtn: string
    handleClick(e: any): void;
    closeWindow(value: false): void
}

const ConfirmWindow = (props: ConfirmWindowProps) => {
    return <ModalWindow styles={{'width': '480px'}} closeWindow={props.closeWindow} header={props.header} >
        <p className={classes.message} >{props.children}</p>
        <div className={classes.buttons_wrap}>
            <Button
            styles={{'marginRight': '5px'}}
                handleClick={props.handleClick}
            >{props.confirmTextBtn}
            </Button>
            <Button
            handleClick={() => props.closeWindow(false)} >
                Отменить
            </Button>
        </div>
    </ModalWindow>
}

export default ConfirmWindow