import "./styles.css";
import { useState } from "react";

function App() {
  let [titles, setTitle] = useState([
    "자바 독학",
    "C언어 독학",
    "파이썬 독학",
    "자바스크립트 독학"
  ]);

  // likeList는 titles state 가 변경될 때마다 바뀌지만
  // likeList에 새로운 값이 할당될 때마다 likes 의 상태를 setLikes로
  // 변경하지 않으니 아무 변화가 없는 것?
  // likeList는 처음 전체 렌더링 될 때의 초기값일 뿐인건가..?
  let likeList = titles.map((title) => 0);
  const [likes, setLike] = useState(likeList);
  const [modalState, setModalState] = useState(true);
  const [modalTitle, setModalTitle] = useState("");
  const changeTitle = (titles, setTitle) => (e) => {
    let copiedTitles = [...titles];
    if (copiedTitles[0] === "자바 독학 완료") {
      copiedTitles[0] = "자바 독학";
      setTitle(copiedTitles);
    } else if (copiedTitles[0] === "자바 독학") {
      copiedTitles[0] = "자바 독학 완료";
      setTitle(copiedTitles);
    }
  };
  const [inputValue, setInputValue] = useState("");

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
                onClick={(e) => {
                  e.stopPropagation();
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
            <button
              onClick={() => {
                // 삭제시 likes state의 상태를 바꾸지 않는다면
                // likes state인 배열에는 삭제된 목록의 likes값도 남아있는 것인가..?
                let copiedTitles = [...titles];
                let copiedLikes = [...likes];

                copiedTitles.splice(index, 1);
                copiedLikes.splice(index, 1);
                setTitle(copiedTitles);
                setLike(copiedLikes);
                console.log(likes);
              }}
            >
              삭제
            </button>
          </div>
        );
      })}

      <input
        type="text"
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
      <button
        onClick={() => {
          let copiedTitles = [...titles];
          let copiedLikes = [...likes];

          copiedTitles.unshift(inputValue);
          copiedLikes.unshift(0);

          setTitle(copiedTitles);
          setLike(copiedLikes);
        }}
      >
        추가
      </button>

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
