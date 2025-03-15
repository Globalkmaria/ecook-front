import { useCallback } from 'react';

import Checkbox from '@/components/CheckboxList';

import { RecipeDetail } from '@/services/requests/recipe/type';

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
    [setCheckedSteps],
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
