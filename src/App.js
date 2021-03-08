import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Paper from '@material-ui/core/Paper';
import Todo from './components/Todo';
import Modal from './components/Modal';
import FilterButton from './components/FilterButton';
import {usePrevious} from './components/Todo';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  title: {
    color: theme.palette.primary.main,
    textAlign: "center",
    marginBottom: "3rem"
  },
  subtitle: {
    color: theme.palette.primary.main,
    marginBottom: "3rem",
    marginTop: "0"
  },
  textColor: {
    color: theme.palette.primary.main,
  },
  wrapper: {
    position: "relative",
    width: "100%",
    maxWidth: "65rem",
    marginTop: "4rem",
    padding: "4rem 4rem 20rem",
    [theme.breakpoints.up("sm")]: {
      padding: "4rem 8rem 20rem"
    }
  },
  elevatioin12: {
    boxShadow: "0px 7px 8px -4px rgb(0 0 0 / 12%), 0px 12px 17px 2px rgb(0 0 0 / 6%), 0px 5px 22px 4px rgb(0 0 0 / 6%)"
  },
  button: {
    fontSize: "1.2rem",
    [theme.breakpoints.up('sm')]: {
      fontSize: "1.5rem",
    },
  },
  addButton: {
    padding: "0",
    fontSize: "8rem",
    position: "absolute",
    right: "4rem",
    bottom: "2rem",
    [theme.breakpoints.up("sm")]: {
      right: "8rem"
    }
  },
  group: {
    margin: "0",
    marginBottom: "3rem",
  }
}));

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const URL = "https://handy-todo-backend.herokuapp.com/api/todos/"

const FILTER_MAP = {
  "全て": () => true,
  "未完了": todo => !todo.completed,
  "完了": todo => todo.completed
}

const FILTER_NAMES = Object.keys(FILTER_MAP);

//=============App component================
function App() {
  const classes = useStyles();

  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('全て');
  const [isModalOpen, setIsModalOpen] = useState(false)

  // get data
  useEffect(() => {
    updateList();
  }, []);

  // helper function
  const updateList = () => {
    axios
      .get(URL)
      .then(res => setTodos(res.data))
      .catch(err => console.log(err));
  };

  const addTodo = (name) => {
    axios
      .post(URL, {name})
      .then(res => updateList())
      .catch(err => console.log(err));
  }

  const handleOnCheckChange = (id) => {
    const todo = todos.find(todo => todo.id === id);
    const currentCompleted = todo.completed;
    axios
      .patch(`${URL}${id}/`, {completed: !currentCompleted})
      .then(res => updateList())
      .catch(err => console.log(err));
  }

  const handleOnClickDelete = (id) => {
    axios
      .delete(`${URL}${id}`)
      .then(res => updateList())
      .catch(err => console.log(err));
  }

  const handleOnClickSave = (id, newName) => {
    axios
      .patch(`${URL}${id}/`, {name: newName})
      .then(res => updateList())
      .catch(err => console.log(err));
  }

  const listHeadingRef = useRef(null);
  const prevTodosLength = usePrevious(todos.length);

  useEffect(() => {
    if (todos.length - prevTodosLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [todos.length, prevTodosLength]);

  return (
    <div>
      {isModalOpen && <Modal className={classes.modal} addTodo={addTodo} closeModal={() => setIsModalOpen(false)} />}
      <Paper elevation={12} className={`${classes.wrapper} ${classes.elevatioin12}`}>
        <h1 className={classes.title}>Handy Todo</h1>
        <div className={classes.root}>
          <ButtonGroup className={classes.group} size="large" color="primary" aria-label="outlined primary button group">
            {FILTER_NAMES.map(name => (
              <Button
                className={classes.button}
                key={name}
                name={name}
                pressed={name === filter}
                onClick={() => setFilter(name)}
              >
                  {name}
              </Button>
            ))}
          </ButtonGroup>
        </div>
        <h3 tabIndex="-1" className={classes.subtitle} ref={listHeadingRef}>
          未完了：{todos.length} 件
        </h3>
        <ul
          aria-labelledby="list-heading"
        >
          {todos.filter(FILTER_MAP[filter]).map(todo => <Todo key={todo.id} id={todo.id} name={todo.name} completed={todo.completed} onCheckChange={handleOnCheckChange} onClickDelete={handleOnClickDelete} onClickSave={handleOnClickSave} />)}
        </ul>
        {/* open modal button */}
        <IconButton className={classes.addButton} aria-label="add" onClick={() => setIsModalOpen(true)}>
          <AddCircleIcon fontSize="inherit" color="secondary" />
        </IconButton>
      </Paper>
    </div>
  );
}

export default App;
