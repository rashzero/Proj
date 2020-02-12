import React from 'react';
import SeriesList from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarTwoToneIcon from '@material-ui/icons/StarTwoTone';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  card: {
    maxWidth: 500,
    margin: 5,
    width: 350,
  },
  card2: {
    maxWidth: 345,
    margin: 5,
    width: 220,
  },
  media: {
    height: 250,
  },

  titleBar: {
    background:
          'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, '
          + 'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  },
});

export default function SeriesItem(props) {
  const imgEror = 'https://static.tildacdn.com/tild3166-3965-4530-b562-313134366634/blog-1.jpg';
  const serieImg = props.serie.show.image ? props.serie.show.image.original : imgEror;
  const serieToFavorit = (props.stateFavorits ? props.stateFavorits.find((item) => item.name === props.serie.show.name) : null);
  let dateAdded;
  if (serieToFavorit) {
    const date = new Date(serieToFavorit.time);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hourse = date.getHours();
    const minutes = date.getMinutes();

    dateAdded = `Добавленно в избранное: ${day}.${month + 1}.${year} ${hourse}:${minutes}`;
  } else {
    dateAdded = ' ';
  }
  if (props.view) {
    return (
      <SeriesItemList
        handleFaivorits={props.handleFaivorits}
        serieImg={serieImg}
        dateAdded={dateAdded}
        stateFavorits={props.stateFavorits}
        serie={props.serie}
      />
    );
  }
  return (
    <SeriesTabs
      handleFaivorits={props.handleFaivorits}
      serieImg={serieImg}
      dateAdded={dateAdded}
      stateFavorits={props.stateFavorits}
      serie={props.serie}
    />
  );
}

function SeriesTabs(props) {
  const classes = useStyles();

  function hendleFavoritClick(e) {
    e.stopPropagation();

    props.handleFaivorits();
  }

  return (
    <Card className={classes.card2}>
      <CardActionArea onClick={props.handleSeriesInfo}>
        <CardMedia
          className={classes.media}
          image={props.serieImg}
        />
        <GridListTileBar
          titlePosition="top"
          actionIcon={(
            <IconButton className={classes.icon} onClick={hendleFavoritClick}>
              {props.stateFavorits.find((item) => item.name === props.serie.show.name) ? <StarTwoToneIcon color="error" /> : <StarBorderIcon />}
            </IconButton>
                      )}
          actionPosition="left"
          className={classes.titleBar}
        />
        <CardContent>
          <SeriesList key={props.serie.show.id} gutterBottom variant="h5" component="h2">
            {' '}
            <b>{props.serie.show.name}</b>
          </SeriesList>
          <SeriesList component="p">
               премьера:
            {' '}
            {props.serie.show.premiered}
          </SeriesList>
          <SeriesList component="p">
            { props.dateAdded }
          </SeriesList>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

function SeriesItemList(props) {
  const classes = useStyles();

  function hendleFavoritClick(e) {
    e.stopPropagation();

    props.handleFaivorits();
  }

  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
    >
      <Grid item xs={3}>
        <Card className={classes.card2}>
          <CardActionArea onClick={props.handleSeriesInfo}>
            <CardMedia
              className={classes.media}
              image={props.serieImg}
            />
            <GridListTileBar
              titlePosition="top"
              actionIcon={(
                <IconButton className={classes.icon} onClick={hendleFavoritClick}>
                  {props.stateFavorits.find((item) => item.name === props.serie.show.name) ? <StarTwoToneIcon color="error" /> : <StarBorderIcon />}
                </IconButton>
              )}
              actionPosition="left"
              className={classes.titleBar}
            />
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item xs={9}>
        <SeriesList key={props.serie.show.id} gutterBottom variant="h5" component="h2">
          {' '}
          <b>{props.serie.show.name}</b>
        </SeriesList>
        <SeriesList component="p">
            премьера:
          {' '}
        {props.serie.show.premiered}
        </SeriesList>
        <SeriesList component="p">
          { props.dateAdded }
        </SeriesList>
      </Grid>
    </Grid>
  );
}
