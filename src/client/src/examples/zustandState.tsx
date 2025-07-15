import { create } from "zustand";
// import { type Models_Model } from "#shared/models/civitai/mod.ts";

interface IModelDetailViewState {
  targetModel?: string;
  changeTargetModel: () => void;
}

const useModelDetailViewStore = create<IModelDetailViewState>()((set) => ({
  targetModel: undefined,
  changeTargetModel: () => set((_state) => ({ targetModel: "model" })),
}));

export default function App() {
  const modelDetail = useModelDetailViewStore((state) => state.targetModel);
  const changeTargetModel = useModelDetailViewStore((state) =>
    state.changeTargetModel
  );
  if (!modelDetail) {
    return (
      <>
        <h1>haven't chose a model</h1>
        <button type="button" onClick={changeTargetModel}>change</button>
      </>
    );
  }
  return <div>{JSON.stringify(modelDetail)}</div>;
}
