import React, {useState, useRef, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CheckBox from '@material-ui/core/CheckBox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

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
    <Accordion>
      <AccordionSummary 
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${name} accordion`}
      >
      
        <CheckBox checked={completed} onChange={() => onCheckChange(id)} />
        <TextField ref={editFieldRef} id={id} value={input} onChange={(e) => setInput(e.target.value)} />
      </AccordionSummary>
      <AccordionDetails onSubmit={handleSubmit}>
        <Button aria-label="save" color="success" type="submit">保存</Button>
        <Button aria-label="cancel" onClick={() => setIsEditing(false)}>キャンセル</Button>
      </AccordionDetails>
    </Accordion>
);

  const viewTemplate = (
    <Accordion>
      <AccordionSummary>
        <FormControlLabel 
          aria-label={name}
          onClick={(e) => e.stopPropagation()}
          onFocus={(e) => e.stopPropagation()}
          control={<CheckBox checked={completed} onChange={() => onCheckChange(id)} />}
          label={name}
        />
      </AccordionSummary>
      <AccordionDetails onSubmit={handleSubmit}>
        <Button aria-label="edit" color="primary" ref={editButtonRef} onClick={() => setIsEditing(true)}>編集</Button>
        <Button aria-label="delete" onClick={() => onClickDelete(id)}>削除</Button>
      </AccordionDetails>
    </Accordion>
  );

  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}