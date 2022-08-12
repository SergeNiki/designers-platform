import React, { useState } from 'react';
import { connect } from 'react-redux';
import classes from './Header.module.css';
import { toggleLoginTC, logout } from './../../redux/auth-reducer';
import { getAuthUserData } from './../../redux/auth-reducer';
import UserContextMenu from './UserContextMenu/UserContextMenu';
import { StateType } from '../../redux/redux-store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import Tooltips from '../Tooltips/Tooltips';
import AddContextMenu from './AddContextMenu/AddContextMenu';

type HeaderProps = {
  isAuth: boolean;
  username: string | null;
  avatar: string | null;
  avatarFromProfile: string;
  display_name: string | null;
  toggleLoginTC(): void;
  logout(): void;
  getAuthUserData(): void;
};

const Header = (props: HeaderProps) => {
  React.useEffect(() => {
    if (props.isAuth) {
      props.getAuthUserData();
    }
  }, [props.avatarFromProfile]);

  const toggleLogin = () => {
    props.toggleLoginTC();
  };

  const [isUserMenuActive, setIsUserMenuActive] = useState<boolean>(false);
  const [isAddMenuActive, setIsAddMenuActive] = useState<boolean>(false);
  const [tooltipText, setTooltipText] = useState<string>('');
  const [coordsButtonData, setCoordsButtonData] = useState<DOMRect>();

  const openUserContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    const coords = event.currentTarget.getBoundingClientRect();
    setCoordsButtonData(coords);
    setIsUserMenuActive(!isUserMenuActive);
    setIsAddMenuActive(false)
  };
  const openAddContextMenu = (
    event: React.MouseEvent<HTMLDivElement>
  ): void => {
    const coords = event.currentTarget.getBoundingClientRect();
    setCoordsButtonData(coords);
    setIsAddMenuActive(!isAddMenuActive);
    setIsUserMenuActive(false)
    setTooltipText('');
  };

  const showTooltip = (event: React.MouseEvent<HTMLDivElement>) => {
    let text = String(event.currentTarget.getAttribute('datatype'));
    setTooltipText(text);
  };
  const hideTooltip = (event: React.MouseEvent<HTMLDivElement>) => {
    setTooltipText('');
  };

  return (
    <header>
      <div className={classes.header_wrap}>
        <h1>FLOW OF ART</h1>
        {props.isAuth ? (
          <div className={classes.header_items}>
            <div
              className={classes.add_btn}
              datatype="добавить"
              onClick={openAddContextMenu}
              onMouseOver={showTooltip}
              onMouseOut={hideTooltip}
            >
              <FontAwesomeIcon icon={faSquarePlus} />
              {tooltipText && !isAddMenuActive && (
                <Tooltips
                  orientation="vertical"
                  styles={{
                    top: '56px',
                  }}
                >
                  создать
                </Tooltips>
              )}
            </div>
            <div onClick={openUserContextMenu} className={classes.avatar}>
              {props.avatar && <img src={props.avatar} alt="" />}
            </div>
          </div>
        ) : (
          <div className={classes.login} onClick={toggleLogin}>
            ВОЙТИ
          </div>
        )}
        {isAddMenuActive && coordsButtonData && (
          <AddContextMenu
            coordsData={coordsButtonData}
            closeMenu={setIsAddMenuActive}
          />
        )}
        {isUserMenuActive && coordsButtonData && (
          <UserContextMenu
            logout={props.logout}
            display_name={props.display_name}
            username={props.username}
            avatar={props.avatar}
            closeMenu={setIsUserMenuActive}
            coordsData={coordsButtonData}
          />
        )}
      </div>
    </header>
  );
};

let mapStateToProps = (state: StateType) => ({
  isAuth: state.auth.isAuth,
  username: state.auth.username,
  avatar: state.auth.avatar,
  avatarFromProfile: state.profilePage.avatar,
  display_name: state.auth.display_name,
});

export default connect(mapStateToProps, {
  toggleLoginTC,
  logout,
  getAuthUserData,
})(Header);
