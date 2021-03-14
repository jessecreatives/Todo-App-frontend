import React, {useState} from 'react';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import CloseIcon from '@material-ui/icons/Close';
import {theme} from '../styles/Theme';

const NewTodoModal = ({addTodo, closeModal, isOpen}) => {

    const [input, setInput] = useState('');

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo(input);
        setInput('');
        closeModal();
    }

    const handleCancel = () => {
        closeModal();
    }

    return (
        <Modal open={isOpen}>
            <Paper style={{borderRadius: "1rem", padding: theme.spacing(4), margin: theme.spacing(4), marginTop: theme.spacing(8)}}>
                <IconButton style={{position: "absolute", top: "0.5rem", right: "0.5rem", color: "#fff"}} onClick={handleCancel}>
                    <CloseIcon style={{fontSize: "2rem"}} />
                </IconButton>
                <form onSubmit={handleSubmit}>
                    <Typography variant="h2" align="center" style={{marginBottom: theme.spacing(2)}}>何をする予定ですか？</Typography>
                    <FormControl fullWidth style={{marginBottom: theme.spacing(4)}}>
                        <InputLabel htmlFor="new-todo">新タスク</InputLabel>
                        <Input id="new-todo" aria-describedby="new-todo" value={input}
                        onChange={handleChange} />
                    </FormControl>
                    <Button variant="contained" type="submit" fullWidth color="secondary">追加</Button>
                </form>
            </Paper>
        </Modal>
    );
};

export default NewTodoModal;