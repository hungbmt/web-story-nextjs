import React from "react";

interface typeForm {
  HandleSubmit: (e: React.FormEvent) => void;
  inputValue: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  data: Array<{ id: string; category: string }>;
  dataDb: Array<{ category: string; slug: string; list: string }>;
  loading: boolean;
  responseMessage: string;
}
const FormCreateMenu: React.FC<typeForm> = ({
  HandleSubmit,
  inputValue,
  handleChange,
  data,
  dataDb,
  loading,
  responseMessage,
}) => {
  return (
    <>
      <div className="form-box">
        <form className="form-create" onSubmit={(e) => HandleSubmit(e)}>
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Nhập danh mục..."
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Đang tạo..." : "+"}
          </button>
        </form>
        <div className="list-create">
          {responseMessage && (
            <p className="response-message">{responseMessage}</p>
          )}
          {/* {data.map((data, inx) => (
            <ul key={inx}>
              <li>
                <div className="catagory-box">
                  <i
                    className="fa-solid fa-bars me-3"
                    style={{ color: "#ccc" }}
                  ></i>
                  <div className="text-joint-ftct">
                    <span>{data.category}</span>
                    <div>
                      <span style={{ color: "#9e9a9a", fontSize: "12px" }}>
                        #{inx + 1}/{data.category}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="defaultCheck1"
                  />
                </div>
              </li>
            </ul>
          ))} */}
          {dataDb?.map((item, inx) => (
            <ul key={inx}>
              <li>
                <div className="catagory-box">
                  <i
                    className="fa-solid fa-bars me-3"
                    style={{ color: "#ccc" }}
                  ></i>
                  <div className="text-joint-ftct">
                    <span>
                      {item.category} {item.list}
                    </span>
                    <div>
                      <span style={{ color: "#9e9a9a", fontSize: "12px" }}>
                        #{inx + 1}/{item.slug}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="btn">
                  <i className="fa-solid fa-trash"></i>
                </button>
                {/* <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="defaultCheck1"
                  />
                </div> */}
              </li>
            </ul>
          ))}
        </div>
      </div>
    </>
  );
};

export default FormCreateMenu;
