import style from './style.module.scss';

import { ChangeEventHandler, useCallback } from 'react';

import {
  validatePositiveInteger,
  validateWithAlertAndExecute,
} from '@/utils/validation';
import { validateMinutes } from '@/utils/time';

import { Input } from '@/components/Input';

import { TextInputs } from '.';

interface RecipeTimeProps {
  textInputs: TextInputs;
  setTextInputs: React.Dispatch<React.SetStateAction<TextInputs>>;
}

function RecipeTime({ textInputs, setTextInputs }: RecipeTimeProps) {
  const onHoursChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const { name, value } = e.target;

      validateWithAlertAndExecute(
        validatePositiveInteger,
        'Please enter a valid time',
        value,
        () => setTextInputs((prev) => ({ ...prev, [name]: value })),
      );
    },
    [],
  );

  const onMinusesChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const { name, value } = e.target;

      validateWithAlertAndExecute(
        validateMinutes,
        'Please enter a valid time',
        value,
        () => setTextInputs((prev) => ({ ...prev, [name]: value })),
      );
    },
    [],
  );

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

export default RecipeTime;
