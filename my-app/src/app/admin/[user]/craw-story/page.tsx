"use client";

import {
  apiCrawlStoryByCategoryTruyenFull,
  apiCrawlStoryTruyenFull,
  apiMuchLinkStorytruyenFull,
} from "@/lib/apiRequest/api";
import { useAppDispatch } from "@/lib/hook";
import React, { useState } from "react";
import "./crawlStory.css";
import { Tab, Tabs } from "react-bootstrap";
import AdminLayout from "@/app/layout/adminLayout/adminLayout";
import NotiFiCrawlStory from "@/app/component/notifiCrawlStory/notifiCrawlStory";
const CrawStory = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [delayStory, setDelayStory] = useState<string>("3000");
  const [textStory, setTextStory] = useState<string>("");
  const [muchStory, setMuchStory] = useState("");
  const [storybyCategory, setStoryByCategory] = useState("");
  const dispatch = useAppDispatch();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (e: React.FormEvent, selectedOption: string) => {
    e.preventDefault();
    const data: any = {
      delay: delayStory,
      story: textStory,
    };
    apiCrawlStoryTruyenFull(dispatch, data);
  };
  const HandleSubmitV2 = (e: React.FormEvent) => {
    e.preventDefault();
    const storyArray = muchStory.split(",").map((link) => link.trim());
    apiMuchLinkStorytruyenFull(dispatch, storyArray, delayStory);
  };

  // apiCrawlStoryByCategoryTruyenFull
  const HandeSubmitV3 = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      storyCategory: storybyCategory,
      delay: delayStory,
    };
    apiCrawlStoryByCategoryTruyenFull(dispatch, data);
  };
  return (
    <AdminLayout>
      <div className="crawl-story-wraper">
        <div className="title-joint">
          <span>Craw story</span>
        </div>
        <div className="form-floating">
          <select
            className="form-select"
            id="floatingSelect"
            aria-label="Floating label select example"
            onChange={handleSelectChange}
            value={selectedOption}
          >
            <option value="">Open this select menu</option>
            <option value="1">truyện full</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          <label htmlFor="floatingSelect">crawl story</label>
        </div>

        {/* Hiển thị ô input khi người dùng chọn option 1 */}
        {selectedOption === "1" && (
          <div>
            <div className="mt-3">
              <Tabs
                defaultActiveKey="v1"
                transition={false}
                id="noanim-tab-example"
                className="mb-3 text-tabs"
              >
                <Tab eventKey="v1" title="v1">
                  <span className="example">
                    Example:{" "}
                    <span>
                      https://truyenfull.io/me-ke-o-co-dai-lam-ca-man/
                    </span>
                  </span>
                  <form
                    onSubmit={(e) => handleSubmit(e, selectedOption)}
                    className="form-floating mt-3"
                  >
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Enter something..."
                      onChange={(e) => setTextStory(e.target.value)}
                      value={textStory}
                    />
                    <label htmlFor="floatingInput">truyenfull</label>
                    <button
                      className="btn-submit mt-2 d-flex justify-content-center"
                      style={{ margin: "0 auto" }}
                      type="submit"
                    >
                      Submit
                    </button>
                  </form>
                </Tab>
                <Tab eventKey="v2" title="v2">
                  <span className="example">
                    Example: <br />
                    <div className="ms-4 mt-2">
                      <span>
                        https://truyenfull.io/me-ke-o-co-dai-lam-ca-man/,
                        <br />
                      </span>
                      <span>
                        https://truyenfull.io/me-ke-o-co-dai-lam-ca-man/,
                        <br />
                      </span>
                      <span>
                        https://truyenfull.io/me-ke-o-co-dai-lam-ca-man/,
                        <br />
                      </span>
                    </div>
                  </span>
                  <form className="mt-3" onSubmit={HandleSubmitV2}>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlTextarea1"
                        className="form-label"
                      >
                        Crawl Mush Link
                      </label>
                      <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows={3}
                        onChange={(e) => setMuchStory(e.target.value)}
                      ></textarea>
                    </div>
                    <button
                      className="btn-submit mt-2 d-flex justify-content-center"
                      style={{ margin: "0 auto" }}
                      type="submit"
                    >
                      Submit
                    </button>
                  </form>
                </Tab>
                <Tab eventKey="v3" title="v3">
                  <span className="example">
                    Example:{" "}
                    <span>
                      https://truyenfull.io/top-truyen/duoi-100-chuong/
                    </span>
                  </span>
                  <form className="form-floating mt-3" onSubmit={HandeSubmitV3}>
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Enter something..."
                      value={storybyCategory}
                      onChange={(e) => setStoryByCategory(e.target.value)}
                    />
                    <label htmlFor="floatingInput">truyenfull</label>
                    <button
                      className="btn-submit mt-2 d-flex justify-content-center"
                      style={{ margin: "0 auto" }}
                      type="submit"
                    >
                      Submit
                    </button>
                  </form>
                </Tab>
                <Tab eventKey="update" title="update">
                  Tab content for Contact
                </Tab>
              </Tabs>
            </div>
            <div className="setting-wrapre">
              <span className="example">setting:</span>
              <div className="setting-box">
                <span>set time out:</span>
                <input
                  type="text"
                  defaultValue={delayStory}
                  onChange={(e) => setDelayStory(e.target.value)}
                  name=""
                  id=""
                />
              </div>
            </div>
          </div>
        )}

        <NotiFiCrawlStory />
        <div className="info-crawl-story-wrap d-flex flex-column ">
          <span>
            <span>v1:</span> crawl truyện một link
          </span>
          <span>
            <span>v2:</span> crawl truyện nhiều link
          </span>
          <span>
            <span>v3:</span> crawl truyện theo category
          </span>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CrawStory;
