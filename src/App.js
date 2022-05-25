import "./styles.css";
import { useState } from "react";

function App() {
  let [titles, setTitle] = useState([
    "남자코트 추천",
    "강남 우동맛집",
    "파이썬 독학",
    "자바스크립트 독학"
  ]);
  let likeList = titles.map((title) => 0);
  let [likes, setLike] = useState(likeList);

  return (
    <div className="App">
      {titles.map((title, index) => {
        return (
          <div className="list" key={index}>
            <h4>
              {titles[index]}
              <span
                onClick={() => {
                  let copyLikes = [...likes];
                  copyLikes[index] = copyLikes[index] + 1;
                  setLike(copyLikes);
                }}
              >
                like
              </span>
              {likes[index]}
            </h4>
            <p>5월 25일 발행</p>
          </div>
        );
      })}
      <Modal titles={titles}></Modal>
    </div>
  );
}

function Modal({ titles }) {
  return (
    <div>
      <h4>{titles}</h4>
      <p>날짜</p>
    </div>
  );
}

export default App;
