import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import TelegramLoginButton from "react-telegram-login";
import classes from "./Login.module.css";
import { toggleLoginTC, onTelegramAuth } from "./../../redux/auth-reducer";

const Login = (props) => {
  const closeHandle = () => {
    props.toggleLoginTC();
  };

  return (
    <div className={classes.login_wrap} onClick={closeHandle}>
      <div className={classes.login} onClick={(e) => e.stopPropagation()}>
        <div className={classes.header}>
          <h3>Авторизация</h3>
          <div className={classes.close_btn} onClick={closeHandle}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
        <TelegramLoginButton
          dataOnauth={props.onTelegramAuth}
          botName="ArtifactAuthBot"
        />
      </div>
    </div>
  );
};

let mapStateToProps = (state) => ({
  isProcessLogin: state.auth.isProcessLogin,
});

export default connect(mapStateToProps, { toggleLoginTC, onTelegramAuth })(Login);
