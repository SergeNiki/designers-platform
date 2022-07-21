import { SubmitHandler, useForm } from 'react-hook-form';
import classes from './SubCreateForm.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { maxHeaderSize } from 'http';
import Button from '../../../../../components/Button/Button';

type SubCreateFormProps = {};

type SubForm = {
  sub_name: string;
  sub_image: any;
  sub_description: string;
  sub_price: string;
};

const SubCreateForm = (props: SubCreateFormProps) => {
  const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

  const validationSchema = Yup.object().shape({
    sub_name: Yup.string()
      .required('У подписки должно быть название!')
      .min(3, 'Название подписки не может содержать менее 3 символов')
      .max(20, 'Название подписки не может содержать более 20 символов'),
    // sub_image: Yup.mixed()
    //   .required('У подписки должна быть обложка!')
    //   .test(
    //     'Fichier taille',
    //     'Файл слишком большой',
    //     (value) => !value || (value && value.size <= 1024 * 1024)
    //   )
    //   .test(
    //     'format',
    //     'Формат файла не подходит!',
    //     (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
    //   ),
    sub_description: Yup.string()
      .required('У подписки должно быть описание!')
      .min(3, 'Описание не может содержать менее 3 символов!')
      .max(200, 'Описание не может содержать более 200 символов!'),
    sub_price: Yup.string()
      .required('Стоимость подписки не может содержать менее одного символа!')
      .matches(/^[0-9]+$/, 'Стоимость подписки может содержать только числа!')
      .test(
        '',
        'Максимальная стоимость не может превышать 99999 рублей!',
        (price) => Number(price) < 100000
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SubForm>({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit: SubmitHandler<SubForm> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.sub_form}>
      <div className={classes.sub_name + ' ' + classes.form_item}>
        <label htmlFor="sub_name">Название подписки</label>
        <input
          id="sub_name"
          type="text"
          placeholder="Введите название"
          {...register('sub_name')}
        />
        <div>{errors.sub_name?.message}</div>
      </div>
      <div className={classes.sub_image + ' ' + classes.form_item}>
        <label htmlFor="sub_image">Обложка подписки</label>
        <input id="sub_image" type="file" {...register('sub_image')} />
        {/* <div>{errors.sub_image?.message}</div> */}
      </div>
      <div className={classes.sub_description + ' ' + classes.form_item}>
        <label htmlFor="sub_description">Описание подписки</label>
        <input
          id="sub_description"
          type="text"
          placeholder="Введите описание"
          {...register('sub_description')}
        />
        <div>{errors.sub_description?.message}</div>
      </div>
      <div className={classes.sub_price + ' ' + classes.form_item}>
        <label htmlFor="sub_price">Месячная стоимость (в руб.)</label>
        <input
          id="sub_price"
          type="text"
          placeholder="Введите стоимость"
          {...register('sub_price')}
        />
        <div>{errors.sub_price?.message}</div>
      </div>
      {/* <button disabled={!errors} type="submit">Создать</button> */}
      <div className={classes.btn_wrap}>
        <Button
          isDisabled={false}
          backgroundColor={'#6DEFC0'}
          hoverBackgroundColor={'#67c598'}
          width='210px'
          handleClick={() => {}}
        >
          Создать
        </Button>
      </div>
    </form>
  );
};

export default SubCreateForm;
