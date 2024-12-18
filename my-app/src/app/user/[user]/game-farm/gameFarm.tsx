"use client";
import { useState, useEffect, useRef, memo } from "react";
import "./gameFarm.css";
import { Container, ProgressBar } from "react-bootstrap";
import { collision } from "./collision";
const d = new Date();
let time = d.getTime();
const player = {
  id: 1,
  name: "hưng",
  level: 1,
  current_xp: 0,
  next_level_xp: 30,
};
const data = [
  {
    id: 1,
    tree: "lúa",
    image: "/game-farm/lua.png",
    price: 1,
    money: 2,
    time: 10,
    exe: 30, // Thời gian thu hoạch (giây)
    currentTSowseeds: time,
  },
  {
    id: 2,
    tree: "nho",
    image: "/game-farm/nho.png",
    price: 1,
    money: 2,
    time: 64,
    exe: 20,
    currentTSowseeds: time,
  },
  {
    id: 3,
    tree: "dưa",
    image: "/game-farm/dua.png",
    price: 1,
    money: 3,
    time: 124,
    exe: 30,
    currentTSowseeds: time,
  },
];

const leverDom: any = {
  lever_1: 30,
  lever_2: 60,
  lever_3: 70,
};

const leverDom_1 = [
  { leve_1: 30, open_lan: true },
  { leve_1: 60, open_lan: true },
  { leve_1: 100, open_lan: true },
  { leve_1: 140, open_lan: true },
];

