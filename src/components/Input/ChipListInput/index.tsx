'use client';

import {
  ChangeEventHandler,
  Dispatch,
  KeyboardEventHandler,
  memo,
  SetStateAction,
  useRef,
  useState,
} from 'react';

import { joinClassNames } from '@/utils/style';

import Chip from '@/components/Chip';
import Icon from '@/components/Icon';

import style from './style.module.scss';

interface Props {
  className?: string;
  placeholder?: string;
  items: string[];
  setItems: Dispatch<SetStateAction<string[]>>;
  limit?: number;
  limitTextLength?: number;
  limitReachedMessage?: string;
}

function ChipListInput({
  className,
  placeholder,
  items,
  setItems,
  limit,
  limitTextLength,
  limitReachedMessage,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');

  const joinedClassName = joinClassNames(style.container, className);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (limitTextLength && event.target.value.length > limitTextLength) {
      alert(`Text limit reached: ${limitTextLength}`);
      return;
    }

    setInputValue(event.target.value);
  };

  const addItem = (value: string) => {
    if (limit && items.length >= limit) {
      alert(limitReachedMessage ?? 'Tag limit reached');
      return;
    }

    const trimmedValue = value.trim();

    if (items.includes(trimmedValue)) {
      setInputValue('');
      return;
    }

    setItems([...items, trimmedValue]);
  };

  const removeItem = (value: string) =>
    setItems(items.filter((item) => item !== value));

  const removeLastItem = () => setItems(items.slice(0, -1));

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    const key = event.key;
    const value = event.currentTarget.value;

    if (key === 'Enter' && value.trim().length) {
      event.preventDefault();
      addItem(value);
      setInputValue('');
      return;
    }

    if (key === ' ' && value.trim().length) {
      event.preventDefault();
      addItem(value);
      setInputValue('');
      return;
    }

    if (key === 'Backspace' && !value.length && items.length) {
      removeLastItem();
      return;
    }
  };

  const focusInput = () => inputRef.current?.focus();

  const handleContainerKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      focusInput();
    }
  };

  return (
    <>
      <div
        role='button'
        aria-label='chip list input'
        className={joinedClassName}
        onClick={focusInput}
        onKeyDown={handleContainerKeyDown}
        tabIndex={0}
      >
        {[...items].map((item) => (
          <div key={item} className={style.chip}>
            <Chip>
              {item}
              <button type='button' onClick={() => removeItem(item)}>
                <Icon icon='close' />
              </button>
            </Chip>
          </div>
        ))}
        <input
          className={style.input}
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          type='text'
          onKeyDown={handleKeyDown}
        />
      </div>
    </>
  );
}

export default memo(ChipListInput);
