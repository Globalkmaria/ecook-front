import { useState } from 'react';

import { joinClassNames } from '@/utils/style';

import IconButton from '@/components/IconButton';

import style from './style.module.scss';

function CopyLinkButton() {
  const [showMessage, setShowMessage] = useState(false);

  const handleClick = async () => {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);

    if (showMessage) return;
    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  const joinedClassName = joinClassNames(
    style['copy-link-button'],
    showMessage ? style['copy-link-button--active'] : '',
  );

  return (
    <>
      <IconButton icon='link' onClick={handleClick} />
      {showMessage && <div className={joinedClassName}>Link copied!</div>}
    </>
  );
}

export default CopyLinkButton;
