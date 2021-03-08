import React, {useState} from 'react';
import {fade, makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const useStyles = makeStyles((theme) => ({
    modal: {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100vh",
        background: "rgba(0, 0, 0, 0.5)",
        zIndex: "1000",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    form: {
        position: "relative",
        top: "-15%",
        width: "80%",
        maxWidth: "50rem",
        margin: "0 auto",
        color: "#fff",
        textAlign: "center"
    },
    marginBottom: {
        marginBottom: "3rem"
    },
    input: {
        width: "100%",
        border: "none",
        padding: "2rem",
        marginBottom: "3rem"
    },
    submit: {
        width: "100%",
        background: theme.palette.success.main,
        color: "#fff",
        fontSize: "1.8rem",
        marginRight: "1.5rem",
        '&:hover': {
            background: theme.palette.success.light
        }
    },
    cancel: {
        width: "100%",
        background: "#fff",
        color: theme.palette.primary.main,
        fontSize: "1.8rem",
        marginLeft: "1.5rem",
        '&:hover': {
            background: fade("#fff", 0.8),
        }
    },
    group: {
        width: "100%",
    }
}));

const Modal = ({addTodo, closeModal}) => {
    const classes = useStyles();

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
        <div className={classes.modal}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <h2 className={classes.marginBottom}>
                <label htmlFor="new-todo-input">
                    何をする予定ですか？
                </label>
                </h2>
                <input 
                    type="text"
                    id='new-todo-input'
                    name='text'
                    className={classes.input}
                    value={input}
                    onChange={handleChange}
                    autoComplete='off'
                />
                <ButtonGroup className={classes.group}>
                    <Button type="submit" variant="contained" className={classes.submit}>追加</Button>
                    <Button variant="contained" className={classes.cancel} onClick={handleCancel}>キャンセル</Button>
                </ButtonGroup>
                
            </form>
        </div>
    );
};

export default Modal;