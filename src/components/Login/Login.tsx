import { connect } from "react-redux";
import TelegramLoginButton from "react-telegram-login";
import classes from "./Login.module.css";
import { toggleLoginTC, onTelegramAuth } from "../../redux/auth-reducer";
import ModalWindow from "../ModalWindow/ModalWindow";
import { StateType } from "../../redux/redux-store";
import { ITelegramUser } from "../../types/auth";

type LoginProps = {
  toggleLoginTC(value?: boolean): void
  onTelegramAuth(user: ITelegramUser): void
}

const Login = (props: LoginProps) => {
  const header = <h2>Авторизация</h2>

  return <ModalWindow closeWindow={props.toggleLoginTC} header={header} styles={{width: '350px'}} >
        <div className={classes.login} >
        <TelegramLoginButton
          dataOnauth={props.onTelegramAuth}
          botName="ArtifactAuthBot"
        />
        </div>
  </ModalWindow>
};

let mapStateToProps = (state: StateType) => ({});

export default connect(mapStateToProps, { toggleLoginTC, onTelegramAuth })(Login);
