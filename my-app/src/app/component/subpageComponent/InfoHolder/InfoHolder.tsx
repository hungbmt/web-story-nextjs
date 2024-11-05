import { typeGethome } from "@/type/story.type";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import "./InfoHolder.css";
interface typeSubpage {
  itemSubpage: typeGethome;
  totalChapter: Number;
}

const InfoHolder: React.FC<typeSubpage> = ({ itemSubpage, totalChapter }) => {
  const genresString = itemSubpage.genres;
  const [genres, setGenres] = useState<string[]>([]);
  const genresArray = useMemo(() => {
    try {
      return JSON.parse(genresString) || [];
    } catch (e) {
      return [];
    }
  }, [genresString]);
  // useEffect(() => {
  //   if (Array.isArray(genresArray)) {
  //     let newGenres = genresArray.map((data) => data);
  //     setGenres(newGenres);
  //   } else {
  //     setGenres([]);
  //   }
  // }, [genresArray]);
  // const validGenresArray = Array.isArray(genresArray) ? genresArray : [];
  return (
    <>
      <div className="title-Subpage">
        <h2>{itemSubpage?.title}</h2>
      </div>
      <table className="info-holder-wraper">
        <tbody>
          <tr>
            <th style={{ width: 200 }}>
              <i className="fa-solid fa-user"></i> Tác Giả:
            </th>
            <td style={{ paddingLeft: 10 }}> {itemSubpage?.author}</td>
          </tr>
          <tr>
            <th style={{ width: 200 }}>
              <i className="fa-solid fa-tag"></i> Thể Loại:
            </th>
            <td style={{ paddingLeft: 10 }}>
              {genresArray?.map(
                (itemGenre: { slug: string; genres: string }, inx: number) => (
                  <Link href={`/the-loai/${itemGenre.slug}`} key={inx}>
                    {itemGenre.genres},{" "}
                  </Link>
                )
              )}
            </td>
          </tr>
          <tr>
            <th style={{ width: 200 }}>
              <i className="fa-solid fa-eye"></i> Lượt xem:
            </th>
            <td style={{ paddingLeft: 10 }}> {itemSubpage?.view} lượt xem</td>
          </tr>
          <tr>
            <th style={{ width: 200 }}>
              <i className="fa-solid fa-rss"></i> Trạng Thái:
            </th>
            <td style={{ paddingLeft: 10 }}> {itemSubpage?.statusStory}</td>
          </tr>
          <tr>
            <th style={{ width: 200 }}>
              <i className="fa-solid fa-book-open"></i> Chương:
            </th>
            <td style={{ paddingLeft: 10 }}> {Number(totalChapter)}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
export default InfoHolder;
