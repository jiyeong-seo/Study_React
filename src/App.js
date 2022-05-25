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
  const [likes, setLike] = useState(likeList);
  const [modalState, setModal] = useState(true);
  const changeModalTitle = (titlesItem, setTitleFunc) => (e) => {
    let copiedTitles = [...titlesItem];
    copiedTitles[0] = "여자코트 추천";
    setTitleFunc(copiedTitles);
  };

  return (
    <div className="App">
      {titles.map((title, index) => {
        return (
          <div className="list" key={index}>
            <h4
              onClick={() => {
                setModal(!modalState);
              }}
            >
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
      {modalState ? (
        <Modal
          titles={titles[0]}
          changeModalTitle={changeModalTitle(titles, setTitle)}
        ></Modal>
      ) : null}
    </div>
  );
}

function Modal(props) {
  return (
    <div>
      <h4>{props.titles}</h4>
      <p>날짜</p>
      <button onClick={props.changeModalTitle}>수정</button>
    </div>
  );
}

export default App;
