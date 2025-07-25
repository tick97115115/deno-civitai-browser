import {
  addOneModelRecordRoute,
  deleteOneModelRecordRoute,
  queryLocalModelsRoute,
  scanLocalModelsRoute,
  updateOneModelRecordRoute,
} from "./db.ts";
import { getSettings, newSettings } from "./settings.ts";

export const router = {
  db: {
    model: {
      addOneModelRecordRoute,
      updateOneModelRecordRoute,
      deleteOneModelRecordRoute,
    },
  },
  models: {
    queryLocalModelsRoute,
    scanLocalModelsRoute,
  },
  settings: {
    newSettings,
    getSettings,
  },
};
export type Router = typeof router;
