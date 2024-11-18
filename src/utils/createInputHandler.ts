export function createInputHandler<T extends Record<string, any>>(
  setInputs: React.Dispatch<React.SetStateAction<T>>,
) {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputs((prev) => ({ ...prev, [name]: value }));
  };
}
