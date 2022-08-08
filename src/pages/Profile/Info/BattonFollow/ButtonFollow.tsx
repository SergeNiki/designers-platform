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
          styles={{'width': '210px', 'height': '45px', 'fontSize': '20px'}}
        >
          Подписаться
        </Button>
      );
    } else if (props.isAuth && !props.isOwner) {
      return (
        <Button
          isDisabled={props.isFetching}
          handleClick={toggleFollow}
          styles={{'backgroundColor': props.isFollowed ? '#C4C4C4' : '#6DEFC0', 
          'width': '210px', 'height': '45px', 'fontSize': '20px'}}
        >
          {props.isFollowed ? 'Отписаться' : 'Подписаться'}
        </Button>
      );
    }
    else return <></>
}

export default ButtonSub