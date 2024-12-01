import style from './style.module.scss';

import useModal from '@/hooks/useModal';

import IngredientInformationModal from '../IngredientInformation';
import Icon from '@/components/Icon';
import { Ingredient } from '@/service/recipes/type';

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
