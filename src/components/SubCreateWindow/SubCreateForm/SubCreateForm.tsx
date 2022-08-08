import * as Yup from 'yup';
import { SubscriptionData } from '../../../types/subscriptions';
import React from 'react';
import { FormElement } from '../../../types/form';
import Form from '../../Form/Form';
import { connect } from 'react-redux';
import { StateType } from '../../../redux/redux-store';
import { creatingSubscription } from '../../../redux/subscriptions-reducer';
import { checkImage } from '../../../redux/image-reducer';
import SubCoverDownload from '../SubCoverDownload/SubCoverDownload';

type SubCreateFormProps = {
  imageFile: File | null;
  coverPreview: string;
  checkImage(
    event: React.ChangeEvent<HTMLInputElement>,
    maxSize: number,
    isSuccess: React.Dispatch<React.SetStateAction<boolean>>
  ): void;
  creatingSubscription(data: SubscriptionData): void;

  closeWindow(value: false): void;
};

type SubForm = {
  sub_name: string;
  sub_description: string;
  sub_price: string;
};

const SubCreateForm = (props: SubCreateFormProps) => {
  const validationSchema = Yup.object().shape({
    sub_name: Yup.string()
      .required('У подписки должно быть название!')
      .min(3, 'Название подписки не может содержать менее 3 символов')
      .max(40, 'Название подписки не может содержать более 40 символов'),
    sub_description: Yup.string()
      .required('У подписки должно быть описание!')
      .min(3, 'Описание не может содержать менее 3 символов!')
      .max(2000, 'Описание не может содержать более 2000 символов!'),
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

  const extraElement = (
    <SubCoverDownload
      coverPreview={props.coverPreview}
      checkImage={props.checkImage}
    />
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
