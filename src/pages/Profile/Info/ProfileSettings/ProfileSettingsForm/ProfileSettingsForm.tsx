import classes from './ProfileSettingsForm.module.css';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '../../../../../components/Button/Button';

type SettingsFormProps = {
  closeWindow(value: false): void;
};

type ProfileForm = {
  username: string;
  display_name: string;
  bio: string;
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

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ProfileForm>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ProfileForm> = (data) => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.profile_form}>
      <div>
        <label htmlFor="pofile_form_username"></label>
        <input
          type="text"
          id="pofile_form_username"
          {...register('username')}
        />
      </div>
      <div>
        <label htmlFor="pofile_form_display_name"></label>
        <input
          type="text"
          id="pofile_form_display_name"
          {...register('display_name')}
        />
      </div>
      <div>
        <label htmlFor="pofile_form_bio"></label>
        <input type="text" id="pofile_form_bio" {...register('bio')} />
      </div>
      <div>
        <Button
          isDisabled={false}
          hoverBackgroundColor={'#67c598'}
          buttonSize="medium"
        >
          Сохранить
        </Button>
      </div>
    </form>
  );
};

export default ProfileSettingsForm;
