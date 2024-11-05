import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
interface type {
  notifiChapter: string[];
}
export const socket = io("http://localhost:3000/");
const NotiFiCrawlStory = () => {
  const [notifiChapter, setNotifiChapter] = useState<string[]>([]);

  useEffect(() => {
    const handleSuccessChapter = (data: any) => {
      setNotifiChapter((prev) => [...prev, data]);
    };

    socket.on("successChapter", handleSuccessChapter);

    return () => {
      socket.off("successChapter", handleSuccessChapter); // Cleanup on unmount
    };
  }, []);
  return (
    <div className="notifi-Chapter-crawl">
      <span className="example">Thông tin crawl Truyện:</span>
      <div className="notifi-Chapter-crawl-box">
        {notifiChapter.map((data: any, inx: number) => (
          <div key={inx}>
            <span>
              {data?.title} chương {data?.mumber_Chapter}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotiFiCrawlStory;
