import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Navigation.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney, faImages, faSquarePlus, faUser, faUserGear } from "@fortawesome/free-solid-svg-icons";
import { faComments, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { StateType } from '../../types/state';
import { connect } from 'react-redux';
import { toggleLoginTC } from "./../../redux/auth-reducer";

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
                    {/* <NavLink to={`/profile/${props.username}`}><FontAwesomeIcon icon={faUser} /></NavLink> */}
                    {props.isAuth && <NavLink to={`/profile/id${props.user_id}`}><FontAwesomeIcon icon={faUser} /></NavLink>}
                    <NavLink to={"/messages"}><FontAwesomeIcon icon={faComments} /></NavLink>
                    <NavLink to={"/"}><FontAwesomeIcon icon={faThumbsUp} /></NavLink>
                    <NavLink to={"/"}><FontAwesomeIcon icon={faSquarePlus} /></NavLink>
                    <NavLink to={"/"}><FontAwesomeIcon icon={faUserGear} /></NavLink>
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