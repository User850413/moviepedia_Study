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
  const [limit, setLimit] = useState(LIMIT);
  const [hasNext, setHasNext] = useState(true);

  // 1. 데이터 가져오기
  // useEffect 콜백함수로 넣을 데이터 가져오는 함수
  async function loadReviews() {
    const getReviewsData = await getReviews({ order, limit });
    const { reviews, paging } = await getReviewsData;
    setHasNext(paging.hasNext);
    setItems(reviews);
  }

  // 가져온 데이터를 화면 마운트 시 보여줘야 함 > useEffect
  // 정렬이 달라질 때마다 새로 데이터를 가져와야 함
  useEffect(() => {
    loadReviews();
  }, [order, limit]);

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
    setLimit(limit + LIMIT);
  }

  return (
    <div className="App">
      <div className="btns">
        <button onClick={handleOrderCreated}>최신순</button>
        <button onClick={handleOrderRating}>평점순</button>
      </div>
      <ItemList items={items} />
      {hasNext && <button onClick={handleLoadMore}>더보기</button>}
    </div>
  );
}

export default App;

