import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { type Models_Model } from "#shared/models/civitai/mod.ts";

interface IGalleryStore {
  civitaiModels: Array<Models_Model>
}

type State = {
  civitaiModels: Array<Models_Model>
}

type Actions = {
  civitaiModelsPush: (newModels: Array<Models_Model>) => void
}

const useGalleryStore = create<State & Actions>()(
  immer((set) => ({
    civitaiModels: [],
    addModels: (newModels: Array<Models_Model>) => set((state) => {
      state.
    })
  }))
)