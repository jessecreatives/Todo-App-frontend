import React, {useState, useRef, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';

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
    <Grid container className="stack-small" onSubmit={handleSubmit}>
      <Grid item xs={9} className="c-cb">
        <input ref={editFieldRef} type="text" className="todo-text" id={id} value={input} onChange={(e) => setInput(e.target.value)} />
      </Grid>
      <Grid item xs={3}>

      </Grid>
      <div className="btn-group">
        <IconButton aria-label="edit" color="success" type="submit">
          <DoneOutlinedIcon />
        </IconButton>
        <IconButton aria-label="delete" color="secondary" onClick={() => setIsEditing(false)}>
          <ClearOutlinedIcon />
        </IconButton>
      </div>
    </Grid>
  );

  const viewTemplate = (
    <Grid container className="stack-small">
      <Grid item xs={9} className="c-cb">
        <input id={id} type="checkbox" defaultChecked={completed} onChange={() => onCheckChange(id)} />
        <label className="todo-label" htmlFor={id}>
          {name}
        </label>
      </Grid>
      <Grid item xs={3} className="btn-group">
        <IconButton aria-label="edit" color="primary" ref={editButtonRef} onClick={() => setIsEditing(true)}>
          <EditOutlinedIcon fontSize="large" />
        </IconButton>
        <IconButton aria-label="delete" color="secondary" onClick={() => onClickDelete(id)}>
          <DeleteOutlineOutlinedIcon fontSize="large" />
        </IconButton>
      </Grid>
    </Grid>
  );

  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}