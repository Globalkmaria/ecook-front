import { useCallback, useState } from 'react';

import { RecipeDetail } from '@/services/recipe/type';

import CheckboxList from '@/components/CheckboxList';

interface Props {
  state: [
    Record<string, boolean>,
    React.Dispatch<React.SetStateAction<Record<string, boolean>>>,
  ];
  steps: RecipeDetail['steps'];
}

function StepList({ state, steps }: Props) {
  const [checkedSteps, setCheckedSteps] = state;

  const onStepsToggle = useCallback(
    (id: number) => setCheckedSteps((prev) => ({ ...prev, [id]: !prev[id] })),
    [],
  );

  return (
    <CheckboxList
      checkedItems={checkedSteps}
      items={steps}
      onChange={onStepsToggle}
    />
  );
}

export default StepList;
