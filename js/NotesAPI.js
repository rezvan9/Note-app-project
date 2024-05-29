const notes = [
  {
    id: 1,
    title: "first note",
    body: "this is my first note",
    updated: "2024-05-19T18:15:21.697Z",
  },
  {
    id: 2,
    title: "second note",
    body: "this is my second note",
    updated: "2024-03-19T15:15:21.697Z",
  },
  {
    id: 3,
    title: "third note",
    body: "this is my third note",
    updated: "2023-03-19T15:15:21.697Z",
  },
];

export default class NotesAPI {
  static getAllNotes() {
    const savedNote = JSON.parse(localStorage.getItem("notes-app")) || [];
    return savedNote.sort((a, b) => {
      return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
    });
  }

  static saveNote(noteToSave) {
    const notes = NotesAPI.getAllNotes();
    const existedNote = notes.find((n) => n.id == noteToSave.id);

    if (existedNote) {
      existedNote.title = noteToSave.title;
      existedNote.body = noteToSave.body;
      existedNote.updated = new Date().toISOString();
    } else {
      noteToSave.id = new Date().getTime();
      noteToSave.updated = new Date().toISOString();
      notes.push(noteToSave);
    }

    localStorage.setItem("notes-app", JSON.stringify(notes));
  }

  static deleteNote(id) {
    const notes = NotesAPI.getAllNotes();
    const filteredNotes = notes.filter((n) => n.id != id);
    localStorage.setItem("notes-app", JSON.stringify(filteredNotes));
  }
}
