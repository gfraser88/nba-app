import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { BrowserRouter, Route, Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
});

export default function TeamTable(teams) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Team</TableCell>
            <TableCell>Ranking</TableCell>
            <TableCell>Coach</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            { (teams.length > 0) ? teams.map((team, index) => {
                return (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                  {team.full_name}
              </TableCell>
              <TableCell align="right">{team.conference}</TableCell>
              <TableCell align="right">{team.division}</TableCell>
            </TableRow>
                )
            }) : 
            <TableRow>
                <TableCell colSpan="3">Loading...</TableCell>
            </TableRow>
            }
        </TableBody>
      </Table>
    </Paper>
  );
}