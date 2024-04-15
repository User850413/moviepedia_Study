import { useEffect, useState } from "react";
import { getReviews } from "./api";
import ItemList from "./components/ItemList";
import "./App.css";

function App() {
  // App에 보여질 item
  const [items, setItems] = useState([]);
  // item이 정렬될 query문(기본은 최신순)
  const [order, setOrder] = useState("createdAt");
  // item 다섯 개만 가져오기
  const LIMIT = 5;
  const [hasNext, setHasNext] = useState(false);
  // offset 값
  const [offset, setOffset] = useState(0);
  // 로딩중인지?
  const [isLoading, setIsLoading] = useState(false);

  // 1. 데이터 가져오기
  // useEffect 콜백함수로 넣을 데이터 가져오는 함수

  async function loadReviews({ order, offset, limit }) {
    let result;

    try {
      setIsLoading(true);
      // 조건에 따라 가져오는 data
      result = await getReviews({ order, offset, limit });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
    const { reviews, paging } = await result;
    // paging hasNext값에 따른 hasNext state 변경
    setHasNext(paging.hasNext);

    // offset값에 따른 item 할당
    if (offset === 0) {
      setItems(reviews);
    } else {
      setItems([...items, ...reviews]);
    }
    setOffset(offset + LIMIT);
  }

  // 가져온 데이터를 화면 마운트 시 보여줘야 함 > useEffect
  // 정렬이 달라질 때마다 새로 데이터를 가져와야 함
  useEffect(() => {
    loadReviews({ order, offset, LIMIT });
  }, [order]);

  // 2. 데이터 정렬
  function handleOrderCreated() {
    setOrder("createdAt");
  }
  function handleOrderRating() {
    setOrder("rating");
  }

  // 3. 데이터 더 보기 버튼(페이지네이션)
  // 데이터를 다섯 개 더 가져오기
  function handleLoadMore() {
    loadReviews({ order, offset, limit: LIMIT });
  }

  // 4. 선택 데이터 삭제 후 리렌더링
  function handleDeleteClick(id) {
    const nextItems = items.filter((item) => {
      return item.id !== id;
    });
    setItems(nextItems);
  }

  return (
    <div className="App">
      <div className="btns">
        <button onClick={handleOrderCreated}>최신순</button>
        <button onClick={handleOrderRating}>평점순</button>
      </div>
      <ItemList items={items} handleDeleteClick={handleDeleteClick} />
      {hasNext && (
        <button disabled={isLoading} onClick={handleLoadMore}>
          더보기
        </button>
      )}
    </div>
  );
}

export default App;

// offset을 이용한 pagination 생각해보기!

