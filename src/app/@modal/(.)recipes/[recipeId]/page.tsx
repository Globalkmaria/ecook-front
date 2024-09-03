'use client';

import styled from 'styled-components';
import { useRouter } from 'next/navigation';

import Recipe from '@/app/recipes/[recipeId]/Recipe';
import useModal from '@/hooks/useModal';
import { Modal } from '@/components/Modal';

interface Props {
  params: { recipeId: string };
}

function RecipePage({ params }: Props) {
  const router = useRouter();

  const modalHandler = useModal(true);

  const onDismiss = () => {
    router.back();
  };
  return (
    <Modal isOpen={modalHandler.isOpen} onClose={onDismiss}>
      <StyledContainer>
        <Recipe recipeId={params.recipeId} />
      </StyledContainer>
    </Modal>
  );
}

export default RecipePage;

const StyledContainer = styled.div`
  max-width: 1200px;
  width: 80vw;
  height: 80vh;
`;
