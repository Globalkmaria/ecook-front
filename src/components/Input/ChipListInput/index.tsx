'use client';

import {
  ChangeEventHandler,
  Dispatch,
  KeyboardEventHandler,
  SetStateAction,
  useRef,
  useState,
} from 'react';

import style from './style.module.scss';

import Chip from '@/components/Chip';
import Icon from '@/components/Icon';
import { joinClassNames } from '@/utils/style';

interface Props {
  className?: string;
  placeholder?: string;
  state: [string[], Dispatch<SetStateAction<string[]>>];
}

function ChipListInput({
  className,
  placeholder,
  state: [items, setItems],
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');

  const joinedClassName = joinClassNames(style.container, className);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setInputValue(event.target.value);

  const addItem = (value: string) => {
    if (items.includes(value)) {
      setInputValue('');
      return;
    }

    setItems([...items, value]);
  };

  const removeItem = (value: string) =>
    setItems(items.filter((item) => item !== value));

  const removeLastItem = () => setItems(items.slice(0, -1));

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    const key = event.key;
    const value = event.currentTarget.value.trim();

    if (key === 'Enter' && value.length) {
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

  return (
    <div className={joinedClassName} onClick={focusInput}>
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
        ref={inputRef}
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        type='text'
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default ChipListInput;
