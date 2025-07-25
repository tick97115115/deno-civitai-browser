import { atom } from "jotai";
import { atomWithImmer } from "jotai-immer";
import { atomWithStorage } from "jotai/utils";
import type {
  Models_Model,
  Models_RequestOpts,
} from "#shared/models/civitai/mod.ts";

export const totalLocalModels = atom<number>(0);

export const galleryAtom = atomWithImmer<Array<Models_Model>>([]);

export const persistedCivitaiSearchOpts = atomWithStorage<
  Models_RequestOpts
>("persistedCivitaiSearchOpts", {});

export const persistedLocalModelSearchOpts = atomWithStorage<
  Models_RequestOpts
>("persistedLocalModelSearchOpts", {});