const GameFarm = () => {
  const RefTreeDevelop = useRef<HTMLDivElement | null>(null);
  const [showTableTree, setShowTableTree] = useState(false);
  const [selectedTree, setSelectedTree] = useState(null); // Lưu cây được chọn
  const [harvestTime, setHarvestTime] = useState(0); // Thời gian còn lại để thu hoạch
  const [isHarvestable, setIsHarvestable] = useState<boolean>(false); // Trạng thái có thể thu hoạch
  const [price, setPrice] = useState(1000);
  const [Negative, setNegative] = useState(0);
  const [runChicken, setRunChicken] = useState<number>(0);
  const [isLevel, setLevel] = useState<number>(1);

  const runRandom = useRef();
  const refUer = useRef(null);
  const pressedKeys = useRef({});
  const [tilemapData, setTilemapData] = useState(null);
  const [tilemapDatass, setTilemapDatass] = useState(null);
  const [imageSource, setImageSource] = useState(null);
  const HandleShowtree = () => {
    setShowTableTree(!showTableTree);
    if (!selectedTree && RefTreeDevelop.current) {
      RefTreeDevelop.current.style.backgroundPosition = `0px`; // Đặt lại giao diện
    }
  };

  const handleSelectTree = (tree: any) => {
    if (selectedTree) {
      console.log("Đã chọn cây và không có thời gian thu hoạch");
      return;
    }
    setPrice(price - tree.price);
    setSelectedTree(tree); // Chọn cây trồng
    setHarvestTime(tree.time); // Đặt thời gian thu hoạch
    setIsHarvestable(false); // Đặt trạng thái chưa thu hoạch
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (harvestTime > 0) {
      timer = setInterval(() => {
        setHarvestTime((prev) => prev - 1);
      }, 1000);
    } else if (harvestTime === 0 && selectedTree) {
      setIsHarvestable(true); // Cây đã sẵn sàng để thu hoạch
    }
    return () => clearInterval(timer); // Dọn dẹp bộ đếm
  }, [harvestTime, selectedTree]);

  useEffect(() => {
    let growthTimer: NodeJS.Timeout;
    if (selectedTree) {
      const timeTreeDevelop = selectedTree?.time / 6;
      growthTimer = setInterval(() => {
        // console.log("cây phát triển");
        setNegative((prev) => {
          const newNegative = prev + -80;
          if (RefTreeDevelop.current) {
            RefTreeDevelop.current.style.backgroundPosition = `${newNegative}px`;
          }
          if (newNegative <= -400) {
            clearInterval(growthTimer); // Dừng bộ đếm
            return prev; // Giữ nguyên giá trị cũ
          }
          return newNegative;
        });

        return () => clearInterval(growthTimer);
      }, timeTreeDevelop * 1000);
    }
  }, [Negative, selectedTree]);
  const handleHarvest = () => {
    if (isHarvestable) {
      alert(`Thu hoạch  thành công!`);
      setSelectedTree(null); // Xóa cây sau khi thu hoạch
      setIsHarvestable(false); // Đặt trạng thái không thể thu hoạch
      setPrice(price + selectedTree?.money);
      player.current_xp += selectedTree?.exe;
    }
  };
  // lever
  useEffect(() => {
    if (player.current_xp >= player.next_level_xp) {
      const remainingXp = player.current_xp - player.next_level_xp;
      setLevel((prev) => prev + 1);
      player.current_xp = remainingXp;
      // Cập nhật next_level_xp nếu cần
      player.next_level_xp += leverDom[`lever_${player.level}`];
    }
  }, [player.current_xp]); // Theo dõi XP

  // useEffect(() => {
  //   const refRd = runRandom.current;
  //   if (refRd) {
  //     const moveRandom = () => {
  //       const data = refRd;
  //       const boxWidth = data.parentElement.clientWidth; // Lấy kích thước khung chứa
  //       const boxHeight = data.parentElement.clientHeight;
  //       const ballWidth = data.offsetWidth;
  //       const ballHeight = data.offsetHeight;
  //       const randomX = Math.random() * (boxWidth - ballWidth);
  //       const randomY = Math.random() * (boxHeight - ballHeight);

  //       data.style.transform = `translate(${randomX}px, ${randomY}px)`;
  //     };

  //     const interval = setInterval(moveRandom, 5000); // Thay đổi vị trí mỗi giây

  //     // Cleanup interval khi component bị hủy
  //     return () => clearInterval(interval);
  //   }
  // }, [runRandom.current]);

  useEffect(() => {
    const data = runRandom.current;
    let timeRun: NodeJS.Timeout;
    timeRun = setInterval(() => {
      setRunChicken((prev) => {
        const newRunValue = prev - 50;
        if (data) {
          data.style.backgroundPosition = `${newRunValue}px`;
        }
        if (newRunValue <= -200) {
          return 0;
        }
        return newRunValue; // Trả về giá trị mới
      });
    }, 500);
    return () => clearInterval(timeRun);
  }, []);

  // const [map2d, setMap2d] = useState([]);
  // useEffect(() => {
  //   if (!collision || !collision.data) return; // Kiểm tra nếu `collision` chưa sẵn sàng

  //   const calculate2DMap = (collision) => {
  //     const width = collision.width || 0;
  //     const height = collision.height || 0;
  //     const tileArray = collision.data || [];
  //     const calculatedMap2d = [];

  //     for (let row = 0; row < height; row++) {
  //       const tileRow = tileArray.slice(row * width, (row + 1) * width); // Lấy hàng từ mảng 1D
  //       calculatedMap2d.push(tileRow);
  //     }

  //     return calculatedMap2d;
  //   };

  //   const calculatedMap = calculate2DMap(collision);
  //   setMap2d(calculatedMap); // Chỉ cập nhật trạng thái một lần
  // }, []); // Chỉ chạy khi `collision` thay đổi

  // useEffect(() => {
  //   const userPlayer = refUer?.current;
  //   const handleKeydow = (e: any) => {
  //     const currentLeft = userPlayer.offsetLeft || 0;
  //     const currentTop = userPlayer.offsetTop || 0;
  //     switch (e.key) {
  //       case "ArrowDown":
  //         userPlayer.style.top = `${currentTop + 10}px`;
  //         break;
  //       case "ArrowUp": // Up
  //         console.log("up");
  //         userPlayer.style.top = `${currentTop - 10}px`;
  //         break;
  //       case "ArrowLeft": // Left
  //         console.log("left");
  //         userPlayer.style.left = `${currentLeft - 10}px`;
  //         break;
  //       case "ArrowRight": // Right
  //         console.log("right");
  //         userPlayer.style.left = `${currentLeft + 10}px`;
  //         break;
  //       default:
  //         break;
  //     }
  //   };
  //   document.addEventListener("keydown", handleKeydow);
  //   return () => {
  //     document.removeEventListener("keydown", handleKeydow);
  //   };
  // }, []);

  useEffect(() => {
    const userPlayer = refUer.current;
    let impacts = document.querySelectorAll(".impact");
    console.log(impacts);
    // clientWidth
    const handleKeyDown = (e: any) => {
      pressedKeys.current[e.key] = true; // Đánh dấu phím đang nhấn

      // Kiểm tra tổ hợp phím
      if (
        pressedKeys.current["ArrowDown"] &&
        pressedKeys.current["ArrowLeft"]
      ) {
        console.log("Move diagonally down-left");
        movePlayer(userPlayer, -10, 10, "/game-farm/player/playerDown.png"); // Đi chéo xuống trái
      } else if (
        pressedKeys.current["ArrowDown"] &&
        pressedKeys.current["ArrowRight"]
      ) {
        console.log("Move diagonally down-right");
        movePlayer(userPlayer, 10, 10, "/game-farm/player/playerDown.png"); // Đi chéo xuống phải
      } else if (
        pressedKeys.current["ArrowUp"] &&
        pressedKeys.current["ArrowLeft"]
      ) {
        console.log("Move diagonally up-left");
        movePlayer(userPlayer, -10, -10, "/game-farm/player/playerUp.png"); // Đi chéo lên trái
      } else if (
        pressedKeys.current["ArrowUp"] &&
        pressedKeys.current["ArrowRight"]
      ) {
        console.log("Move diagonally up-right");
        movePlayer(userPlayer, 10, -10, "/game-farm/player/playerUp.png"); // Đi chéo lên phải
      } else if (pressedKeys.current["ArrowDown"]) {
        console.log("Move down");
        movePlayer(userPlayer, 0, 10, "/game-farm/player/playerDown.png"); // Đi xuống
      } else if (pressedKeys.current["ArrowUp"]) {
        console.log("Move up");
        movePlayer(userPlayer, 0, -10, "/game-farm/player/playerUp.png"); // Đi lên
      } else if (pressedKeys.current["ArrowLeft"]) {
        console.log("Move left");
        movePlayer(userPlayer, -10, 0, "/game-farm/player/playerLeft.png"); // Đi trái
      } else if (pressedKeys.current["ArrowRight"]) {
        console.log("Move right");
        movePlayer(userPlayer, 10, 0, "/game-farm/player/playerRight.png"); // Đi phải
      }
    };

    const handleKeyUp = (e) => {
      delete pressedKeys.current[e.key]; // Xóa phím khi thả ra
    };
    let frame = 0;
    // Hàm di chuyển đối tượng
    const movePlayer = (element, deltaX, deltaY, color) => {
      if (!element) return;
      console.log(deltaX);
      const currentLeft = element.offsetLeft || 0;
      const currentTop = element.offsetTop || 0;
      const currentwidth = element.clientWidth || 64;
      const currentHeight = element.offsetHeight || 64; // Chiều cao của player

      const newLeft = currentLeft + deltaX;
      const newTop = currentTop + deltaY;

      // Kiểm tra va chạm
      // for (let i = 0; i < impacts.length; i++) {
      //   const impact = impacts[i];
      //   const impactRect = impact.getBoundingClientRect();
      //   const playerRect = {
      //     left: newLeft,
      //     top: newTop,
      //     right: newLeft + currentwidth,
      //     bottom: newTop + currentHeight,
      //   };

      //   // Nếu có va chạm thì return
      //   if (
      //     playerRect.right > impactRect.left &&
      //     playerRect.left < impactRect.right &&
      //     playerRect.bottom > impactRect.top &&
      //     playerRect.top < impactRect.bottom
      //   ) {
      //     console.log("Collision detected with", impact);
      //     return;
      //   }
      // }

      element.style.left = `${currentLeft + deltaX}px`;
      element.style.top = `${currentTop + deltaY}px`;
      element.style.backgroundImage = `url(${color})`;
      frame = (frame + 1) % 4; // Giả sử có 4 khung hình
      element.style.backgroundPositionX = `${-frame * currentwidth}px`;
    };

    // Lắng nghe sự kiện
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      // Xóa sự kiện khi component unmount
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <>
      <Container>
        <div className="gameWrapper">
          <div className="map">
            <div className="home "></div>
            {/* <div className="pond-joint"></div> */}
            {showTableTree && (
              <div className={`show_table-tree--box `}>
                <div className="show_tablee-tree">
                  <span>Chọn cây:</span>
                  {data.map((item) => (
                    <div key={item.id} className="tree-option">
                      <button onClick={() => handleSelectTree(item)}>
                        {item.tree}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* <div className="farm-chicken-box" ref={runRandom}></div> */}
            <div id="plotWrapper" className="plotWrapper">
              {/* Khi nhấn vào ô đất, mở bảng chọn cây */}
              <div className="plotBoxSaved " onClick={HandleShowtree}>
                <div
                  title={
                    isHarvestable
                      ? "Click để thu hoạch!"
                      : selectedTree
                      ? "Đang phát triển..."
                      : "Ready for Planting"
                  }
                  className={`plotBox plot impact ${
                    isHarvestable ? "harvest" : "ready"
                  }`}
                  ref={RefTreeDevelop}
                  style={{
                    backgroundPosition: 0,
                    backgroundImage: selectedTree
                      ? `url(${selectedTree.image})`
                      : "/game-farm/lua.png", // Hiển thị ảnh cây được chọn
                  }}
                  onClick={isHarvestable ? handleHarvest : undefined}
                ></div>
                {selectedTree && (
                  <span>
                    {isHarvestable
                      ? "Sẵn sàng thu hoạch"
                      : `Đang phát triển: ${harvestTime}s`}
                  </span>
                )}
              </div>
              <div
                title="Available for Purchase | Cost: $100"
                className="plotBox available tutorialOne"
              ></div>
            </div>

            <div className="UIWrapper">
              <ProgressBar
                now={(player.current_xp / player.next_level_xp) * 100}
                label={`XP: ${player.current_xp}/${player.next_level_xp}`}
              />
              <div className="level">Level: {isLevel}</div>
              <div className="money">
                <div className="emblem"></div>
                <div className="text">
                  <span>{price}$</span>
                  <span id="moneyBox"></span>
                </div>
                <div id="MoneyBoxMessage" className="message"></div>
              </div>
            </div>
            <div className="user-jonin" id={"isUser"} ref={refUer}></div>
            <div id="collision" className="rake"></div>
            <div className="UIMessageWrapper">
              <div id="UIMessageWrapper" className="messsage"></div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default GameFarm;
