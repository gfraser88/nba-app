import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TeamTest from '../test data/teams.json'
//import StandingTest from '../test data/standings.json'
import RosterData from './RosterData';
import { BrowserRouter, Route, Link } from "react-router-dom";
import { fontFamily } from "@material-ui/system";
import { template } from "@babel/core";
//import axios from 'axios';

const useStyles = makeStyles({
    root: {
      fontFamily: 'Inter',
      width: '100%',
      overflowX: 'auto',
    },
    table: {
      margin: "0 auto",
      minWidth: 200,
      width: '100%',
      overflow: 'scroll'
    },
  });

const Teams = () => {
    const [hasError, setErrors] = useState(false);
    const [teams, setTeams] = useState({});
  
    //https://api.sportsdata.io/v3/nba/scores/json/teams
    async function fetchData() {
          const res = await fetch("https://api.sportsdata.io/v3/nba/scores/json/Standings/2020",
          {headers: {
            'Ocp-Apim-Subscription-Key': 'af3a771073da4ff2960f22591f39accc'
          }});
          res
          .json()
           .then(res => setTeams(res))
           .catch(err => setErrors(err));
      }

    useEffect(() => {
        fetchData();
    }, []);

    //<div style={{backgroundColor: "#dae2f0" , textAlign: 'center', borderRadius: '50%', width: '100px', height: '100px', position: 'relative'}}>
    //<img src={team.WikipediaLogoUrl} width="70px" height="70px" style={{position: 'absolute', maxHeight: '100%' , margin: 'auto', top: 0, left: 0, right: 0, bottom: 0}}/>
    //</div>         

    const classes = useStyles();

    //const teams = StandingTest;
    const allTeams = TeamTest;
    function handleClick(e) {
      window.location.assign("/" + e.currentTarget.id);
    }

    return (     
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="nba team table">
        <colgroup>
          <col width="10%" />
          <col width="50%" />
          <col width="10%" />
          <col width="10%" />
          <col width="10%"/>
        </colgroup>
        <TableHead>
          <TableRow>
          <TableCell></TableCell>
            <TableCell><b>Team</b></TableCell>
            <TableCell><b>Wins/Losses</b></TableCell>
            <TableCell><b>Average Points Per Game</b></TableCell>
            <TableCell><b>Streak</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            { (teams.length > 0) ? teams.map((team, index) => {
                return (
            <TableRow key={index} onClick={handleClick.bind(this)} id={team.Key} hover={true} >
              <TableCell component="th" scope="row" style={{textAlign:'center'}}>
                    <img src={allTeams.find(data => data.TeamID == team.TeamID).WikipediaLogoUrl} width="70px" height="70px"/>                
              </TableCell>
              <TableCell>
                <h3>{team.City + " " + team.Name }</h3>
                {team.Conference}<br/>
                <small>{team.Division}</small>
              </TableCell>
              <TableCell>
                {team.Wins + " - " + team.Losses}
              </TableCell>
              <TableCell>
                {((team.PointsPerGameFor + team.PointsPerGameAgainst) / 2).toFixed(2)}
              </TableCell>
              <TableCell>
                {team.StreakDescription}
              </TableCell>
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
    )
};
export default Teams;