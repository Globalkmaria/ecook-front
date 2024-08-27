import HomeContainer from './components/HomeContainer';
import HomeHeader from './components/HomeHeader';
import Recipes from './components/Recipes';

export default function Home() {
  return (
    <HomeContainer>
      <HomeHeader />
      <Recipes />
    </HomeContainer>
  );
}
