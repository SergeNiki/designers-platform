import classes from './ModalHeader.module.css';

type ModalHeaderProps = {
  children: React.ReactNode;
};

const ModalHeader = (props: ModalHeaderProps) => {
  return (
    <div className={classes.modal_header}>
      {props.children}
    </div>
  );
};

export default ModalHeader;
