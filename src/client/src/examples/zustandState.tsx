import { create } from "zustand";
// import { type Models_Model } from "#shared/models/civitai/mod.ts";

interface ModelDetailViewState {
  targetModel?: string;
  changeTargetModel: () => void;
}

const useModelDetailViewStore = create<ModelDetailViewState>()((set) => ({
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
