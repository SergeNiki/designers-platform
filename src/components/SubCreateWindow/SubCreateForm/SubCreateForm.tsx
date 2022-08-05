import classes from './SubCreateForm.module.css';
import * as Yup from 'yup';
import Button from '../../Button/Button';
import { SubscriptionData } from '../../../types/subscriptions';
import React, { useState } from 'react';
import { FormElement } from '../../../types/form';
import Form from '../../Form/Form';
import { connect } from 'react-redux';
import { StateType } from '../../../redux/redux-store';
import { creatingSubscription } from '../../../redux/subscriptions-reducer';
import { checkImage } from '../../../redux/image-reducer';

type SubCreateFormProps = {
  imageFile: File | null;
  coverPreview: string;
  checkImage(event: React.ChangeEvent<HTMLInputElement>, isSuccess: React.Dispatch<React.SetStateAction<boolean>>): void;
  creatingSubscription(data: SubscriptionData): void;
  
  closeWindow(value: false): void;
};

type SubForm = {
  sub_name: string;
  sub_description: string;
  sub_price: string;
};

const SubCreateForm = (props: SubCreateFormProps) => {
  const [isLoadImage, setIsLoadImage] = useState<boolean>(false)

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

  const onSubmit = (data: SubForm) => {
    props.creatingSubscription({
      description: data.sub_description,
      image: props.imageFile,
      name: data.sub_name,
      price: data.sub_price,
      price_currency: 'RUB',
    });
    props.closeWindow(false);
  };

  const uploadImage = (e: any) => {
    e.preventDefault();
    let fileInput = document.getElementById(classes.sub_image);
    fileInput?.click();
  };

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.checkImage(e, setIsLoadImage);
  };

  const extraElement = (
    <>
      <label>Обложка подписки</label>
      <input id={classes.sub_image} type="file" onChange={handleImageFile} />
      {(props.coverPreview && isLoadImage) ? (
        <img
          src={props.coverPreview}
          alt="обложка"
          className={classes.cover_preview}
        />
      ) : (
        <></>
      )}
      <Button
        isDisabled={false}
        backgroundColor={'#f0f0f0'}
        hoverBackgroundColor={'#67c598'}
        buttonSize="medium"
        handleClick={uploadImage}
      >
        {props.coverPreview ? 'Изменить' : 'Добавить обложку'}
      </Button>
    </>
  );

  const formElements: Array<FormElement> = [
    {
      tag: 'input',
      id: 'sub_name',
      type: 'text',
      label: 'Название подписки',
      placeholder: 'Введите название',
    },
    {
      tag: 'textarea',
      id: 'sub_description',
      label: 'Описание подписки',
      placeholder: 'Введите описание',
    },
    {
      tag: 'input',
      id: 'sub_price',
      type: 'text',
      label: 'Месячная стоимость (в руб.)',
      placeholder: 'Введите стоимость',
    },
  ];

  return (
    <Form
      onSubmit={onSubmit}
      textBtn="Создать"
      formElements={formElements}
      validSchema={validationSchema}
      extraDependence={!props.imageFile}
      extraElements={[{ index: 1, id: 'sub_image', element: extraElement }]}
    />
  );
};

let mapSateToProps = (state: StateType) => ({
  imageFile: state.image.imageFile,
  coverPreview: state.image.coverPreview,
});

export default connect(mapSateToProps, {
  checkImage,
  creatingSubscription,
})(SubCreateForm);
