import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import {ThemeProvider, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import {usePrevious} from './components/Todo';
import {theme} from './styles/Theme';
import Todo from './components/Todo';
import NewTodoModal from './components/NewTodoModal';

const useStyles = makeStyles({
  hero: {
    background: theme.palette.primary.main
  }
});

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const URL = "https://handy-todo-backend.herokuapp.com/api/todos/"

const FILTER_MAP = {
  "全て": () => true,
  "未完了": todo => !todo.completed,
  "完了": todo => todo.completed
}

const FILTER_NAMES = Object.keys(FILTER_MAP);

const tabProps = (index) => ({
  id: `tab-${index}`,
  'aria-controls': `tab-${index}`
});

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

  const handleOnFilterChange = (e, newIndex) => {
    setFilter(FILTER_NAMES[newIndex]);
  }

  const listHeadingRef = useRef(null);
  const prevTodosLength = usePrevious(todos.length);

  useEffect(() => {
    if (todos.length - prevTodosLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [todos.length, prevTodosLength]);

  return (
    <ThemeProvider theme={theme}>
      {isModalOpen && <NewTodoModal addTodo={addTodo} closeModal={() => setIsModalOpen(false)} isOpen={isModalOpen}/>}
      <Container style={{position: "relative", paddingBottom: "8rem", minHeight: "100vh"}}>
        <AppBar position="absolute" color="transparent" elevation={0}>
          <Toolbar>
            <SvgIcon>
                <g id="グループ_14" data-name="グループ 14" transform="translate(0 0)">
                  <path id="パス_32" data-name="パス 32" d="M59.365,279.89l.177.177a4.993,4.993,0,0,1-7.066,7.04l-9.353-9.354a3.323,3.323,0,0,1,4.7,0l6.84,6.84c.02.02.041.04.062.059a1.661,1.661,0,0,0,2.287-.06h0a1.662,1.662,0,0,0,0-2.35l-2.351-2.352A3.325,3.325,0,0,1,59.365,279.89Z" transform="translate(-43.122 -268.841)" fill="#fff"/>
                  <path id="パス_33" data-name="パス 33" d="M113.365,195.822l9.435,9.435-.03.03a3.324,3.324,0,0,1-4.671-.029l-5.632-5.632-.03-.031-.031-.03-1.146-1.147c-.021-.021-.041-.04-.062-.059a1.661,1.661,0,0,0-2.287.06h0a1.662,1.662,0,0,0,0,2.35l2.351,2.351h0a3.325,3.325,0,0,1-4.7,0l0,0-.062-.064a4.993,4.993,0,0,1,6.868-7.235Z" transform="translate(-99.114 -194.602)" fill="#fff"/>
                </g>
            </SvgIcon>
            <Typography variant="h2" style={{color: "#fff"}}>生活リスト</Typography>
            <IconButton style={{color: "#fff"}}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* hero */}
        <Container className={classes.hero} style={{padding: "4rem"}}>
          <img src="../hero.svg" alt="hero" style={{width: "100%", maxWidth: "37.5rem", margin: "0 auto"}} />
        </Container>

        {/* data unit */}
        <Paper elevation={12} style={{borderRadius: 30, paddingTop: theme.spacing(2), paddingBottom: theme.spacing(2), marginLeft: theme.spacing(2), marginRight: theme.spacing(2), display: "flex", flexDirection: "row", justifyContent: "space-between", position: "relative", transform: "translateY(-50%)"}} >
            <Box position="relative" style={{width: "calc(100% / 3)", textAlign: "center"}}>
              <Typography variant="body2">
                <Box component="span" style={{fontSize: "1.8rem", fontWeight: "700", marginRight: theme.spacing(1)}}>{todos.filter(todo => todo.completed === false).length}</Box>
                件
              </Typography>
              <Typography variant="body2">
                未完了
              </Typography>
              <Box variant="span" style={{display: "block", width: "0.1rem", height: "100%", background: "rgba(0, 0, 0, 0.12", position: "absolute", top: 0, right: 0}}></Box>
            </Box>
            <Box position="relative"  style={{width: "calc(100% / 3)", textAlign: "center"}}>
              <Typography variant="body2">
                <Box component="span" style={{fontSize: "1.8rem", fontWeight: "700", marginRight: theme.spacing(1)}}>{todos.filter(todo => todo.completed === true).length}</Box>
                件
              </Typography>
              <Typography variant="body2">
                完了
              </Typography>
              <Box variant="span" style={{display: "block", width: "0.1rem", height: "100%", background: "rgba(0, 0, 0, 0.12", position: "absolute", top: 0, right: 0}}></Box>
            </Box>
            <Box style={{width: "calc(100% / 3)", textAlign: "center"}}>
              <Typography variant="body2">
                <Box component="span" style={{fontSize: "1.8rem", fontWeight: "700", marginRight: theme.spacing(1)}}>{todos.filter(todo => todo.completed === true).length / todos.length * 100}</Box>
                %
              </Typography>
              <Typography variant="body2">
                達成率
              </Typography>
            </Box>
        </Paper>

        {/* tabs */}
        <Tabs value={filter} onChange={handleOnFilterChange} centered>
          {FILTER_NAMES.map((name, i) => (
            <Tab key={name} label={name} {...tabProps(i)} />
          ))}
        </Tabs>

        {/* Todo list */}
        <List ref={listHeadingRef}>
          {todos.filter(FILTER_MAP[filter]).map(todo =>
            <Todo key={todo.id} id={todo.id} name={todo.name} completed={todo.completed} onCheckChange={handleOnCheckChange} onClickDelete={handleOnClickDelete} onClickSave={handleOnClickSave} />
          )}
        </List>

        {/* open modal button */}
        <Fab color="secondary" aria-label="add" onClick={() => setIsModalOpen(true)} style={{position: "absolute", bottom: "1.6rem", right: "1.6rem"}}>
          <AddIcon />
        </Fab>

      </Container>
    </ThemeProvider>
  );
}

export default App;
