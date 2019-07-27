/**
 * Root Sagas
 */
import { all } from "redux-saga/effects";

// sagas
import authSagas from "./Auth";
import inventorySagas from "./Inventory";
import loctiteSagas from "./Loctite";
import warehouseSagas from "./Warehouse";
import categoriesSagas from "./Categories";

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    inventorySagas(),
    loctiteSagas(),
    warehouseSagas(),
    categoriesSagas()
  ]);
}
