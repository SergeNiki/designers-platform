import React, { memo, useMemo } from 'react';
import classes from './Navigation.module.css';
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
import NavElement from './NavElement';

type NavigationProps = {
  user_id: number | null;
  isAuth: boolean;
  toggleLoginTC(): void;
};

export type NavDatatype =
  | 'главная'
  | 'подписки'
  | 'профиль'
  | 'сообщения'
  | 'понравившееся';
export type NavElementDataType = {
  path: string;
  datatype: NavDatatype;
  icon: IconDefinition;
};

const navElementsData: Array<NavElementDataType> = [
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
    path: `/profile/id`,
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

const Navigation: React.FC<NavigationProps> = (props) => {
  const callLoginWindow = (datatype: NavDatatype) => {
    if (!props.isAuth && datatype !== 'главная') {
      return (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        props.toggleLoginTC();
      };
    }
    return () => {};
  };
  const navElements = navElementsData.map((element) => {
    if (element.datatype == 'профиль') {
      return (
        <NavElement
          key={element.datatype}
          callLoginWindow={callLoginWindow(element.datatype)}
          element={{ ...element, path: `${element.path}${props.user_id}` }}
        />
      );
    }
    return (
      <NavElement
        key={element.datatype}
        callLoginWindow={callLoginWindow(element.datatype)}
        element={element}
      />
    );
  });

  return (
    <nav>
      <div className={classes.nav_wrap}>
        <div className={classes.nav_list}>{navElements}</div>
      </div>
    </nav>
  );
};

let mapStateToProps = (state: StateType) => ({
  user_id: state.auth.id,
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { toggleLoginTC })(Navigation);
