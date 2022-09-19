import { NavLink } from 'react-router-dom';
import { UserDataType } from '../../../types/users';
import classes from './PreviewInfo.module.css';

type PreviewHeaderProps = {
  topValue: number;
  authorData: UserDataType;
};

const PreviewHeader: React.FC<PreviewHeaderProps> = (props) => {
  return (
    <div
      className={classes.preview_header}
      style={{ top: props.topValue + '%' }}>
      <div className={classes.avatar_wrap}>
        <NavLink to={`/profile/id${props.authorData.id}`}>
          <img
            src={props.authorData.avatar}
            className={classes.avatar}
            alt={props.authorData.display_name}
          />
        </NavLink>
      </div>
      <div className={classes.author_name}>
        <NavLink to={`/profile/id${props.authorData.id}`}>
          {props.authorData.display_name}
        </NavLink>
      </div>
    </div>
  );
};

export default PreviewHeader;
