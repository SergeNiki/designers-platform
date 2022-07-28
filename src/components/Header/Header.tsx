import React from "react";
import { connect } from "react-redux";
import classes from "./Header.module.css";
import { toggleLoginTC, logout } from "./../../redux/auth-reducer";
import { getAuthUserData } from "./../../redux/auth-reducer"
import HeaderPopup from "./UserMenu/UserMenu";
import { StateType } from "../../redux/redux-store";

type HeaderProps = {
  isAuth: boolean;
  username: string | null;
  avatar: string | null;
  avatarFromProfile: string;
  display_name: string | null;
  toggleLoginTC(): void;
  logout(): void;
  getAuthUserData(): void;
}

const Header = (props: HeaderProps) => {

  React.useEffect(() => {
    if(props.isAuth) {
      props.getAuthUserData()
    }
  }, [props.avatarFromProfile])

  const toggleLogin = () => {
    props.toggleLoginTC();
  };

  let [isPopupActive, setPopupActive] = React.useState<boolean>(false)
  
  const openPopupMenu = () => {
    setPopupActive(!isPopupActive)
  }

  return (
    <header>
      <div className={classes.header_wrap}>
        <h1>FLOW OF ART</h1>
        {props.isAuth ? (
          <div onClick={openPopupMenu} className={classes.avatar}>
            {props.avatar && <img src={props.avatar} alt="" />}
          </div>
        ) : (
          <div className={classes.login} onClick={toggleLogin}>
            ВОЙТИ
          </div>
        )}
        {isPopupActive && <HeaderPopup logout={props.logout} display_name={props.display_name} username={props.username} avatar={props.avatar} setPopupActive={setPopupActive} />}
      </div>
    </header>
  );
};

let mapStateToProps = (state: StateType) => ({
  isAuth: state.auth.isAuth,
  username: state.auth.username,
  avatar: state.auth.avatar,
  avatarFromProfile: state.profilePage.avatar,
  display_name: state.auth.display_name
});

export default connect(mapStateToProps, { toggleLoginTC, logout, getAuthUserData })(Header);
