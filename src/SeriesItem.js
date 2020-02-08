import React from 'react';
import SeriesList from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarTwoToneIcon from '@material-ui/icons/StarTwoTone';

const useStyles = makeStyles({
  card: {
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
  const history = useHistory();
  const classes = useStyles();
  const imgEror = 'https://static.tildacdn.com/tild3166-3965-4530-b562-313134366634/blog-1.jpg';
  const serieImg = props.serie.show.image ? props.serie.show.image.original : imgEror;
  function hendleFavoritClick(e) {
    e.stopPropagation();

    props.handleFaivorits();
  }

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

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={props.handleSeriesInfo}>
        <CardMedia
          className={classes.media}
          image={serieImg}
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
            { dateAdded }
          </SeriesList>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
