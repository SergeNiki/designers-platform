import classes from './LevelsSubscriptions.module.css';
import { SubData } from '../../../types/subscriptions';
import { UpdatePostRequest } from '../../../types/posts';

type LevelsSubscriptionsProps = {
    postId: number
  subscriptions: Array<SubData>;
  updatePost(
    postId: number,
    data: UpdatePostRequest
  ): void;
};

const LevelsSubscriptions: React.FC<LevelsSubscriptionsProps> = (props) => {
  let levelsSub = props.subscriptions.map((subscription) => (
    <option key={subscription.id} value={subscription.id}>
      {subscription.name}
    </option>
  ));
  levelsSub.unshift(<option key={0} value={0}>Доступно всем пользователям</option>);

  const chooseLevelSub = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const select = event.currentTarget
    const subId = Number(select.options[select.selectedIndex].value)
    if (subId) {
        props.updatePost(props.postId, {level_subscription: subId})
    } else props.updatePost(props.postId, {level_subscription: null})
  }

  return (
    <div className={classes.levels_wrap}>
      <label htmlFor={classes.levels_sub}>
        Укажите уровень доступа данного поста
      </label>
      <select id={classes.levels_sub} name='level' onChange={chooseLevelSub} >
        {levelsSub}
      </select>
    </div>
  );
};

export default LevelsSubscriptions;
