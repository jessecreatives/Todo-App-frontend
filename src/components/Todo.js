import React, {useState, useRef, useEffect} from 'react';

export const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function Todo({id, name, completed, onCheckChange, onClickDelete, onClickSave}) {
  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);
  const [input, setInput] = useState(name);

  const wasEditing = usePrevious(isEditing);

  const handleSubmit = (e) => {
    e.preventDefault();
    onClickSave(id, input);
    setIsEditing(false);
  }

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={id}>
          New name for {name}
        </label>
        <input ref={editFieldRef} type="text" className="todo-text" id={id} value={input} onChange={(e) => setInput(e.target.value)} />
      </div>
      <div className="btn-group">
        <button type="button" className="btn todo-cancel" onClick={() => setIsEditing(false)}>
          Cancel 
          <span className="visually-hidden">renaming {name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">New name for {name}</span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input id={id} type="checkbox" defaultChecked={completed} onChange={() => onCheckChange(id)} />
        <label className="todo-label" htmlFor={id}>
          {name}
        </label>
      </div>
      <div className="btn-group">
        <button ref={editButtonRef} type="button" className="btn" onClick={() => setIsEditing(true)}>
          Edit <span className="visually-hidden">{name}</span>
        </button>
        <button type="button" className="btn btn__danger" onClick={() => onClickDelete(id)}>
          Delete <span className="visually-hidden">{name}</span>
        </button>
      </div>
    </div>
  );

  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}