import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Box from '@material-ui/core/Box';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Rating from '@material-ui/lab/Rating';
import StarTwoToneIcon from '@material-ui/icons/StarTwoTone';
import {
  BrowserRouter as Router, Switch, Route, Link, useParams,
} from 'react-router-dom';
import { getMoviRaitingActionObject, geFaivoritsActionObject } from './actions/actions';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: '100%',
  },
  image: {
    width: 300,
    height: 400,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, '
      + 'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  },
}));


function SerieDetail(props) {
  const classes = useStyles();
  const { seriesDitals } = useParams();
  const [serie, setSerie] = useState('');
  const [favorites, setFavorites] = useState('');

  useEffect(() => {
    fetch(`http://api.tvmaze.com/singlesearch/shows?q=${seriesDitals}`)
      .then((response) => (response.json()))
      .then((value) => setSerie(value));

    getFavoritsSeries();
  }, []); // getFavoritsSeries, seriesDitals

  function getFavoritsSeries() {
    setFavorites(props.state.user.favorits);
  }

  console.log(serie);
  console.log(seriesDitals);
  console.log(favorites);
  console.log(props.state);

  if (!serie) {
    return null;
  }

  const imgEror = 'https://static.tildacdn.com/tild3166-3965-4530-b562-313134366634/blog-1.jpg';
  const serieImg = serie.image ? serie.image.original : imgEror;
  const serieRating = serie.rating ? serie.rating.average : '0';
  const serieContry = serie.network ? serie.network.country.name : 'неизвестно';
  const serieGenres = (serie.genres != []) ? serie.genres : 'неизвестно';
  const serieLang = serie.language ? serie.language : 'неизвестно';
  const serieStatus = serie.status ? serie.status : 'неизвестно';
  const serieSite = serie.officialSite ? serie.officialSite : 'неизвестно';
  const serieSummary = serie.summary.replace(/<\/?[a-z0-9]*>/gi, '');

  function handleFaivorits() {
    const favoriteArr = props.state.user.favorits.slice();
    const index = favoriteArr.findIndex((item) => item.name === seriesDitals);
    const isFavorite = favoriteArr.find((item) => item.name === seriesDitals);
    const timeToAddFavorit = Date.now();

    if (isFavorite) {
      favoriteArr.splice(index, 1);
    } else {
      favoriteArr.push({ name: seriesDitals, time: timeToAddFavorit });
    }
    props.getFaivoritsAction(favoriteArr);
  }

  let raiting = props.state.user.raitingMove.find((item) => item.id === serie.id);
  if (!raiting) {
    raiting = 0;
  }
  console.log(raiting);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={serieImg} />
              <GridListTileBar
                titlePosition="top"
                actionIcon={(
                  <IconButton className={classes.icon} onClick={handleFaivorits}>
                    {props.state.user.favorits.find((item) => item.name === serie.name) ? <StarTwoToneIcon color="error" /> : <StarBorderIcon />}
                  </IconButton>
                  )}
                actionPosition="left"
                className={classes.titleBar}
              />
              <GridListTileBar
                titlePosition="buttom"
                actionIcon={(
                  <IconButton className={classes.icon}>
                    <Rating
                      name="simple-controlled"
                      value={raiting.raiting}
                      defaultValue={2}
                      max={10}
                      onChange={(event, newValue) => {
                        props.setMoviRaitingAction(newValue, serie.id);
                      }}
                    />
                  </IconButton>
                )}
                actionPosition="left"
                className={classes.titleBar}
              />
            </ButtonBase>
          </Grid>
          <Grid
            item
            sm
            container
            direction="column"
          >
            <Grid
              item
              container
              direction="row"
              justify="flex-start"
            >
              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  <Box fontWeight="fontWeightBold" m={1} fontSize={28}>
                    {serie.name}
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  <Box color="primary.main" fontSize={18}>
                    {' '}
дата выхода:
                    {' '}
                    {serie.premiered}
                  </Box>
                </Typography>
              </Grid>
              <Grid container xs={12} direction="row">
                <Grid item xs={4}><Box color="primary.main" fontSize={16}>Жанр:</Box></Grid>
                <Grid item xs={8}><Box fontSize={16}>{serieGenres}</Box></Grid>
                <Grid item xs={4}><Box color="primary.main" fontSize={16}>Язык:</Box></Grid>
                <Grid item xs={8}><Box fontSize={16}>{serieLang}</Box></Grid>
                <Grid item xs={4}><Box color="primary.main" fontSize={16}>Страна:</Box></Grid>
                <Grid item xs={8}><Box fontSize={16}>{serieContry}</Box></Grid>
                <Grid item xs={4}><Box color="primary.main" fontSize={16}>Официальный сайт:</Box></Grid>
                <Grid item xs={8}><Box fontSize={16}>{serieSite}</Box></Grid>
                <Grid item xs={4}><Box color="primary.main" fontSize={16}>Статус:</Box></Grid>
                <Grid item xs={8}><Box fontSize={16}>{serieStatus}</Box></Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">
              {' '}
Рейтинг:
              {' '}
              {serieRating}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} container direction="column">
          <Typography variant="overline" display="block" gutterBottom color="textPrimary">
            <>
              {' '}
              {serieSummary}
              {' '}
            </>
          </Typography>
        </Grid>
      </Paper>
    </div>
  );
}

const mapStateToProps = (state) => ({
  state,
});

function mapDispatchToProps(dispatch) {
  return {
    setMoviRaitingAction(raiting, id) {
      const newState = { ...this.state.user };
      console.log(newState);

      const currentMove = newState.raitingMove.find((item) => item.id === id);
      if (currentMove) {
        currentMove.raiting = raiting;
      } else {
        newState.raitingMove.push({ raiting, id });
      }
      const moveRatingActionResult = getMoviRaitingActionObject(newState);
      dispatch(moveRatingActionResult);
    },
    getFaivoritsAction(data) {
      const faivoritsActionResult = geFaivoritsActionObject(data);
      dispatch(faivoritsActionResult);
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SerieDetail);
