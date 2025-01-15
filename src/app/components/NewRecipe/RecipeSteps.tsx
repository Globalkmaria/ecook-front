import { useCallback } from 'react';

import style from './style.module.scss';

import { getRandomId } from '@/utils/generateId';
import { validateLengthAndExecute } from '@/utils/validation';

import { onFieldChange } from '@/app/recipes/new/helper';
import Steps, { Step } from './components/Steps';
import { AddButton } from './components/buttons';

interface Props {
  steps: Step[];
  setSteps: React.Dispatch<React.SetStateAction<Step[]>>;
}

function RecipeSteps({ steps, setSteps }: Props) {
  const onAddStep = () =>
    setSteps((preSteps) => [...preSteps, { id: getRandomId(), value: '' }]);

  const onRemoveStep = useCallback(
    (id: string) =>
      setSteps((preSteps) => preSteps.filter((item) => item.id !== id)),
    [setSteps],
  );
  const onStepChange = useCallback(
    (id: string, fieldName: string, value: string) => {
      validateLengthAndExecute(150, 'Step', value, () =>
        onFieldChange(setSteps, id, fieldName, value),
      );
    },
    [setSteps],
  );

  return (
    <div className={style.box}>
      <h3>Steps*</h3>
      <div className={style.box__content}>
        <Steps steps={steps} onRemove={onRemoveStep} onChange={onStepChange} />
        <AddButton onClick={onAddStep}>Add a step</AddButton>
      </div>
    </div>
  );
}

export default RecipeSteps;
