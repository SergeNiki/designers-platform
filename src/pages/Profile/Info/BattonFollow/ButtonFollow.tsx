import Button from "../../../../components/Button/Button";
import { RequestFollowType } from "../../../../types/profile";

type ButtonFollowProps = {
    isFollowed: boolean
    isAuth: boolean
    isOwner: boolean
    isFetching: boolean
    ownerUserId: number
    toggleLoginTC(): void
    toggleFollow(id: number, value: RequestFollowType): void
}

const ButtonSub = (props:ButtonFollowProps) => {
    const toggleFollow = () => {
        //follow and unfollow action
        if (props.isFollowed) {
          props.toggleFollow(props.ownerUserId, 'unfollow');
        } else {
          props.toggleFollow(props.ownerUserId, 'follow');
        }
      };

      //show follow button
    if (!props.isAuth) {
      return (
        <Button
          handleClick={props.toggleLoginTC}
          isDisabled={false}
          buttonSize={'large'}
        >
          Подписаться
        </Button>
      );
    } else if (props.isAuth && !props.isOwner) {
      return (
        <Button
          isDisabled={props.isFetching}
          handleClick={toggleFollow}
          backgroundColor={props.isFollowed ? '#C4C4C4' : '#6DEFC0' }
          buttonSize={'large'}
        >
          {props.isFollowed ? 'Отписаться' : 'Подписаться'}
        </Button>
      );
    }
    else return <></>
}

export default ButtonSub