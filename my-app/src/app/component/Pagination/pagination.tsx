import { headers } from "next/headers";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import "./pagination.css";
import page from "@/app/admin/[user]/page";
interface typePagination {
  totalPage: number;
  currenPage: number;
  rangePage: number;
  Hostpage: String;
}

const Pagination: React.FC<typePagination> = ({
  totalPage,
  currenPage,
  rangePage,
  Hostpage,
}) => {
  const pathname = usePathname();
  const Router = useRouter();
  let mide = Math.ceil(rangePage / 2);
  let min = Math.max(1, currenPage - mide + 1);
  let max = Math.min(totalPage, min + rangePage - 1);

  let pages = [];
  for (let i = min; i <= max; i++) {
    pages.push(i);
  }
  const HandlePrev = () => {
    Router.push(`${pathname}${Hostpage}${currenPage - 1 || 1}`);
  };
  const HandleNext = () => {
    Router.push(`${pathname}${Hostpage}${currenPage + 1}`);
  };
  return (
    <div className="pagination-subpage-box">
      <button onClick={HandlePrev}>
        <span>prew</span>
      </button>
      {pages.map((pagi, ix) => {
        return (
          <Link href={pathname + Hostpage + pagi} key={ix}>
            <button className={currenPage === pagi ? "active" : ""}>
              <span>{pagi}</span>
            </button>
          </Link>
        );
      })}
      <button onClick={HandleNext}>
        <span>next</span>
      </button>
    </div>
  );
};

export default Pagination;
