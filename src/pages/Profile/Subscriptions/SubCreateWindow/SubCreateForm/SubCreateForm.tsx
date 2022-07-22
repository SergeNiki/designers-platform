import { SubmitHandler, useForm } from 'react-hook-form';
import classes from './SubCreateForm.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { maxHeaderSize } from 'http';
import Button from '../../../../../components/Button/Button';
import { SubscriptionData } from '../../../../../types/subscriptions';

type SubCreateFormProps = {
  creatingSubscription(data: SubscriptionData): void
};

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
    sub_image: Yup.mixed()
      .test('required', "You need to provide a file", (value) =>{
        return value && value.length
      } )
      .test("fileSize", "The file is too large", (value, context) => {
        return value && value[0] && value[0].size <= 200000;
      })
      .test("type", "We only support jpeg", function (value) {
        return value && value[0] && value[0].type === "image/jpeg";
      }),
    sub_description: Yup.string()
      .required('У подписки должно быть описание!')
      .min(3, 'Описание не может содержать менее 3 символов!')
      .max(500, 'Описание не может содержать более 500 символов!'),
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
    const formData = new FormData();
    formData.append("iamge", data.sub_image)
    // props.creatingSubscription({
    //   description: data.sub_description,
    //   image: data.sub_image,
    //   name: data.sub_name,
    //   price: data.sub_price,
    //   price_currency: "RUB"})
    console.log(data);
    reset();
  };

  const uploadImage = (e: any) => {
    e.preventDefault()
    let fileInput = document.getElementById('sub_image')
    fileInput?.click()
  }

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
        <div className={classes.error_message}>{errors.sub_name?.message}</div>
      </div>
      <div className={classes.sub_image + ' ' + classes.form_item}>
        <label htmlFor="sub_image">Обложка подписки</label>
        <input style={{display: 'none'}} id="sub_image" type="file" {...register('sub_image')} />
        <Button 
          isDisabled={false}
          backgroundColor={'#f0f0f0'}
          hoverBackgroundColor={'#67c598'}
          buttonSize='medium'
          handleClick={uploadImage} >Добавить обложку</Button>
        {/* <div className={classes.error_message}>{errors.sub_image?.message}</div> */}
      </div>
      <div className={classes.sub_description + ' ' + classes.form_item}>
        <label htmlFor="sub_description">Описание подписки</label>
        <textarea
          id="sub_description"
          // type="text"
          placeholder="Введите описание"
          {...register('sub_description')}
        />
        <div className={classes.error_message}>{errors.sub_description?.message}</div>
      </div>
      <div className={classes.sub_price + ' ' + classes.form_item}>
        <label htmlFor="sub_price">Месячная стоимость (в руб.)</label>
        <input
          id="sub_price"
          type="text"
          placeholder="Введите стоимость"
          {...register('sub_price')}
        />
        <div className={classes.error_message}>{errors.sub_price?.message}</div>
      </div>
      {/* <button disabled={!errors} type="submit">Создать</button> */}
      <div className={classes.btn_wrap}>
        <Button
          isDisabled={false}
          backgroundColor={'#6DEFC0'}
          hoverBackgroundColor={'#67c598'}
          buttonSize='medium'
          handleClick={() => {}}
        >
          Создать
        </Button>
      </div>
    </form>
  );
};

export default SubCreateForm;
