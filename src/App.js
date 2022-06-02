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
                let copiedTitles = [...titles];
                let copiedLikes = [...likes];

                copiedTitles.splice(index, 1);
                copiedLikes.splice(index, 1);
                setTitle(copiedTitles);
                // setTitle 로 title state가 변경되어 목록이 다시 랜더링 될 때
                // setLike()로 like state에서 삭제된 인덱스에 해당하는 부분을 삭제하지 않아도
                // like 가 화면에 잘 출력되는 이유는..?
                // -> 예상결과 : titles.map 이 재호출되며 목록이 생성될 때 likes의 원소에 해당하는 값이
                // 순차적으로 출력되어 삭제된 목록의 like 값이 밀린 상태로 화면에 출력
                setLike(copiedLikes);
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
        onClick={(e) => {
          if (inputValue === "") {
            e.preventDefault();
            return;
          }

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
