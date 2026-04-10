import Scene from "./Scene";
import CharacterErrorBoundary from "./ErrorBoundary";

const CharacterModel = () => {
  return (
    <CharacterErrorBoundary>
      <Scene />
    </CharacterErrorBoundary>
  );
};

export default CharacterModel;
