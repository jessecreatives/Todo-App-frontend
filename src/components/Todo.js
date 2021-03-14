import React, {useState, useRef, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
<<<<<<< HEAD
import Checkbox from '@material-ui/core/Checkbox';
=======
import CheckBox from '@material-ui/core/CheckBox';
>>>>>>> cac1bb731b28f03f2f4ce9bfc21ee51922a3c595
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
  const [isExpanded, setIsExpanded] = useState(false);

  const wasEditing = usePrevious(isEditing);

  const handleSubmit = (e) => {
    e.preventDefault();
    onClickSave(id, input);
    setIsEditing(false);
    handleExpansion(id)(false);
  }

  const handleExpansion = (id) => (e, isExpanded) => {
    setIsExpanded(isExpanded ? id : false);
  }

  const handleCancel = e => {
    setIsEditing(false);
    handleExpansion(id)(false);
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
    <Accordion expanded={isExpanded === id} onChange={handleExpansion(id)}>
      <AccordionSummary 
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${name} accordion`}
        style={{marginBottom: 0}}
      >
        <FormControlLabel 
          aria-label={name}
          onClick={(e) => e.stopPropagation()}
          onFocus={(e) => e.stopPropagation()}
<<<<<<< HEAD
          control={<Checkbox checked={completed} onChange={() => onCheckChange(id)} />}
=======
          control={<CheckBox checked={completed} onChange={() => onCheckChange(id)} />}
>>>>>>> cac1bb731b28f03f2f4ce9bfc21ee51922a3c595
          style={{marginRight: 0}}
        />
        <FormControlLabel 
          aria-label={name}
          onClick={(e) => e.stopPropagation()}
          onFocus={(e) => e.stopPropagation()}
          control={<Input ref={editFieldRef} id={id} value={input} onChange={(e) => setInput(e.target.value)} />}
          style={{margin: 0}}
        />
      </AccordionSummary>
      <AccordionDetails onSubmit={handleSubmit} style={{marginBottom: "1.2rem"}}>
        <form onSubmit={handleSubmit} style={{width: "100%", borderRadius: 0, display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
          <Button variant="contained" color="secondary" aria-label="save" type="submit" style={{width: "48%"}}>保存</Button>
          <Button variant="outlined" color="secondary" aria-label="cancel" onClick={handleCancel} style={{width: "48%", borderWidth: "0.2rem"}}>キャンセル</Button>
        </form>
      </AccordionDetails>
    </Accordion>
);

  const viewTemplate = (
    <Accordion style={{borderRadius: 0}} expanded={isExpanded === id} onChange={handleExpansion(id)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <FormControlLabel 
          aria-label={name}
          onClick={(e) => e.stopPropagation()}
          onFocus={(e) => e.stopPropagation()}
<<<<<<< HEAD
          control={<Checkbox checked={completed} onChange={() => onCheckChange(id)} />}
=======
          control={<CheckBox checked={completed} onChange={() => onCheckChange(id)} />}
>>>>>>> cac1bb731b28f03f2f4ce9bfc21ee51922a3c595
          label={name}
          style={{marginRight: 0}}
        />
      </AccordionSummary>
      <AccordionDetails style={{borderRadius: 0, flexDirection: "row", justifyContent: "space-between"}}>
        <Button variant="contained" aria-label="edit" color="secondary" ref={editButtonRef} onClick={() => setIsEditing(true)} style={{width: "48%"}}>編集</Button>
        <Button variant="outlined" color="secondary" aria-label="delete" onClick={() => onClickDelete(id)} style={{width: "48%", borderWidth: "0.2rem"}}>削除</Button>
      </AccordionDetails>
    </Accordion>
  );

  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}