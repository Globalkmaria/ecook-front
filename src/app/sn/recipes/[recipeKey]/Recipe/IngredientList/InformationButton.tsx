import useModal from '@/hooks/useModal';

import Icon from '@/components/Icon';

import { Ingredient } from '@/services/requests/recipe/type';

import IngredientInformationModal from './IngredientInformation';
import style from './style.module.scss';

interface Props {
  ingredient: Ingredient;
}

function InformationButton({ ingredient }: Props) {
  const control = useModal();
  return (
    <>
      <button className={style.icon} onClick={control.onOpen}>
        <Icon icon='info' />
      </button>
      <IngredientInformationModal
        ingredient={ingredient}
        modalControl={control}
      />
    </>
  );
}

export default InformationButton;
