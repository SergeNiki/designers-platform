import React, { useState } from 'react';
import classes from './DateTimeOfPublication.module.css';

type DateTimeOfPublicationProps = {};

const DateTimeOfPublication: React.FC<DateTimeOfPublicationProps> = (props) => {
  const [isDatetime, setIsDatetime] = useState<boolean>(false);

  const showDatetimeInput = (e: React.MouseEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
    
    if (e.currentTarget.value == 'postLater') {
      setIsDatetime(true);
    } else setIsDatetime(false);
  };

  return (
    <div className={classes.datetime_block}>
      <div className={classes.radio_inputs_wrap}>
        <label>
          <input
            type='radio'
            name='datetime'
            value={'postNow'}
            onClick={showDatetimeInput}
          />
          Опубликовать сразу
        </label>
        <label>
          <input
            type='radio'
            name='datetime'
            value={'postLater'}
            onClick={showDatetimeInput}
          />
          Опубликовать по времени
        </label>
      </div>
      {isDatetime && (
        <div className={classes.datetime_wrap} >
          <input type='datetime-local' />
        </div>
      )}
    </div>
  );
};

export default DateTimeOfPublication;
