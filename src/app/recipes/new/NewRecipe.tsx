'use client';

import { ChangeEventHandler, useCallback, useState } from 'react';

import style from './style.module.scss';

import { NewRecipeData, NewRecipeIngredient } from '@/service/recipes/type';

import { ChipListInput, Input } from '@/components/Input';
import Button from '@/components/Button';
import ImageUploaderWithReset from '@/components/imageUploader/ImageUploaderWithReset';

import { getRandomId } from '@/utils/generateId';
import { createInputHandler } from '@/utils/createInputHandler';
import {
  validateLengthAndExecute,
  validatePositiveInteger,
  validateWithAlertAndExecute,
  withTextLengthLimit,
} from '@/utils/validation';
import { validateMinutes } from '@/utils/time';

import Ingredients from './components/Ingredients';
import { AddButton } from './components/buttons';
import Steps, { Step } from './components/Steps';
import { getNewIngredient, onFieldChange } from './helper';
import { OnSubmitNewRecipe } from './NewRecipeContainer';

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

interface Props {
  initialData: NewRecipeInitialData;
  onSubmit: OnSubmitNewRecipe;
  loading: boolean;
  pageTitle: string;
}

function NewRecipe({ initialData, onSubmit, loading, pageTitle }: Props) {
  const [textInputs, setTextInputs] = useState<TextInputs>({
    name: initialData.name,
    description: initialData.description,
    hours: initialData.hours,
    minutes: initialData.minutes,
  });

  const tagsState = useState<NewRecipeTags>(initialData.tags);
  const [img, setImg] = useState<File | string | null>(initialData.img);
  const [ingredients, setIngredients] = useState<NewRecipeIngredientStates>(
    initialData.ingredients,
  );
  const [steps, setSteps] = useState<Step[]>(initialData.steps);

  const isSubmittable = img && ingredients[0].name && steps[0].value.length;
  const submitButtonText = loading ? 'Submitting...' : 'Submit';
  const disableButton = !isSubmittable || loading;

  const onTextInputChange = createInputHandler(setTextInputs);

  const onChangeName: ChangeEventHandler<HTMLInputElement> = useCallback(
    withTextLengthLimit(50, 'Title', onTextInputChange),
    [],
  );

  const onChangeDescription: ChangeEventHandler<HTMLInputElement> = useCallback(
    withTextLengthLimit(300, 'Description', onTextInputChange),
    [],
  );

  const onHoursChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const { name, value } = e.target;

      validateWithAlertAndExecute(
        validatePositiveInteger,
        'Please enter a valid time',
        value,
        () => setTextInputs((prev) => ({ ...prev, [name]: value })),
      );
    },
    [],
  );

  const onMinusesChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const { name, value } = e.target;

      validateWithAlertAndExecute(
        validateMinutes,
        'Please enter a valid time',
        value,
        () => setTextInputs((prev) => ({ ...prev, [name]: value })),
      );
    },
    [],
  );

  const onAddIngredient = useCallback(
    () =>
      setIngredients((preIngredients) => [
        ...preIngredients,
        getNewIngredient(),
      ]),
    [],
  );

  const onRemoveIngredient = useCallback(
    (id: string) =>
      setIngredients(ingredients.filter((item) => item.id !== id)),
    [ingredients],
  );

  const onAddStep = useCallback(
    () =>
      setSteps((preSteps) => [...preSteps, { id: getRandomId(), value: '' }]),
    [],
  );

  const onRemoveStep = useCallback(
    (id: string) =>
      setSteps((preSteps) => preSteps.filter((item) => item.id !== id)),
    [],
  );

  const onStepChange = useCallback(
    (id: string, fieldName: string, value: string) => {
      validateLengthAndExecute(150, 'Step', value, () =>
        onFieldChange(setSteps, id, fieldName, value),
      );
    },
    [],
  );

  const onFormSubmit = () => {
    onSubmit({
      img,
      ingredients,
      steps,
      textInputs,
      tags: tagsState[0],
    });
  };

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

        <div className={style.box}>
          <label htmlFor='time'>
            <h3>Time</h3>
          </label>

          <div className={style.time}>
            <div className={style['time-item']}>
              Hours:
              <Input
                id='hours'
                name='hours'
                onChange={onHoursChange}
                value={textInputs.hours}
              />
            </div>
            <div className={style['time-item']}>
              Minutes:
              <Input
                id='minutes'
                name='minutes'
                onChange={onMinusesChange}
                value={textInputs.minutes}
              />
            </div>
          </div>
        </div>

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
              mode={initialData.img ? 'edit' : 'new'}
            />
          </div>
        </div>

        <div className={style.box}>
          <h3>Ingredients*</h3>
          <div className={style.box__content}>
            <Ingredients
              setIngredients={setIngredients}
              onRemove={onRemoveIngredient}
              ingredients={ingredients}
            />
            <AddButton onClick={onAddIngredient}>Add a ingredient</AddButton>
          </div>
        </div>

        <div className={style.box}>
          <h3>Steps*</h3>
          <div className={style.box__content}>
            <Steps
              steps={steps}
              onRemove={onRemoveStep}
              onChange={onStepChange}
            />
            <AddButton onClick={onAddStep}>Add a step</AddButton>
          </div>
        </div>

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
