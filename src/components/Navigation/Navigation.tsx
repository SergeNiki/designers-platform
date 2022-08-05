import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Navigation.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney, faImages, faSquarePlus, faUser, faUserGear } from "@fortawesome/free-solid-svg-icons";
import { faComments, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { connect } from 'react-redux';
import { toggleLoginTC } from "./../../redux/auth-reducer";
import { StateType } from '../../redux/redux-store';

type NavigationProps = {
    user_id: number | null
    isAuth: boolean
    toggleLoginTC(): void
}

const Navigation: React.FC<NavigationProps> = (props) => {

    return (
        <nav>
            <div className={classes.nav_wrap}>
                <div className={classes.nav_list}>
                    <NavLink to={"/main"}><FontAwesomeIcon icon={faHouseChimney} /></NavLink>
                    <NavLink to={"/subscriptions"}><FontAwesomeIcon icon={faImages} /></NavLink>
                    {props.isAuth && <NavLink to={`/profile/id${props.user_id}`}><FontAwesomeIcon icon={faUser} /></NavLink>}
                    <NavLink to={"/messages"}><FontAwesomeIcon icon={faComments} /></NavLink>
                    <NavLink to={"/"}><FontAwesomeIcon icon={faThumbsUp} /></NavLink>
                </div>
            </div>
        </nav>
    )
}

let mapStateToProps = (state: StateType) => ({
    user_id: state.auth.user_id,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { toggleLoginTC })(Navigation);