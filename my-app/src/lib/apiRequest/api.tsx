import axios from "axios";
import {
  getHomeFalse,
  getHomeStart,
  getHomeSuccess,
} from "../features/getHome/getHomeSlice";
import { AppDispatch } from "../store";
import {
  getSubpagefaulse,
  getSubpageStart,
  getSubpageSuccess,
} from "../features/subpage/subpageSlice";
import {
  relatedStoryfaulse,
  relatedStoryStart,
  relatedStorySuccess,
} from "../features/relatedStory/relatedStory";
import {
  chapterStoryfaulse,
  chapterStoryStart,
  chapterStorySuccess,
} from "../features/chapterStory/chapterStory";
import {
  CrawlTruyenfullFalse,
  CrawlTruyenfullStart,
  CrawlTruyenfullSuccess,
} from "../features/crawl-story/crawlStory";
import {
  listProductAdminfaulse,
  listProductAdminStart,
  listProductAdminSuccess,
} from "../features/getListProductAdmin/listProducAdmin";
import {
  updateGimfaulse,
  updateGimStart,
  updateGimSuccess,
} from "../features/updateGim/updateGimSlice";
import {
  CreateContentfaulse,
  CreateContentStart,
  CreateContentSuccess,
} from "../features/form-create/createContent/CreateContenSlice";
import {
  CreateChapterfaulse,
  CreateChapterStart,
  CreateChapterSuccess,
} from "../features/form-create/createChapter/CreateChapterSlice";
import {
  dataUpdatafaulse,
  dataUpdataStart,
  dataUpdataSuccess,
} from "../features/dataUpdata/dataUpdata";
import {
  CreateCategoryfaulse,
  CreateCategoryStart,
  CreateCategorySuccess,
} from "../features/form-create/createCategory/CreateCategoySlice";
import {
  getCategoryfaulse,
  getCategoryStart,
  getCategorySuccess,
} from "../features/form-create/createCategory/GetCategory";
import {
  CreateListfaulse,
  CreateListStart,
  CreateListSuccess,
} from "../features/form-create/createList/CreateListSlice";
import {
  getListfaulse,
  getListStart,
  getListSuccess,
} from "../features/form-create/createList/GetListSlice";
import {
  DeleteContentfaulse,
  DeleteContentStart,
  DeleteContentSuccess,
} from "../features/delete/deleteContent/DeleteContentSlice";
import {
  CrawlTruyenFullMuschLinkFalse,
  CrawlTruyenFullMuschLinkStart,
  CrawlTruyenFullMuschLinkSuccess,
} from "../features/crawl-story/cawlmuchLink/crawlMuchLink";
import {
  crawlbyCategoryTruyenfullFalse,
  crawlbyCategoryTruyenfullStart,
  crawlbyCategoryTruyenfullSuccess,
} from "../features/crawl-story/crawlByCategory/crawlbyCategory";
import {
  getproductCategoryfaulse,
  getproductCategoryStart,
  getproductCategorySuccess,
} from "../features/productListCategory/category/categorySlice";
import {
  viewSubpagefaulse,
  viewSubpageStart,
  viewSubpageSuccess,
} from "../features/vewSubpage/viewSubpageSlice";
import {
  chartfaulse,
  chartStart,
  chartSuccess,
} from "../features/dashBoard/chart/chartSlice";
import {
  Loginfaulse,
  LoginStart,
  LoginSuccess,
} from "../features/auth/login/loginSlider";
import { sendError } from "next/dist/server/api-utils";
import {
  sendErrorfaulse,
  sendErrorStart,
  sendErrorSuccess,
} from "../features/sendError/sendErrorSlice";
import { headers } from "next/headers";
import {
  parameterFalse,
  parameterStart,
  parameterSuccess,
} from "../features/parameter/parameterSlice";
import {
  getErrorfaulse,
  getErrorStart,
  getErrorSuccess,
} from "@/lib/features/errorStory/errorStorySlice";
import {
  updataChapterFalse,
  updataChapterStart,
  updataChapterSuccess,
} from "@/lib/features/updataChapter/updataStorySlice";
import {
  updataStoryFalse,
  updataStoryStart,
  updataStorySuccess,
} from "../features/updataStory/updataStorySlider";
import {
  driveLockStoryFalse,
  driveLockStoryStart,
  driveLockStorySuccess,
} from "../features/driveLockStory/driveLockStorySlice";

