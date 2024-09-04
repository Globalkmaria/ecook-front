'use client';

import styled from 'styled-components';
import { useRouter } from 'next/navigation';

import Recipe from '@/app/recipes/[recipeId]/Recipe';
import { Modal } from '@/components/Modal';

interface Props {
  params: { recipeId: string };
}

function RecipePage({ params }: Props) {
  const router = useRouter();

  if (!params.recipeId) {
    return null;
  }

  const onDismiss = () => {
    router.back();
  };
  return (
    <Modal isOpen={true} onClose={onDismiss}>
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
