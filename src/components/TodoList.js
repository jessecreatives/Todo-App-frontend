import React from 'react';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {theme} from '../styles/Theme';

export default function TodoList({isListOpen, lists, closeList}) {
    return (
        <Slide direction='left' in={isListOpen} mountOnEnter unmountOnExit>
            <Paper style={{borderRadius: 0, boxSizing: "border-box", borderRadius: 0, width: "100%", height: "100%", zIndex: "10000", position: "fixed", left: 0, top: 0, padding: theme.spacing(4)}}>
                <IconButton style={{position: "absolute", top: "0.5rem", right: "0.5rem", color: "#121212"}} onClick={closeList}>
                    <CloseIcon />
                </IconButton>
                <Typography variant="h2" align="center" style={{marginBottom: theme.spacing(6)}}>Todo リスト</Typography>
                {lists.map(list => (
                    <Accordion key={list.name} style={{borderRadius: 0}}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>{list.name}</AccordionSummary>
                        <AccordionDetails style={{width: "100%", flexDirection: "row", justifyContent: "space-between"}}>
                            <Button variant="contained" color="secondary" aria-label="edit"  style={{width: "48%"}}>編集</Button>
                            <Button variant="outlined" color="secondary" aria-label="delete"  style={{width: "48%", borderWidth: "0.2rem"}}>削除</Button>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Paper>
        </Slide>
    )
}
