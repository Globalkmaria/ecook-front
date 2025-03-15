import { memo, useCallback } from 'react';

import { getRandomId } from '@/utils/generateId';

import { AddButton } from '../buttons';
import style from '../style.module.scss';
import RecipeStepsContent, { Step } from './RecipeStepsContent';

interface Props {
  steps: Step[];
  setSteps: React.Dispatch<React.SetStateAction<Step[]>>;
}

function RecipeSteps({ steps, setSteps }: Props) {
  const onAddStep = useCallback(
    () =>
      setSteps((preSteps) => [...preSteps, { id: getRandomId(), value: '' }]),
    [setSteps],
  );

  return (
    <div className={style.box}>
      <h3>Steps*</h3>
      <div className={style.box__content}>
        <RecipeStepsContent steps={steps} setSteps={setSteps} />
        <AddButton onClick={onAddStep}>Add a step</AddButton>
      </div>
    </div>
  );
}

export default memo(RecipeSteps);
