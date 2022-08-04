import classes from './Form.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormElement, FormInputs } from '../../types/form';
import { useMemo } from 'react';
import Button from '../Button/Button';

type FormProps = {
  formElements: Array<FormElement>;
  extraElements?: Array<{ index: number; id: string; element: JSX.Element }>;
  extraDependence?: boolean
  textBtn: string
  validSchema: any;
  onSubmit(data: FormInputs): void;
};

const Form = (props: FormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormInputs>({
    mode: 'onChange',
    resolver: yupResolver(props.validSchema),
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    props.onSubmit(data);
    reset();
  };

  const kindOfTag = (el: FormElement) => {
    if (el.tag == 'input') {
      return (
        <input
          id={el.id}
          type={el?.type}
          placeholder={el.placeholder}
          defaultValue={el?.defaultvalue}
          {...register(el.id)}
        />
      );
    } else if (el.tag == 'textarea') {
      return (
        <textarea
          id={el.id}
          placeholder={el.placeholder}
          defaultValue={el?.defaultvalue}
          {...register(el.id)}
        />
      );
    }
  };

  let elements = useMemo(() => {
    return props.formElements.map((el) => (
      <div key={el.id} className={`${classes[el.id]} ${classes.form_item}`}>
        <label htmlFor={el.id}>{el.label}</label>
        {kindOfTag(el)}
        {el?.jsxElement}
        {errors[el.id] && (
          <div className={classes.error_message}>{errors[el.id]?.message}</div>
        )}
      </div>
    ));
  }, [{ ...errors }]);

  if (props.extraElements) {
    for (let el of props.extraElements) {
      elements.splice(
        el.index,
        0,
        <div key={el.id} className={`${classes.form_item}`}>
          {el.element}
        </div>
      );
    }
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      {elements}
      <div className={classes.btn_wrap}>
        <Button
          isDisabled={!isValid || !!props.extraDependence}
          hoverBackgroundColor={'#67c598'}
          buttonSize="medium"
        >
          {props.textBtn}
        </Button>
      </div>
    </form>
  );
};

export default Form;
