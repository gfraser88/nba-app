import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
//import RosterTest from '../test data/roster.json'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";
import { Typography } from "@material-ui/core";
//import axios from 'axios';

// const useStyles = makeStyles({
//     root: {
//       width: '100%',
//       overflowX: 'auto',
//     },
//     table: {
//       minWidth: 650,
//     },
//   });

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    marginTop: 25
  },
  gridList: {
    width: '80%',
    height: '100%',
  },
  paper: {
    margin: '0 10px 0 10px',
    padding: 15
  }
}));

function _calculateAge(birthday) {
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

const Roster = () => {

  let { team } = useParams();
    
    const [hasError, setErrors] = useState(false);
    const [roster, setRoster] = useState({});
  
    async function fetchData(team) {
        const res = await fetch("https://api.sportsdata.io/v3/nba/stats/json/Players/" + team,
        {headers: {
          'Ocp-Apim-Subscription-Key': 'af3a771073da4ff2960f22591f39accc'
        }});
        res
        .json()
         .then(res => setRoster(res))
         .catch(err => setErrors(err));
    }

    // async function fetchPlayerData() {
    //   const res1 = await fetch("https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?t="+ roster.team.name + "&p=" + roster.player.first_name + "%20" + roster.player.last_name);
    //      res1.json()
    //       .then(res1 => setPlayer(res1.data))
    //       .catch(err => setErrors(err));
    // }

    useEffect(() => {
        fetchData(team);
        //fetchPlayerData();
    }, []);

    const classes = useStyles();
    //const roster = RosterTest;

    return (
    <div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={3}>
       {(roster.length > 0) ? roster.map((player, index) => {
          return (
            <GridListTile key={index} cols={1}>
              <Paper className={classes.paper}>
              <div>
                <Typography variant="h5">
                  <span style={{fontSize: 26, fontWeight: '700'}}>{player.Jersey}</span>&nbsp;
                  {player.FirstName + " " + player.LastName}&nbsp;
                  <span style={{fontSize: 16, fontWeight: '200'}}>{player.Position}</span>
                </Typography>
              </div>
              <div>
                <img src={player.PhotoUrl} style={{display: 'inline-block', borderRadius: '100%'}}></img>
                <div style={{display: 'inline-block', verticalAlign: 'top'}}>
                  <Typography variant="body1"><small>Height: </small>{(player.Height/12).toFixed(1).split('.')[0] + "'" + (player.Height/12).toFixed(1).split('.')[1] + '"'}</Typography>
                  <Typography variant="body1"><small>Age: </small>{_calculateAge(new Date(player.BirthDate))}</Typography>
                  <Typography variant="body1"><small>Experience: </small>{player.Experience > 1 ? player.Experience + " years" : player.Experience == 0 ? "None" : player.Experience  + " year"}</Typography>
                </div>                  
              </div>
                 
              </Paper>
            </GridListTile>
            )
        }) : 
        <p>Loading...</p>}
      </GridList>
    </div>
    )
};
export default Roster;