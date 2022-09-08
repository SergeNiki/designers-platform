import { faCirclePlus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import Dropdown from '../../Dropdown/Dropdown';
import ModalWindow from '../../ModalWindow/ModalWindow';
import PostCreateWindow from '../../PostCreateForm/PostCreateForm';
import SubCreateForm from '../../SubCreateWindow/SubCreateForm/SubCreateForm';
import classes from './AddContextMenu.module.css';

type AddContextMenuProps = {
  coordsData: DOMRect;
  closeMenu(value: false): void;
};

const AddContextMenu: React.FC<AddContextMenuProps> = (props) => {
  const [isSubCreateWindow, setIsSubCreateWindow] = useState<boolean>(false);
  const [isPostCreateWindow, setIsPostCreateWindow] = useState<boolean>(false);

  const openSubCreateWindow = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsSubCreateWindow(true);
  };
  const openPostCreateWindow = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsPostCreateWindow(true);
  };

  const subHeader = <h2>Создание подписки</h2>;
  const postHeader = <h2>Создание поста</h2>;

  return (
    <>
      {isSubCreateWindow && (
        <ModalWindow
          closeWindow={() => setIsSubCreateWindow(false)}
          header={subHeader}>
          <SubCreateForm closeWindow={() => setIsSubCreateWindow(false)} />
        </ModalWindow>
      )}
      {isPostCreateWindow && (
        <ModalWindow
          closeWindow={() => setIsPostCreateWindow(false)}
          header={postHeader}>
            <PostCreateWindow/>
        </ModalWindow>
      )}
      <Dropdown
        coordsData={props.coordsData}
        closeDropdownMwnu={() => props.closeMenu(false)}>
        <div
          className={classes.create_menu_item}
          onClick={openPostCreateWindow}>
          <FontAwesomeIcon icon={faPlus} />
          <p>Создать пост</p>
        </div>
        <div className={classes.create_menu_item} onClick={openSubCreateWindow}>
          <FontAwesomeIcon icon={faCirclePlus} />
          <p>Создать подписку</p>
        </div>
      </Dropdown>
    </>
  );
};

export default AddContextMenu;
