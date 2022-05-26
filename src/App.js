import "./styles.css";
import { useState } from "react";

function App() {
  let [titles, setTitle] = useState([
    "자바 독학",
    "C언어 독학",
    "파이썬 독학",
    "자바스크립트 독학"
  ]);
  let likeList = titles.map((title) => 0);
  const [likes, setLike] = useState(likeList);
  const [modalState, setModalState] = useState(true);

  const [modalTitle, setModalTitle] = useState("");
  const changeTitle = (titles, setTitle) => (e) => {
    let copiedTitles = [...titles];
    copiedTitles[0] = "자바 독학 완료";
    setTitle(copiedTitles);
  };

  return (
    <div className="App">
      {titles.map((title, index) => {
        return (
          <div className="list" key={index}>
            <h4
              onClick={() => {
                setModalTitle(title);
                setModalState(!modalState);
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
            <p>5월 n일 발행</p>
          </div>
        );
      })}

      {modalState ? (
        <Modal
          titles={titles}
          changeModalTitle={changeTitle(titles, setTitle)}
          modalTitle={modalTitle}
        ></Modal>
      ) : null}
    </div>
  );
}

function Modal(props) {
  return (
    <div>
      <h4>{props.modalTitle}</h4>
      <p>날짜</p>
      <button onClick={props.changeModalTitle}>수정</button>
    </div>
  );
}

export default App;
