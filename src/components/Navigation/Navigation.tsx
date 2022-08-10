import React, { MouseEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Navigation.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAddressBook,
  faHouseChimney,
  faUser,
  faComments,
  faThumbsUp,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { toggleLoginTC } from './../../redux/auth-reducer';
import { StateType } from '../../redux/redux-store';
import Tooltips from '../Tooltips/Tooltips';

type NavigationProps = {
  user_id: number | null;
  isAuth: boolean;
  toggleLoginTC(): void;
};

const Navigation: React.FC<NavigationProps> = (props) => {
  const [tooltipText, setTooltipText] = useState<string>('');

  const navElementsData: Array<{
    path: string;
    datatype: string;
    icon: IconDefinition;
  }> = [
    {
      path: '/main',
      datatype: 'главная',
      icon: faHouseChimney,
    },
    {
      path: '/subscriptions',
      datatype: 'подписки',
      icon: faAddressBook,
    },
    {
      path: `/profile/id${props.user_id}`,
      datatype: 'профиль',
      icon: faUser,
    },
    {
      path: '/messages',
      datatype: 'сообщения',
      icon: faComments,
    },
    {
      path: '/likes',
      datatype: 'понравившееся',
      icon: faThumbsUp,
    },
  ];

  const showTooltip = (event: React.MouseEvent<HTMLAnchorElement>) => {
    let text = String(event.currentTarget.getAttribute('datatype'));
    setTooltipText(text);
  };
  const hideTooltip = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setTooltipText('');
  };
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setTooltipText('');
  };

  const navElements = navElementsData.map((element) => {
    return (
      <NavLink
        to={element.path}
        datatype={element.datatype}
        onMouseOver={showTooltip}
        onMouseOut={hideTooltip}
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={element.icon} />
        {tooltipText == element.datatype && (
          <Tooltips orientation="horizontal">{tooltipText}</Tooltips>
        )}
      </NavLink>
    );
  });

  return (
    <nav>
      <div className={classes.nav_wrap}>
        <div className={classes.nav_list}>
          {navElements}
        </div>
      </div>
    </nav>
  );
};

let mapStateToProps = (state: StateType) => ({
  user_id: state.auth.id,
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { toggleLoginTC })(Navigation);
