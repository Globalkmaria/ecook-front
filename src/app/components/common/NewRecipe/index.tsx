'use client';

import { ChangeEventHandler, useCallback, useState } from 'react';
import { QueryKey, useMutationState } from '@tanstack/react-query';

import style from './style.module.scss';

import {
  NewRecipeData,
  NewRecipeIngredient,
} from '@/services/requests/recipes/type';

import { ChipListInput, Input } from '@/components/Input';
import Button from '@/components/Button';
import ImageUploaderWithReset from '@/components/imageUploader/ImageUploaderWithReset';

import { createInputHandler } from '@/utils/createInputHandler';
import { withTextLengthLimit } from '@/utils/validation';

import RecipeSteps from './RecipeSteps';
import RecipeIngredients from './RecipeIngredients';
import RecipeTime from './RecipeTime';
import {
  checkIfAllFieldsAreFilled,
  getValidAndTrimmedSteps,
  getValidIngredients,
} from './helper';
import { Step } from './RecipeSteps/RecipeStepsContent';

export interface NewRecipeSubmitProps {
  img: File | string | null;
  ingredients: NewRecipeIngredientStates;
  steps: Step[];
  textInputs: TextInputs;
  tags: NewRecipeTags;
}

export type OnSubmitNewRecipe = (data: NewRecipeSubmitProps) => void;

export type TextInputs = Pick<
  NewRecipeData,
  'name' | 'description' | 'hours' | 'minutes'
>;

export type NewRecipeTags = string[];

export type NewRecipeIngredientState = NewRecipeIngredient & { id: string };
export type NewRecipeIngredientStates = NewRecipeIngredientState[];

export type NewRecipeInitialData = Omit<
  NewRecipeData,
  'img' | 'steps' | 'ingredients'
> & {
  img: string | null;
  steps: Step[];
  ingredients: NewRecipeIngredientStates;
};

export type ImgState = File | string | null;

interface Props {
  initialData: NewRecipeInitialData;
  onSubmit: OnSubmitNewRecipe;
  mutationKey: QueryKey;
  pageTitle: string;
}

function NewRecipe({ initialData, onSubmit, pageTitle, mutationKey }: Props) {
  const state = useMutationState({
    filters: { mutationKey: mutationKey, exact: true },
    select: (state) => state.state,
  });

  const [textInputs, setTextInputs] = useState<TextInputs>({
    name: initialData.name,
    description: initialData.description,
    hours: initialData.hours,
    minutes: initialData.minutes,
  });
  const tagsState = useState<NewRecipeTags>(initialData.tags);
  const [img, setImg] = useState<ImgState>(initialData.img);
  const [ingredients, setIngredients] = useState<NewRecipeIngredientStates>(
    initialData.ingredients,
  );
  const [steps, setSteps] = useState<Step[]>(initialData.steps);

  const isSubmittable = checkIfAllFieldsAreFilled({
    textInputs,
    img,
    ingredients,
    steps,
  });

  const loading =
    state[0]?.status === 'success' || state[0]?.status === 'pending';
  const submitButtonText = loading ? 'Submitting...' : 'Submit';
  const disableButton = !isSubmittable || loading;
  const imgLoaderMode = initialData.img ? 'edit' : 'new';

  const onTextInputChange = createInputHandler(setTextInputs);

  const onChangeName: ChangeEventHandler<HTMLInputElement> = useCallback(
    withTextLengthLimit(50, 'Title', onTextInputChange),
    [],
  );

  const onChangeDescription: ChangeEventHandler<HTMLInputElement> = useCallback(
    withTextLengthLimit(300, 'Description', onTextInputChange),
    [],
  );

  const onFormSubmit = () =>
    onSubmit({
      img,
      ingredients: getValidIngredients(ingredients),
      steps: getValidAndTrimmedSteps(steps),
      textInputs,
      tags: tagsState[0],
    });

  return (
    <div className={style.container}>
      <h2 className={style.title}>{pageTitle}</h2>

      <div className={style.form}>
        <div className={style.box}>
          <label htmlFor='name'>
            <h3>Title*</h3>
          </label>
          <Input
            id='name'
            name='name'
            onChange={onChangeName}
            value={textInputs.name}
          />
        </div>

        <div className={style.box}>
          <label htmlFor='description'>
            <h3>Description</h3>
          </label>
          <Input
            id='description'
            name='description'
            onChange={onChangeDescription}
            value={textInputs.description}
          />
        </div>

        <RecipeTime textInputs={textInputs} setTextInputs={setTextInputs} />

        <div className={style.box}>
          <h3>Tags</h3>
          <ChipListInput
            limitTextLength={70}
            state={tagsState}
            limit={5}
            limitReachedMessage={TAG_LIMIT_REACHED_MESSAGE}
          />
        </div>

        <div className={style.box}>
          <h3>Image*</h3>
          <div className={style['img-uploader']}>
            <ImageUploaderWithReset
              onChange={setImg}
              imgValue={img}
              initialImg={initialData.img}
              mode={imgLoaderMode}
            />
          </div>
        </div>

        <RecipeIngredients
          setIngredients={setIngredients}
          ingredients={ingredients}
        />
        <RecipeSteps steps={steps} setSteps={setSteps} />

        <Button
          disabled={disableButton}
          className={style['submit-button']}
          onClick={onFormSubmit}
        >
          {submitButtonText}
        </Button>
      </div>
    </div>
  );
}

export default NewRecipe;

const TAG_LIMIT = 5;
const TAG_LIMIT_REACHED_MESSAGE = `You can only add up to ${TAG_LIMIT} tags.`;
