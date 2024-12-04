import { useState } from "react";
import "./App.css";

export default function App() {
  let [data, setData] = useState([
    {
      id: 1,
      title: "title 1",
      desc: "desc 1",
    },
    {
      id: 2,
      title: "title 2",
      desc: "desc 2",
    },
    {
      id: 3,
      title: "title 3",
      desc: "desc 3",
    },
  ]);

  //Add!
  const [modalAdd, setModalAdd] = useState(false);
  const [inpAddTitle, setInpAddTitle] = useState("");
  const [inpAddDesc, setInpAddDesc] = useState("");

  //edit!
  const [modalEdit, setModalEdit] = useState(false);
  const [inpEdittitle, setInpEditTitle] = useState("");
  const [inpEditDesc, setInpEditDesc] = useState("");
  const [idx, setIdx] = useState(null);

  function clearAll() {
    setInpEditTitle("");
    setInpEditDesc("");
    setInpAddTitle("");
    setInpAddDesc("");
    setIdx(null);
  }

  function del(id) {
    setData(data.filter((el) => el.id !== id));
  }

  function edit() {
    setData(
      data.map((el) => {
        if (el.id === idx) {
          el.title = inpEdittitle;
          el.desc = inpEditDesc;
        }
        return el;
      })
    );
    clearAll();
    setModalEdit(false);
  }

  function showEdit(el) {
    setModalEdit(true);
    setInpEditTitle(el.title);
    setInpEditDesc(el.desc);
    setIdx(el.id);
  }

  function add(e) {
    e.preventDefault(); // предотвращаем перезагрузку страницы при отправке формы
    if (inpAddTitle && inpAddDesc) {
      setData([
        ...data,
        {
          title: inpAddTitle,
          desc: inpAddDesc,
          id: Date.now(),
        },
      ]);
      clearAll(); // Очищаем поля после добавления
      setModalAdd(false); // Закрываем модальное окно
    }
  }

  return (
    <>
      <div>
        <button onClick={() => setModalAdd(true)}>Add New</button>
        {modalAdd && (
          <div>
            <div>
              <form onSubmit={add}>
                <input
                  type="text"
                  value={inpAddTitle}
                  onChange={(e) => setInpAddTitle(e.target.value)}
                />
                <input
                  type="text"
                  value={inpAddDesc}
                  onChange={(e) => setInpAddDesc(e.target.value)}
                />
                <button type="button" onClick={() => setModalAdd(false)}>
                  cancel
                </button>
                <button type="submit">Add</button>
              </form>
            </div>
          </div>
        )}
      </div>

      {modalEdit && (
        <div className="backdrop">
          <div>
            <form onSubmit={(e) => { e.preventDefault(); edit(); }}>
              <input
                type="text"
                required
                value={inpEdittitle}
                onChange={(e) => setInpEditTitle(e.target.value)}
              />
              <input
                type="text"
                required
                value={inpEditDesc}
                onChange={(e) => setInpEditDesc(e.target.value)}
              />
              <button onClick={() => setModalEdit(false)}>cancel</button>
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Desc</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((el) => {
            return (
              <tr key={el.id}>
                <td>{el.title}</td>
                <td>{el.desc}</td>
                <td>
                  <button onClick={() => del(el.id)}>delete</button>
                  <button onClick={() => showEdit(el)}>edit</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
