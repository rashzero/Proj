/* eslint-disable react/state-in-constructor */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import GridList from '@material-ui/core/GridList';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ViewStreamIcon from '@material-ui/icons/ViewStream';
import SeriesItem from './SeriesItem';
import { geFaivoritsActionObject } from './actions/actions';


class Favorites extends React.Component {
  state = {
    series: [],
    favorites: [],
    filter: {
      all: [
        { value: 'ascending', name: 'по возрастанию' },
        { value: 'descending', name: 'по убыванию' },
        { value: 'byName', name: 'по имени' },
      ],
      currient: '',
    },
    view: '',
  };

  i = 0;

  componentDidMount() {
    console.log('Страница загружена');
    const newState = { ...this.state };
    newState.filter.currient = 'descending';
    this.setState(newState);
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
    switch (this.state.filter.currient) {
      case 'ascending':
        return seriesB.time - seriesA.time;
      case 'descending':
        return seriesA.time - seriesB.time;
      case 'byName':
        const nameA = seriesA.name.toLowerCase();
        const nameB = seriesB.name.toLowerCase();

        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      default:
        break;
    }
  }

  handleChangeSortOrder = () => {
    this.i++;
    if (this.i === 1) {
      this.setState({
        filter: {
          currient: 'ascending',
        },
      });
    } else if (this.i === 2) {
      this.setState({
        filter: {
          currient: 'descending',
        },
      });
    } else if (this.i === 3) {
      this.setState({
        filter: {
          currient: 'byName',
        },
      });
    }
    console.log(this.state.filter.currient);
    if (this.i === 3) { this.i = 0; }
  }

  handleChangeSorting = (velueSort) => {
    const newState = { ...this.state };
    newState.filter.currient = velueSort;
    this.setState(newState);
    this.props.state.user.favorits.sort(this.compare);
    this.getFavoritsSeries();
  };

  handleViewVariant = () => {
    if (this.state.view) {
      this.setState({
        view: false,
      });
    } else if (!this.state.view) {
      this.setState({
        view: true,
      });
    }
  };

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

    const renderButtonSorting = this.state.filter.all.map((buttonName) => (
      <Button
        className={this.props.classes.button}
        id={buttonName.value}
        // disabled={this.state.filter.currient === buttonName.value}
        color={this.state.filter.currient === buttonName.value ? 'primary' : 'default'}
        variant="outlined"
        onClick={() => this.handleChangeSorting(buttonName.value)}
        className={this.props.classes.button}
        type="button"
      >
        {buttonName.name}
      </Button>
    ));
    console.log(series);
    console.log(stateFavorits);

    return (
      <div className={this.props.classes.root}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={12}>
            {renderButtonSorting}
            <Tooltip title="Filter list" className={this.props.classes.viewButton}>
              <IconButton aria-label="filter list" onClick={this.handleChangeSortOrder}>
                <FilterListIcon color="secondary" className={this.props.classes.buttonPanel} />
              </IconButton>
            </Tooltip>
            <Tooltip title="View list" className={this.props.classes.viewButton}>
              <IconButton aria-label="view list" onClick={this.handleViewVariant}>
                {this.state.view ? <ViewModuleIcon className={this.props.classes.buttonPanel} /> : <ViewStreamIcon className={this.props.classes.buttonPanel} />}
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
                  view={this.state.view}
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
    width: 'auto',
    height: 'auto',
    marginLeft: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  viewButton: {
    marginLeft: '15px',
  },
  buttonPanel: {
    fontSize: '30px',
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
