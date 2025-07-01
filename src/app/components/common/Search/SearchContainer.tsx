'use client';

import { useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { joinClassNames } from '@/utils/style';

import { getSearchLink } from '@/helpers/links';

import Icon from '@/components/Icon';

import { SEARCH_MENU_ITEMS, SearchMenuValue } from '@/const/searchMenu';

import { getSearchMenuItem, getSearchQuery } from './helper';
import style from './style.module.scss';

function SearchContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    getSearchQuery(searchParams.get('q')),
  );
  const [selectedMenuItem, setSelectedMenuItem] = useState<SearchMenuValue>(
    getSearchMenuItem(searchParams.get('type')),
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(e.target.value);

  const onSearch = () => {
    if (!searchQuery.trim()) return;

    router.push(getSearchLink(selectedMenuItem, searchQuery));
  };

  const onMenuChange = (menuItem: SearchMenuValue) =>
    setSelectedMenuItem(menuItem);

  const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSearch();
  };

  const initSearchStates = () => {
    setSearchQuery(getSearchQuery(searchParams.get('q')));
    setSelectedMenuItem(getSearchMenuItem(searchParams.get('type')));
  };

  useEffect(() => {
    initSearchStates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <section className={style['search-wrapper']}>
      <div className={style.search}>
        <input
          className={style.input}
          type='text'
          placeholder='What are you looking for?'
          value={searchQuery}
          onChange={onChange}
          onKeyDown={onEnterPress}
        />
        <SearchMenu
          onMenuChange={onMenuChange}
          selectedMenuItem={selectedMenuItem}
        />
        <button
          type='button'
          className={style.button}
          onClick={onSearch}
          title='Search'
          aria-label='Search'
        >
          <Icon icon='search' />
        </button>
      </div>
    </section>
  );
}

export default SearchContainer;

interface SearchMenuProps {
  onMenuChange: (menuItem: SearchMenuValue) => void;
  selectedMenuItem: string;
}

function SearchMenu({ onMenuChange, selectedMenuItem }: SearchMenuProps) {
  return (
    <div className={style['search-menu']}>
      {SEARCH_MENU_ITEMS.map((menuItem) => (
        <SearchItem
          key={menuItem.value}
          onMenuItemSelect={onMenuChange}
          menuItem={menuItem}
          selected={selectedMenuItem === menuItem.value}
        />
      ))}
    </div>
  );
}

function SearchItem({
  menuItem,
  selected,
  onMenuItemSelect,
}: {
  menuItem: (typeof SEARCH_MENU_ITEMS)[number];
  selected: boolean;
  onMenuItemSelect: (value: SearchMenuValue) => void;
}) {
  const textClassname = joinClassNames(
    style['search-item__text'],
    selected ? style['search-item__text--selected'] : '',
  );
  return (
    <button
      type='button'
      className={style['search-item']}
      onClick={() => onMenuItemSelect(menuItem.value)}
      title={menuItem.label}
      aria-label={menuItem.label}
    >
      <Icon icon={menuItem.icon} />
      <span className={textClassname}>{menuItem.label}</span>
    </button>
  );
}
