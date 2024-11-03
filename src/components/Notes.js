import React, { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import "./Notes.css";

export default function Notes() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [noteText, setNoteText] = useState("");
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const saveNote = () => {
    if (noteText.trim()) {
      if (selectedNoteIndex !== null) {
        const updatedNotes = [...notes];
        updatedNotes[selectedNoteIndex] = noteText;
        setNotes(updatedNotes);
      } else {
        setNotes([...notes, noteText]);
      }
      setNoteText("");
      setSelectedNoteIndex(null);
    }
  };

  const selectNote = (index) => {
    setNoteText(notes[index]);
    setSelectedNoteIndex(index);
  };

  return (
    <>
      <div
        className="main"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "aqua",
          width: "100%",
          height: "100vh",
        }}
      >
        <div className="notesSection">
          <div
            className="heading"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h1
              style={{
                color: "blue",
                textDecoration: "underline",
                fontSize: 40,
              }}
            >
              Electron
            </h1>
            <div className="typewriting-effect" style={{ margin: "10px" }}>
              <TypeAnimation
                sequence={["Note quickly", 1000, "Edit efficiently", 1000]}
                wrapper="span"
                speed={50}
                style={{
                  fontSize: "1.5em",
                  fontStyle: "italic",
                  fontWeight: 600,
                }}
                repeat={Infinity}
              />
            </div>
          </div>
          <div
            className="notes"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <textarea
              className="notesArea"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Write your note here..."
              rows={4}
              cols={50}
              style={{
                width: "70%",
                height: "30vh",
                borderRadius: "10px",
                margin: "10px",
                padding: "10px",
                backgroundColor: "seashell",
                fontSize: "20px",
              }}
            />
            <button onClick={saveNote} className="button">
              {selectedNoteIndex !== null ? "Update" : "Save"}
            </button>
          </div>
        </div>
        <div className="notesPreview" style={{ overflowY: "auto" }}>
          <h2>Saved Notes</h2>
          <ul>
            {notes.map((note, index) => (
              <li
                className="list"
                key={index}
                onClick={() => selectNote(index)}
                style={{
                  backgroundColor: "lightpink",
                  margin: "10px",
                  padding: "10px",
                  border: "2px solid grey",
                  borderRadius: "10px",
                  cursor: "pointer",
                  maxWidth: "300px",
                  maxHeight: "auto",
                  transition: "box-shadow 0.3s ease",
                }}
              >
                {note.slice(0, 40)}
                {note.length > 40 && "...."}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
