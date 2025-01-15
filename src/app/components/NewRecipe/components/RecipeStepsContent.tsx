import { ChangeEventHandler, memo } from 'react';

import style from './style.module.scss';

import { Input } from '@/components/Input';
import { RemoveButton } from './buttons';

export interface Step {
  id: string;
  value: string;
}

export interface StepsProps {
  steps: Step[];
  onRemove: (id: string) => void;
  onChange: (id: string, fieldName: string, value: string) => void;
}

function RecipeStepsContent({ steps, onRemove, onChange }: StepsProps) {
  return (
    <ol className={style.steps}>
      {steps.map((item) => (
        <Step
          key={item.id}
          item={item}
          onRemove={onRemove}
          onChange={onChange}
        />
      ))}
    </ol>
  );
}

export default memo(RecipeStepsContent);

interface StepProps {
  item: Step;
  onRemove: (id: string) => void;
  onChange: (id: string, fieldName: string, value: string) => void;
}

function Step({ item, onRemove, onChange }: StepProps) {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    onChange(item.id, 'value', e.target.value);

  return (
    <li className={style.step}>
      <Input
        className={style['step__value']}
        onChange={handleChange}
        placeholder='Write a step...'
        type='text'
        id='value'
        name='value'
        value={item.value}
      />
      <RemoveButton onClick={() => onRemove(item.id)} />
    </li>
  );
}
