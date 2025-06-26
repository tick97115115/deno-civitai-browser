import {
  addOneModelRecord,
  deleteOneModelRecord,
  queryLocalModels,
  scanLocalModels,
  updateOneModelRecord,
} from "./db.ts";
import { getSettings, newSettings } from "./settings.ts";

export const router = {
  db: {
    model: {
      addOneModelRecord,
      updateOneModelRecord,
      deleteOneModelRecord,
    },
    models: {
      queryLocalModels,
      scanLocalModels,
    },
  },
  settings: {
    newSettings,
    getSettings,
  },
};
