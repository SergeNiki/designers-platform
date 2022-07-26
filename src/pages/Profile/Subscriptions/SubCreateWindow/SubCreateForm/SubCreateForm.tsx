import { SubmitHandler, useForm } from 'react-hook-form';
import classes from './SubCreateForm.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Button from '../../../../../components/Button/Button';
import { SubscriptionData } from '../../../../../types/subscriptions';
import { useState } from 'react';

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
  const [imageFile, setImageFile] = useState<FormData>()
  const [coverPreview, setCoverPreview] = useState<string>('')

  const validationSchema = Yup.object().shape({
    sub_name: Yup.string()
      .required('У подписки должно быть название!')
      .min(3, 'Название подписки не может содержать менее 3 символов')
      .max(20, 'Название подписки не может содержать более 20 символов'),
    sub_description: Yup.string()
      .required('У подписки должно быть описание!')
      .min(3, 'Описание не может содержать менее 3 символов!')
      .max(500, 'Описание не может содержать более 500 символов!'),
    sub_price: Yup.string()
      .required('Это поле не может быть пустым!')
      .matches(/^[0-9]+$/, 'Стоимость подписки может содержать только числа!')
      .test(
        'min',
        'Минимальная стоимость подписки начинается с 15 рублей!',
        (price) => Number(price) >= 15
      )
      .test(
        'max',
        'Максимальная стоимость не может превышать 100000 рублей!',
        (price) => Number(price) <= 100000
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<SubForm>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });
  const onSubmit: SubmitHandler<SubForm> = (data) => {
    console.log(imageFile!.get('image'))
    props.creatingSubscription({
      description: data.sub_description,
      image: imageFile!.get('image'),
      name: data.sub_name,
      price: data.sub_price,
      price_currency: "RUB"})
    reset();
  };

  const uploadImage = (e: any) => {
    e.preventDefault()
    setCoverPreview('')
    let fileInput = document.getElementById('sub_image')
    fileInput?.click()
  }

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files?.length) {
      const file = e.currentTarget.files[0];
      if (file.type == 'image/jpeg') {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend = function(e) {
          setCoverPreview(String(this.result))
        }
        const formData = new FormData();
        formData.append("image", file)
        setImageFile(formData);
      } else {
        alert('Неподходящий тип или формат файла!');
      }
    }
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
        <label>Обложка подписки</label>
        <input style={{display: 'none'}} id="sub_image" type="file" {...register('sub_image')} onChange={handleImageFile} />
        {coverPreview !== '' ? <img src={coverPreview} alt='обложка' className={classes.cover_preview} /> : <></>}
        <Button 
          isDisabled={false}
          backgroundColor={'#f0f0f0'}
          hoverBackgroundColor={'#67c598'}
          buttonSize='medium'
          handleClick={uploadImage} >{coverPreview ? 'Изменить' : 'Добавить обложку'}
        </Button>
        {/* <div className={classes.error_message}>{errors.sub_image?.message}</div> */}
      </div>
      <div className={classes.sub_description + ' ' + classes.form_item}>
        <label htmlFor="sub_description">Описание подписки</label>
        <textarea
          id="sub_description"
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
      <div className={classes.btn_wrap}>
        <Button
          isDisabled={!isValid || !coverPreview}
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
