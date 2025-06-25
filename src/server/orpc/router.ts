import {
  addOneModelRecord,
  deleteOneModelRecord,
  queryLocalModels,
  scanLocalModels,
  updateOneModelRecord,
} from "./db.ts";

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
};