const localhostApi = "http://localhost:3000/";

const apiReq = axios.create({
  baseURL: localhostApi,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
export const ApigetHome = async (dispatch: AppDispatch): Promise<void> => {
  dispatch(getHomeStart());
  try {
    let reps = await apiReq.get("/api/v2/story/get-home");
    dispatch(getHomeSuccess(reps.data));
  } catch (error) {
    dispatch(getHomeFalse(error));
  }
};

export const apiGetSubpage = async (
  dispatch: AppDispatch,
  slug: string,
  page: Number
) => {
  dispatch(getSubpageStart());
  try {
    let reps = await apiReq.get(`/api/v2/subpage/${slug}?page=${page}`);
    dispatch(getSubpageSuccess(reps.data));
  } catch (error) {
    dispatch(getSubpagefaulse(error));
  }
};

// /story/related-story

export const apiRelatedStory = async (
  dispatch: AppDispatch,
  genres: string[]
) => {
  dispatch(relatedStoryStart());
  try {
    let response = await apiReq.post(
      "/api/v2/story/related-story",
      {
        genres: genres,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(relatedStorySuccess(response.data));
  } catch (error) {
    dispatch(relatedStoryfaulse(error));
  }
};

export const apiChapterStory = async (
  dispatch: AppDispatch,
  subpage: string,
  chapter: string,
  accessToken: string
) => {
  dispatch(chapterStoryStart());
  try {
    let resp = await apiReq.get(`/api/v2/story/${subpage}/${chapter}`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(chapterStorySuccess(resp.data));
  } catch (error) {
    dispatch(chapterStoryfaulse(error));
  }
};

// /api/v2/view/:sub/
export const apiViewSubpage = async (dispatch: AppDispatch, slug: any) => {
  dispatch(viewSubpageStart());
  try {
    let reps = await apiReq.put(`/api/v2/view/${slug}`);
    dispatch(viewSubpageSuccess(reps.data));
  } catch (error) {
    dispatch(viewSubpagefaulse(error));
  }
};

export const apiCrawlStoryTruyenFull = async (
  dispatch: AppDispatch,
  data: any
) => {
  dispatch(CrawlTruyenfullStart());
  try {
    let reps = await apiReq.post("/api/truyenfull/v3/crawl", data);
    dispatch(CrawlTruyenfullSuccess(reps.data));
  } catch (error) {
    dispatch(CrawlTruyenfullFalse(error));
  }
};

export const apiMuchLinkStorytruyenFull = async (
  dispatch: AppDispatch,
  data: any,
  delay: string
) => {
  dispatch(CrawlTruyenFullMuschLinkStart());
  try {
    let reps = await apiReq.post("/api/truyenfull/v3/crawl-much-story", {
      story: data,
      delay: delay,
    });
    dispatch(CrawlTruyenFullMuschLinkSuccess(reps.data));
  } catch (error) {
    dispatch(CrawlTruyenFullMuschLinkFalse(error));
  }
};

export const apiCrawlStoryByCategoryTruyenFull = async (
  dispatch: AppDispatch,
  data: any
) => {
  dispatch(crawlbyCategoryTruyenfullStart());
  try {
    let reps = await apiReq.post(
      "/api/truyenfull/v3/crawl-category-story",
      data
    );
    dispatch(crawlbyCategoryTruyenfullSuccess(reps.data));
  } catch (error) {
    dispatch(crawlbyCategoryTruyenfullFalse(error));
  }
};

export const apiListProductAdmin = async (
  dispatch: AppDispatch,
  accesstoken: string,
  CreateApiRf: any
) => {
  dispatch(listProductAdminStart());
  try {
    let reps = await CreateApiRf.get("/api/v1/get-all-product", {
      headers: { token: `Bearer ${accesstoken}` },
    });
    dispatch(listProductAdminSuccess(reps.data));
  } catch (error) {
    dispatch(listProductAdminfaulse(error));
  }
};

export const apiUpdateGim = async (
  dispatch: AppDispatch,
  id: Number,
  slug: String,
  data: {
    gim: Number;
  },
  accessToken: string,
  CreateApiRf: any
) => {
  dispatch(updateGimStart());
  try {
    const reps = await CreateApiRf.put(
      `/api/v1/gim-story/${id}/${slug}`,
      data,
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(updateGimSuccess(reps.data));
  } catch (error) {
    dispatch(updateGimfaulse(error));
  }
};

// /api/v1/create-content
export const apiCreateContent = async (
  dispatch: AppDispatch,
  data: any,
  accessToken: string,
  CreateApiRf: any
) => {
  dispatch(CreateContentStart());
  try {
    let reps = await CreateApiRf.post("/api/v1/create-content", data, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(CreateContentSuccess(reps.data));
  } catch (error) {
    dispatch(CreateContentfaulse(error));
  }
};

// /create-chapter/:slugStory
export const apiCreateChapter = async (
  dispatch: AppDispatch,
  slugStory: string,
  data: any,
  accesstoken: string,
  createAxiosRf: any
) => {
  dispatch(CreateChapterStart());
  try {
    const reps = await createAxiosRf.post(
      `/api/v1/create-chapter/${slugStory}`,
      data,
      {
        headers: { token: `Bearer ${accesstoken}` },
      }
    );
    dispatch(CreateChapterSuccess(reps.data));
  } catch (error) {
    dispatch(CreateChapterfaulse(error));
  }
};

// /get/:slug
export const apidataUpdata = async (
  dispatch: AppDispatch,
  slug: string,
  page: number
) => {
  dispatch(dataUpdataStart());
  try {
    const reps = await apiReq.get(
      `/api/v1/get-data-chapter/${slug}?page=${page}`
    );
    dispatch(dataUpdataSuccess(reps.data));
  } catch (error) {
    dispatch(dataUpdatafaulse(error));
  }
};

// /create-category

export const apiCreateCategory = async (
  dispatch: AppDispatch,
  data: any,
  accesstoken: any,
  CreateApiRf: any
) => {
  dispatch(CreateCategoryStart());
  try {
    const response = await CreateApiRf.post("/api/v1/create-category", data, {
      headers: { token: `Bearer ${accesstoken}` },
    });
    dispatch(CreateCategorySuccess(response.data));
  } catch (error: any) {
    dispatch(CreateCategoryfaulse(error.message || "An error occurred"));
  }
};

// /get-category
export const apiGetCategory = async (dispatch: AppDispatch) => {
  dispatch(getCategoryStart());
  try {
    const reps = await apiReq.get("/api/v1/get-category");
    dispatch(getCategorySuccess(reps.data));
  } catch (error: any) {
    console.log(error);
    // Extracting only the message or serializable parts of the error
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    dispatch(getCategoryfaulse(errorMessage));
  }
};

// /create-list
export const apiCreateList = async (dispatch: AppDispatch, data: any) => {
  dispatch(CreateListStart());
  try {
    let reps = await apiReq.post("/api/v1/create-list", data);
    dispatch(CreateListSuccess(reps.data));
  } catch (error) {
    dispatch(CreateListfaulse(error));
  }
};
// /get-list
export const apigetList = async (dispatch: AppDispatch) => {
  dispatch(getListStart());
  try {
    let reps = await apiReq.get("/api/v1/get-list");
    dispatch(getListSuccess(reps.data));
  } catch (error) {
    dispatch(getListfaulse(error));
  }
};
// delete story /api/v1/delete-content
export const apiDeleteContent = async (dispatch: AppDispatch, data: any) => {
  dispatch(DeleteContentStart());
  try {
    let reps = await apiReq.delete("/api/v1/delete-content", { data });
    dispatch(DeleteContentSuccess(reps.data));
  } catch (error) {
    dispatch(DeleteContentfaulse(error));
  }
};

// "/delete/category/:id"

// "/delete/list/:id"

export const apiProductCategory = async (
  dispatch: AppDispatch,
  slug: any,
  page: any
) => {
  dispatch(getproductCategoryStart());
  try {
    let reps = await apiReq.get(
      `/api/v2/get-product-category/${slug}?page=${page || 1}`
    );

    dispatch(getproductCategorySuccess(reps.data));
  } catch (error) {
    dispatch(getproductCategoryfaulse(error));
  }
};

// chart View dashBoard
export const apiChartViewDashBoard = async (
  dispatch: AppDispatch,
  accessToken: string,
  CreateApiRf: any
) => {
  dispatch(chartStart());
  try {
    let reps = await CreateApiRf.get("/api/v1/chart-viewpage", {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(chartSuccess(reps.data));
  } catch (error) {
    dispatch(chartfaulse(error));
  }
};
// parameter dasboash
export const apiParameter = async (
  dispatch: AppDispatch,
  accessToken: string,
  CreateApiRf: any
) => {
  dispatch(parameterStart());
  try {
    const resp = await CreateApiRf.get("/api/v1/parameter", {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(parameterSuccess(resp.data));
  } catch (error) {
    dispatch(parameterFalse(error));
  }
};

// login

export const apiLogin = async (dispatch: AppDispatch, data: any) => {
  dispatch(LoginStart());
  try {
    const reps = await apiReq.post("/api/v1/auth/login", data);
    dispatch(LoginSuccess(reps.data));
  } catch (error) {
    dispatch(Loginfaulse(error));
  }
};

// refreshToken

export const refreshToken = async () => {
  try {
    const res = await apiReq.post("api/v1/auth/reset-token", {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// send error repost

export const apiSendError = async (
  dispatch: AppDispatch,
  data: any,
  accesstoken: string,
  CreateApiRf: any
) => {
  dispatch(sendErrorStart());
  try {
    let resp = await CreateApiRf.post("/api/v1/send-error", data, {
      headers: { token: `Bearer ${accesstoken}` },
    });
    dispatch(sendErrorSuccess(resp.data));
  } catch (error) {
    dispatch(sendErrorfaulse(error));
  }
};
// api notifition error

export const apiNotifierError = async (
  dispatch: AppDispatch,
  accesstoken: string,
  CreateApiRf: any
) => {
  dispatch(getErrorStart());
  try {
    let reps = await CreateApiRf.get("/api/v1/get-error", {
      headers: { token: `Bearer ${accesstoken}` },
    });
    dispatch(getErrorSuccess(reps.data));
  } catch (error) {
    dispatch(getErrorfaulse(error));
  }
};

// /updata/chapter/:slug/:slug_1

export const apiUpdataChapter = async (
  dispatch: AppDispatch,
  data: any,
  slug: string,
  slug_1: string,
  accessToken: string,
  CreateApiRf: any
) => {
  dispatch(updataChapterStart());
  try {
    let reps = await CreateApiRf.put(
      `/api/v1/updata-chapter/${slug}/${slug_1}`,
      data,
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(updataChapterSuccess(reps.data));
  } catch (error) {
    dispatch(updataChapterFalse(error));
  }
};

// /update-story

export const apiUpdataStory = async (
  dispatch: AppDispatch,
  data: any,
  slug: string,
  accessToken: string,
  CreateApiRf: any
) => {
  dispatch(updataStoryStart());
  try {
    let reps = await CreateApiRf.put(`/api/v1/update-story/${slug}`, data, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(updataStorySuccess(reps.data));
  } catch (error) {
    dispatch(updataStoryFalse(error));
  }
};

// drive lock story :slug/:chapter
export const apiDriveLockStory = async (
  dispatch: AppDispatch,
  slug: string,
  chapter: string,
  data: any,
  accessToken: string
) => {
  dispatch(driveLockStoryStart());
  try {
    let reps = await apiReq.put(
      `/api/v1/drive-lock-story/${slug}/${chapter}`,
      data,
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(driveLockStorySuccess(reps.data));
  } catch (error) {
    dispatch(driveLockStoryFalse(error));
  }
};
