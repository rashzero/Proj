import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import SeriesItem from './SeriesItem';

class Favorites extends React.Component {
  state = {
    series: [],
    favorits: [],
  };

  componentDidMount() {
    console.log('Страница загружена');
    this.getFavoritsSeries();
  }

  getFavoritsSeries() {
    const seriesJson = this.getCookieValue('favoritesSeries');
    const seriesJsonParsed = JSON.parse(seriesJson);
    const promises = [];
    for (const serieName of seriesJsonParsed) {
      const promis = fetch(`http://api.tvmaze.com/singlesearch/shows?q=${serieName}`)
        .then((response) => (response.json()));
      promises.push(promis);
    }
    Promise.all(promises)
      .then((result) => result.map((item) => ({ show: item })))
      .then((value) => this.setState({
        series: value,
      }));

    this.setState({
      favorits: seriesJsonParsed,
    });
  }


  getCookieValue(value) {
    const matchesValue = document.cookie.match(new RegExp(
      `(?:^|; )${value.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`,
    ));
    if (matchesValue) {
      return (decodeURIComponent(matchesValue[1]));
    }
    return undefined;
  }

  setCookie(name, value, options) {
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

  handleFaivorits(serie) {
    const favoriteArr = this.state.favorits.slice();
    const index = favoriteArr.indexOf(serie.show.name);
    const isFavorite = favoriteArr.includes(serie.show.name);

    if (isFavorite) {
      favoriteArr.splice(index, 1);
    } else {
      favoriteArr.push(serie.show.name);
    }
    this.setState({
      favorits: favoriteArr,
    });
    const jsonFavorites = JSON.stringify(favoriteArr);
    this.setCookie('favoritesSeries', jsonFavorites);
  }

  render() {
    const { series } = this.state;
    const stateFavorits = this.state.favorits;
    console.log(series);
    return (
      <div className={this.props.classes.root}>
        <GridList cellHeight={180} className={this.props.classes.gridList}>
          {series.map((serie) => (
            <SeriesItem
              serie={serie}
              handleFaivorits={() => this.handleFaivorits(serie)}
              stateFavorits={stateFavorits}
            />
          ))}
        </GridList>
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
    height: '100%',
  },
  button: {
    margin: theme.spacing(3),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}))(Favorites);


export default useStylesForm;
