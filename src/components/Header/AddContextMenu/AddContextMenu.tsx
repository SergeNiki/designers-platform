import { faCirclePlus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import Dropdown from '../../Dropdown/Dropdown';
import ModalWindow from '../../ModalWindow/ModalWindow';
import SubCreateForm from '../../SubCreateWindow/SubCreateForm/SubCreateForm';
import classes from './AddContextMenu.module.css';

type AddContextMenuProps = {
  coordsData: DOMRect;
  closeMenu(value: false): void;
};

const AddContextMenu: React.FC<AddContextMenuProps> = (props) => {
  const [isSubCreateWindow, setIsSubCreateWindow] = useState<boolean>(false);

  const openSubCreateWindow = () => {
    setIsSubCreateWindow(true);
  };

  const header = <h2>Создание подписки</h2>;

  return (
    <>
      {isSubCreateWindow && (
        <ModalWindow closeWindow={() => setIsSubCreateWindow(false)} header={header}>
          <SubCreateForm closeWindow={() => setIsSubCreateWindow(false)} />
        </ModalWindow>
      )}
      <Dropdown
        coordsData={props.coordsData}
        closeDropdownMwnu={() => props.closeMenu(false)}
      >
        <div className={classes.create_menu_item}>
            <FontAwesomeIcon icon={faPlus}/>
          <p>Создать пост</p>
        </div>
        <div className={classes.create_menu_item} onClick={openSubCreateWindow} >
            <FontAwesomeIcon icon={faCirclePlus}/>
          <p>Создать подписку</p>
        </div>
      </Dropdown>
    </>
  );
};

export default AddContextMenu;
