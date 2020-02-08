import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import GridList from '@material-ui/core/GridList';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import SeriesItem from './SeriesItem';
import Grid from '@material-ui/core/Grid';
import { geFaivoritsActionObject } from './actions/actions';


class Favorites extends React.Component {
  state = {
    series: [],
    favorites: [],
    filter: 'ascending',
  };

  i = 0;

  componentDidMount() {
    console.log('Страница загружена');
    this.getFavoritsSeries();
  }

  getFavoritsSeries() {
    const seriesJsonParsed = this.props.state.user.favorits;
    const promises = [];
    for (const serieName of seriesJsonParsed) {
      const promis = fetch(`http://api.tvmaze.com/singlesearch/shows?q=${serieName.name}`)
        .then((response) => (response.json()));
      promises.push(promis);
      console.log(promises);
    }
    Promise.all(promises)
      .then((result) => result.map((item) => ({ show: item })))
      .then((series) => this.setState({
        series,
      }));
  }

  compare = (seriesA, seriesB) => {
    switch (this.state.filter) {
      case 'ascending':
        return seriesB.time - seriesA.time;
      case 'descending':
        return seriesA.time - seriesB.time;
      case 'byName':
        const nameA = seriesA.name.toLowerCase();
        const nameB = seriesB.name.toLowerCase();

        if (nameA < nameB)
          return -1
        if (nameA > nameB)
          return 1
        return 0;
      default:
        break;
    }
  }

  handleChangeSortOrder = () => {
    this.i++;
    if (this.i === 1) {
      this.setState({
        filter: 'ascending',
      });
    } else if (this.i === 2) {
      this.setState({
        filter: 'descending',
      });
    } else if (this.i === 3) {
      this.setState({
        filter: 'byName',
      });
    }
    console.log(this.state.filter);
    this.props.state.user.favorits.sort(this.compare);
    this.getFavoritsSeries();
    if (this.i === 3) { this.i = 0; }
  }

  handleFaivorits(serie) {
    const favoriteArr = this.props.state.user.favorits.slice();
    const index = favoriteArr.findIndex((item) => item.name === serie.show.name);
    const isFavorite = favoriteArr.find((item) => item.name === serie.show.name);
    const timeToAddFavorit = Date.now();

    if (isFavorite) {
      favoriteArr.splice(index, 1);
    } else {
      favoriteArr.push({ name: serie.show.name, time: timeToAddFavorit });
    }
    this.props.getFaivoritsAction(favoriteArr);
  }

  render() {
    const { series } = this.state;
    const stateFavorits = this.props.state.user.favorits;

    /* if (stateFavorits) {
      stateFavorits.sort(this.compare);
    } */
    console.log(series);
    console.log(stateFavorits);

    return (
      <div className={this.props.classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <Tooltip title="Filter list">
              <IconButton aria-label="filter list" onClick={this.handleChangeSortOrder}>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={12}>
            <GridList cellHeight={180} className={this.props.classes.gridList}>
              {series.sort().map((serie) => (
                <SeriesItem
                  serie={serie}
                  handleFaivorits={() => this.handleFaivorits(serie)}
                  stateFavorits={stateFavorits}
                />
              ))}
            </GridList>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const useStylesForm = withStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '80%',
    height: 'auto',
  },
  button: {
    margin: theme.spacing(3),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}))(Favorites);

const mapStateToProps = (state) => ({
  state,
});

function mapDispatchToProps(dispatch) {
  return {
    getFaivoritsAction(data) {
      const faivoritsActionResult = geFaivoritsActionObject(data);
      dispatch(faivoritsActionResult);
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(useStylesForm);
