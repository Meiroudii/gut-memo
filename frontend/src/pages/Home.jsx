import { useState, useEffect } from "react";
import Note from "../components/Note";
import api from "../api"
import "../styles/Home.css"

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("")

  useEffect(() => {
    getNotes();
  }, [])

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api.delete(`/api/notes/delete/${id}/`).then((res) => {
      if (res.status === 204) alert(`The Note ${id} has been deleted.`)
      else alert(`The Note ${id} was failed to delete.`)
      getNotes()
    }).catch((error) => alert(error))
  }

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) alert("Note created!"); //Change this thing into more descriptive!!!!!!!!!
        else alert("Failed to make note.");
        getNotes();
      }).catch((err) => alert(err));
  };

  return <>
    <div>
      <h2>Notes</h2>
      {notes.map((note) => (
        <Note
          note={note}
          onDelete={deleteNote}
          key={note.id}
        />
      ))}
    </div>
    <h2>Create a Note</h2>
    <form onSubmit={createNote}>
      <label htmlFor="title">Title:</label>
      <br />
      <input
        type="text"
        id="title"
        name="title"
        required
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <br />
      <label htmlFor="content">Content:</label>
      <br />
      <textarea
        id="content"
        name="content"
        required
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <br />
      <input type="submit" value="Submit"></input>
    </form>
  </>
}

export default Home;
