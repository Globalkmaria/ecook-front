import { ChangeEventHandler, memo } from 'react';

import { validateMinutes } from '@/utils/time';
import {
  validatePositiveInteger,
  validateWithAlertAndExecute,
} from '@/utils/validation';

import { Input } from '@/components/Input';

import { TextInputs } from '.';
import style from './style.module.scss';

interface RecipeTimeProps {
  textInputs: TextInputs;
  setTextInputs: React.Dispatch<React.SetStateAction<TextInputs>>;
}

function RecipeTime({ textInputs, setTextInputs }: RecipeTimeProps) {
  const onHoursChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    validateWithAlertAndExecute(
      validatePositiveInteger,
      'Please enter a valid time',
      value,
      () => setTextInputs((prev) => ({ ...prev, [name]: value })),
    );
  };

  const onMinusesChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    validateWithAlertAndExecute(
      validateMinutes,
      'Please enter a valid time',
      value,
      () => setTextInputs((prev) => ({ ...prev, [name]: value })),
    );
  };

  return (
    <div className={style.box}>
      <label htmlFor='time'>
        <h3>Time</h3>
      </label>
      <div className={style.time}>
        <div className={style['time-item']}>
          Hours:
          <Input
            id='hours'
            name='hours'
            onChange={onHoursChange}
            value={textInputs.hours}
          />
        </div>
        <div className={style['time-item']}>
          Minutes:
          <Input
            id='minutes'
            name='minutes'
            onChange={onMinusesChange}
            value={textInputs.minutes}
          />
        </div>
      </div>
    </div>
  );
}

export default memo(RecipeTime);
