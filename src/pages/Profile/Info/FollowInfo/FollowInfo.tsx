import classes from './FollowInfo.module.css';

type FollowInfoProps = {
  isAuth: boolean;
  followers_count: number;
  following_count: number;
  setUsersModalFor(value: 'followers' | 'following' | false): void;
};

const FollowInfo = (props: FollowInfoProps) => {
  const openModalWindow = (windowFor: 'followers' | 'following') => {
    if (props.isAuth) {
      if (windowFor == 'followers') {
        props.setUsersModalFor('followers');
      } else if (windowFor == 'following') {
        props.setUsersModalFor('following');
      }
    }
  };

  return (
    <div className={classes.follow_info}>
      <div
        onClick={() => openModalWindow('followers')}
        className={classes.followers}
      >
        <p>Подписчики</p>
        <h2>{props.followers_count}</h2>
      </div>
      <div
        onClick={() => openModalWindow('following')}
        className={classes.following}
      >
        <p>Подписки</p>
        <h2>{props.following_count}</h2>
      </div>
    </div>
  );
};

export default FollowInfo;
