import { configureStore, combineReducers } from "@reduxjs/toolkit";
import autoMergeLevel1 from "redux-persist/lib/stateReconciler/autoMergeLevel1";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import login from "./features/auth/login/loginSlider";
import getHomeSlice from "./features/getHome/getHomeSlice";
import subpageSlice from "./features/subpage/subpageSlice";
import relatedStory from "./features/relatedStory/relatedStory";
import chapterStory from "./features/chapterStory/chapterStory";
import crawlStory from "./features/crawl-story/crawlStory";
import listProductAdmin from "./features/getListProductAdmin/listProducAdmin";
import createContent from "./features/form-create/createContent/CreateContenSlice";
import createChapter from "./features/form-create/createChapter/CreateChapterSlice";
import dataUpdata from "./features/dataUpdata/dataUpdata";
import createCategory from "./features/form-create/createCategory/CreateCategoySlice";
import getCategory from "./features/form-create/createCategory/GetCategory";
import createList from "./features/form-create/createList/CreateListSlice";
import getList from "./features/form-create/createList/GetListSlice";
import deleteContent from "./features/delete/deleteContent/DeleteContentSlice";
import crawlMuchLinkTruyenFull from "./features/crawl-story/cawlmuchLink/crawlMuchLink";
import crawlbyCategoryLinkTruyenFull from "./features/crawl-story/crawlByCategory/crawlbyCategory";
import getProcducCategory from "./features/productListCategory/category/categorySlice";
import putViewSubpage from "./features/vewSubpage/viewSubpageSlice";
import chartDashBoard from "./features/dashBoard/chart/chartSlice";
import parameter from "./features/parameter/parameterSlice";
import getError from "./features/errorStory/errorStorySlice";

const rootReducer = combineReducers({
  loginReducer: login,
  getHomeReducer: getHomeSlice,
  getsubpageReducer: subpageSlice,
  relatedStoryReducer: relatedStory,
  chapterStoryReducer: chapterStory,
  crawlStoryReducer: crawlStory,
  listProductAdminReducer: listProductAdmin,
  createContentReducer: createContent,
  createChapterReducer: createChapter,
  dataUpdataReducer: dataUpdata,
  createCategoryReducer: createCategory,
  getCategoryReducer: getCategory,
  createListReducer: createList,
  getListReducer: getList,
  deleteContentReducer: deleteContent,
  crawlMuchLinkTruyenfull: crawlMuchLinkTruyenFull,
  crawlStorybyCategoryTruyenFullReducer: crawlbyCategoryLinkTruyenFull,
  getProctCategoryReducer: getProcducCategory,
  viewSubpageReducer: putViewSubpage,
  chartDashBoardReducer: chartDashBoard,
  parameterReducer: parameter,
  getErrorReducer: getError,
});
const persistConfig = {
  key: "root",
  storage:
    typeof window !== "undefined" ? storage : (undefined as unknown as Storage),
  debug: true,
  whitelist: ["loginReducer"],
  version: 1,
};
const makeConfiguredStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export const makeStore = () => {
  const isServer = typeof window === "undefined";
  // Cấu hình cho server-side
  if (isServer) {
    return configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
    });
  } else {
    // Cấu hình cho client-side với persistReducer
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    const store = configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
    });

    // Thiết lập persistor cho client-side
    (store as any).__persistor = persistStore(store);
    return store;
  }
};

export const persistor = persistStore(makeStore());

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
