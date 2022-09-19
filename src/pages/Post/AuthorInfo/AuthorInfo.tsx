import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { connect } from 'react-redux';
import { StateType } from '../../../redux/redux-store';
import { UserDataType } from '../../../types/users';
import Tooltips from './../../../components/Tooltips/Tooltips';
import classes from './AuthorInfo.module.css';

type AuthorInfoProps = {
  authorInfo: UserDataType;
  isFetching: boolean;
  myUserId: number;
};

const AuthorInfo: React.FC<AuthorInfoProps> = (props) => {
  const [tooltipText, setTooltipText] = useState<string>('');

  const showTooltip = (event: React.MouseEvent<HTMLDivElement>) => {
    let text = String(event.currentTarget.getAttribute('datatype'));
    setTooltipText(text);
  };
  const hideTooltip = (event: React.MouseEvent<HTMLDivElement>) => {
    setTooltipText('');
  };

  return (
    <div className={classes.author_info}>
      <img src={props.authorInfo.avatar} alt='' />
      <div className={classes.author_names}>
        <h2>{props.authorInfo.display_name}</h2>
        <p>@{props.authorInfo.username}</p>
      </div>
      {props.myUserId !== props.authorInfo.id && props.authorInfo.is_followed && (
        <div
          datatype='вы отслеживаете данного автора'
          className={classes.chek_follow_wrap}
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
          onClick={showTooltip}>
          <FontAwesomeIcon icon={faCheck} />
          {tooltipText && (
            <Tooltips orientation='vertical' styles={{ fontSize: '14px' }}>
              {tooltipText}
            </Tooltips>
          )}
        </div>
      )}
    </div>
  );
};

let mapSateToProps = (state: StateType) => ({
  authorInfo: state.postData.author,
});

export default connect(mapSateToProps)(AuthorInfo);
