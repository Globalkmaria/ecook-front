import { useCallback } from 'react';

import { RecipeDetail } from '@/services/recipe/type';

import Checkbox from '@/components/CheckboxList';

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
    <Checkbox.List
      checkedItems={checkedSteps}
      items={steps}
      onChange={onStepsToggle}
    />
  );
}

export default StepList;
