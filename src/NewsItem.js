import React from 'react';
import SeriesList from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    margin: 5,
    width: 450,
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

export default function NewsItem(props) {
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.card}>
        <CardActionArea>
          <CardContent>
            <SeriesList key={props.item.id} gutterBottom variant="h5" component="h2">
              <a href={props.item.url}>
                <b>{props.item.title}</b>
              </a>
            </SeriesList>
            <SeriesList component="p">
        	  by
              {' '}
              {props.item.by}
              ; like:
              {' '}
              {props.item.score}
            </SeriesList>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
