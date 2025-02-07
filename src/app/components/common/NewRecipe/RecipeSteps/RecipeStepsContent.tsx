import { ChangeEventHandler, memo, useCallback } from 'react';

import style from './RecipeStepsContent.module.scss';

import { Input } from '@/components/Input';

import { validateLengthAndExecute } from '@/utils/validation';
import { onFieldChange } from '../helper';
import { RemoveButton } from '../buttons';

export interface Step {
  id: string;
  value: string;
}

export interface StepsProps {
  steps: Step[];
  setSteps: React.Dispatch<React.SetStateAction<Step[]>>;
}

function RecipeStepsContent({ steps, setSteps }: StepsProps) {
  const onRemove = useCallback(
    (id: string) => {
      if (steps.length === 1) return;
      setSteps((preSteps) => preSteps.filter((item) => item.id !== id));
    },
    [setSteps, steps.length],
  );

  const onChange = useCallback(
    (id: string, fieldName: string, value: string) => {
      validateLengthAndExecute(150, 'Step', value, () =>
        onFieldChange(setSteps, id, fieldName, value),
      );
    },
    [setSteps],
  );
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

const Step = memo(function Step({ item, onRemove, onChange }: StepProps) {
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
});
