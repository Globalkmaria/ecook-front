import { useCallback, useState } from 'react';

import { RecipeDetail } from '@/services/recipe/type';

import CheckboxList from '@/components/CheckboxList';
import { getListCheckboxInitialState } from '@/components/helpers';

function StepList({ steps }: { steps: RecipeDetail['steps'] }) {
  const [stepsChecked, setStepsChecked] = useState(
    getListCheckboxInitialState(steps),
  );
  const onStepsToggle = useCallback(
    (id: number) => setStepsChecked((prev) => ({ ...prev, [id]: !prev[id] })),
    [],
  );

  return (
    <CheckboxList state={stepsChecked} items={steps} onChange={onStepsToggle} />
  );
}

export default StepList;
