import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import {usePrevious} from './components/Todo';

const useStyles = makeStyles({
  wrapper: {
    width: "100%",
    maxWidth: "65rem"
  },
  elevatioin12: {
    boxShadow: "0px 7px 8px -4px rgb(0 0 0 / 12%), 0px 12px 17px 2px rgb(0 0 0 / 6%), 0px 5px 22px 4px rgb(0 0 0 / 6%)"
  }
});

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const URL = "https://handy-todo-backend.herokuapp.com/api/todos/"

const FILTER_MAP = {
  All: () => true,
  Active: todo => !todo.completed,
  Completed: todo => todo.completed
}

const FILTER_NAMES = Object.keys(FILTER_MAP);

//=============App component================
function App() {
  const classes = useStyles();

  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('All');

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
  }

  // list of filter buttons
  const filterButtons = FILTER_NAMES.map(name => (
    <FilterButton key={name} name={name} pressed={name === filter} setFilter={setFilter} />
  ));

  const addTask = (name) => {
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
    <Paper elevation={12} className={`todoapp stack-large ${classes.wrapper} ${classes.elevatioin12}`}>
      <h1>HandyTodo</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterButtons}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {todos.length > 1 ? `${todos.length} tasks remaining` : `${todos.length} task remaining`}
      </h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {todos.filter(FILTER_MAP[filter]).map(todo => <Todo key={todo.id} id={todo.id} name={todo.name} completed={todo.completed} onCheckChange={handleOnCheckChange} onClickDelete={handleOnClickDelete} onClickSave={handleOnClickSave} />)}
      </ul>
    </Paper>
  );
}

export default App;
