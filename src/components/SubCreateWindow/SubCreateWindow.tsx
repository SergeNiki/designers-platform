import ModalWindow from '../ModalWindow/ModalWindow';
import { connect } from 'react-redux';
import { clearImageState } from '../../redux/image-reducer';
import { useEffect } from 'react';

type SubCreateWindowProps = {
  children: React.ReactNode
  setIsCreateWindow(value: false): void;
  clearImageState(): void;
};

const SubCreateWindow = (props: SubCreateWindowProps) => {
  useEffect(() => {
    return () => props.clearImageState();
  });

  const header = <h2>Редактирование подписки</h2>;

  return (
    <ModalWindow closeWindow={props.setIsCreateWindow} header={header}>
      {props.children}
    </ModalWindow>
  );
};

export default connect(() => ({}), {
  clearImageState,
})(SubCreateWindow);
