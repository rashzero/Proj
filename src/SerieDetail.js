import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Box from '@material-ui/core/Box';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarTwoToneIcon from '@material-ui/icons/StarTwoTone';
import { BrowserRouter as useParams } from 'react-router-dom';

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


export default function SerieDetail() {
  const classes = useStyles();
  const { seriesDitals } = useParams();
  const [serie, setSerie] = useState('');
  const [favorites, setFavorites] = useState('');

  useEffect(() => {
    fetch(`http://api.tvmaze.com/singlesearch/shows?q=${seriesDitals}`)
      .then((response) => (response.json()))
      .then((value) => setSerie(value));

    getFavoritsSeries();
  }, [getFavoritsSeries, seriesDitals]);

  function getFavoritsSeries() {
    const seriesJson = getCookieValue('favoritesSeries');
    if (seriesJson) {
      const seriesJsonParsed = JSON.parse(seriesJson);
      setFavorites(seriesJsonParsed);
      console.log(seriesJson);
    }
  }


  function handleFaivorits() {
    const favoriteArr = favorites.slice();
    const index = favoriteArr.indexOf(serie.name);
    const isFavorite = favoriteArr.includes(serie.name);

    if (isFavorite) {
      favoriteArr.splice(index, 1);
    } else {
      favoriteArr.push(serie.name);
    }
    setFavorites(favoriteArr);
    const jsonFavorites = JSON.stringify(favoriteArr);
    setCookie('favoritesSeries', jsonFavorites);
  }

  console.log(serie);
  console.log(seriesDitals);
  console.log(favorites);

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

  function getCookieValue(value) {
    const matchesValue = document.cookie.match(new RegExp(
      `(?:^|; )${value.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`,
    ));
    if (matchesValue) {
      return (decodeURIComponent(matchesValue[1]));
    }
    return undefined;
  }

  function setCookie(name, value, options) {
    let updatedCookie = `${encodeURIComponent(name)}=${value}`;

    for (const optionKey in options) {
      updatedCookie += `; ${optionKey}`;
      const optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += `=${optionValue}`;
      }
    }
    document.cookie = updatedCookie;
  }

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
                    {favorites.includes(serie.name) ? <StarTwoToneIcon color="error" /> : <StarBorderIcon />}
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
