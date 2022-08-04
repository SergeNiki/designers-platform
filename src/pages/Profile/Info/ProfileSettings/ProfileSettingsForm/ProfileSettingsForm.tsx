import classes from './ProfileSettingsForm.module.css';
import * as Yup from 'yup';
import { FormElement } from '../../../../../types/form';
import Form from '../../../../../components/Form/Form';
import { connect } from 'react-redux';
import { updateProfileData } from './../../../../../redux/profile-reducer'
import { UpdateProfileType } from '../../../../../types/profile';

type SettingsFormProps = {
  username: string
  display_name: string
  bio: string

  closeWindow(value: false): void;
  updateProfileData(data: UpdateProfileType): void
};

const ProfileSettingsForm = (props: SettingsFormProps) => {
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Это поле не может быть пустым!')
      .min(3, 'Минимальное количесвто символов: 3!')
      .max(20, 'Максимальное количесво символов: 20!'),
    display_name: Yup.string()
      .required('Это поле не может быть пустым!')
      .min(3, 'Минимальное количесвто символов: 3!')
      .max(20, 'Максимальное количесво символов: 20!'),
    bio: Yup.string().max(200, 'Максимальное количесво символов: 200!'),
  });

  const onSubmit = (data: UpdateProfileType) => {
    props.updateProfileData(data);
    props.closeWindow(false)
  };

  const formElements: Array<FormElement> = [
    {
      tag: 'input',
      id: 'username',
      label: 'Username',
      defaultvalue: props.username 
    },
    {
      tag: 'input',
      id: 'display_name',
      label: 'Display Name',
      defaultvalue: props.display_name 
    },
    {
      tag: 'textarea',
      id: 'bio',
      label: 'About Me',
      defaultvalue: props.bio 
    },
  ]

  return (
    <Form onSubmit={onSubmit}
    textBtn='Сохранить'
    formElements={formElements}
    validSchema={validationSchema} />
  );
};

export default connect(()=>({}), {
  updateProfileData
})(ProfileSettingsForm);
