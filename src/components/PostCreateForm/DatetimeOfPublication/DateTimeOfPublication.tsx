import React, { useEffect, useState } from 'react';
import classes from './DateTimeOfPublication.module.css';

type DatetimeOfPublicationProps = {
  errorMessage: string;
  setIsPublishNow(isPublishNow: boolean): void;
  setIsValid(isValid: boolean): void;
  checkSelectedDatetime(date: Date): boolean;
};

const DatetimeOfPublication: React.FC<DatetimeOfPublicationProps> = (props) => {
  const [isCheckedInput, setIsCheckedInput] = useState<boolean>(false);
  const [isDatetime, setIsDatetime] = useState<boolean>(false);
  const [nowDate, setNowDate] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  useEffect(() => {
    if (isCheckedInput) {
      props.setIsPublishNow(false);

      if (selectedDate && selectedTime) {
        let selectedDatetime = new Date(`${selectedDate}, ${selectedTime}`);
        props.checkSelectedDatetime(selectedDatetime);
      } else {
        props.setIsValid(false);
      }
    } else {
      setIsDatetime(false);
      props.setIsPublishNow(true);
    }
  }, [isCheckedInput, selectedDate, selectedTime]);

  const showDatetimeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckedInput(e.currentTarget.checked);
    let today = new Date();
    let now = today.toLocaleString();
    let date = now
      .slice(0, now.indexOf(','))
      .replace(/\./g, '-')
      .split('-')
      .reverse()
      .join('-');
    setNowDate(date);
    setIsDatetime(true);
  };

  const dateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };
  const timeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(e.target.value);
  };

  return (
    <>
      <div className={classes.datetime_block}>
        <div className={classes.checkbox_input_wrap}>
          <input
            type='checkbox'
            id={classes.checkbox_input}
            checked={isCheckedInput}
            onChange={showDatetimeInputs}
          />
          <label
            htmlFor={classes.checkbox_input}
            className={classes.label_checkbox}>
            Опубликовать по времени
          </label>
        </div>
        <div className={classes.datetime_wrap}>
          <input
            type='date'
            min={nowDate}
            disabled={!isDatetime}
            onChange={dateInputChange}
          />
          <input
            type='time'
            disabled={!isDatetime}
            onChange={timeInputChange}
          />
        </div>
      </div>
      {isCheckedInput && (
        <p className={classes.error_message}>{props.errorMessage}</p>
      )}
    </>
  );
};

export default DatetimeOfPublication;
