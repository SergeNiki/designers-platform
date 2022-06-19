import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Preview.module.css'

type PreviewProps = {
    id: number;
    imageSrc: string;
    likesCount: number;
}

const Preview: React.FC<PreviewProps> = (props) => {
    return (
        <div className={classes.preview_wrap}>
            <NavLink to={'/'}>
                <img src={props.imageSrc} alt="image" />
            </NavLink>
        </div>
    )
}

export default Preview;