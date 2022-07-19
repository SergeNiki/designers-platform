import SubCreateForm from "./SubCreateForm/SubCreateForm";
import classes from "./SubCreateWindow.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

type SubCreateWindowProps = {
    setIsCreateWindow(value: boolean): void
}

const SubCreateWindow = (props: SubCreateWindowProps) => {

    const closeSubCreateWindow = ():void => {
        document.getElementsByTagName('body')[0].style.overflowY = 'auto';
        props.setIsCreateWindow(false);
    }   

    return <div className={classes.create_sub_wrap} onClick={() => closeSubCreateWindow()} >
        <div className={classes.create_sub} onClick={(e) => e.stopPropagation()} >
            <div className={classes.sub_header} >
                <h2>Создание подписки</h2>
                <div className={classes.close_btn} onClick={closeSubCreateWindow}>
                    <FontAwesomeIcon icon={faXmark} />
                </div>
            </div>
            <SubCreateForm/>
        </div>
    </div>
}

export default SubCreateWindow