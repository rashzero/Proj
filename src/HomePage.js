import React from 'react';
import GridList from '@material-ui/core/GridList';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import SeriesItem from './SeriesItem';
import request from './Request';
import { geSeriesActionObject, geFaivoritsActionObject } from './actions/actions';

class HomePage extends React.Component {
  textInput = React.createRef();

  state = {
    value: '',
    favorits: [],
    time: '',
  };

  componentDidMount() {
    console.log('Страница загружена');
    this.timerID = setInterval(
      () => this.getTimeFromServer(),
      1000,
    );
    this.textInput.current.focus();
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  getSeries = (event) => {
    this.props.getSeriesAction(this.state.value);
    event.preventDefault();
  };

  handleSeriesInfo(serie) {
    console.log(serie);
    this.props.history.push(`/detail/${serie.show.name}`);
  }

  handleChange = (event) => this.setState({ value: event.target.value });

  getTimeFromServer = async () => {
    const response = await request({
      url: 'http://localhost:8080/api/time',
    });
    this.setState({
      time: response,
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
    const { series } = this.props.state;
    const stateFavorits = this.props.state.user.favorits;

    return (
      <div>
        <center>
          <div>
            <Typography variant="h6" noWrap>
              Время:
              {' '}
              {this.state.time}
            </Typography>
          </div>
          <form onSubmit={this.getSeries}>
            <TextField
              type="search"
              value={this.state.value}
              onChange={this.handleChange}
              id="text1"
              label="Текст:"
              className={this.props.classes.textField}
              margin="normal"
              variant="outlined"
              inputRef={this.textInput}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={this.props.classes.button}
              onClick={this.getSeries}
            >
                Найти
            </Button>
          </form>
        </center>
        <div className={this.props.classes.root}>
          <GridList cellHeight={180} className={this.props.classes.gridList}>
            {series.map((serie) => (
              <SeriesItem
                serie={serie}
                stateFavorits={stateFavorits}
                handleFaivorits={() => this.handleFaivorits(serie)}
                handleSeriesInfo={() => this.handleSeriesInfo(serie)}
              />
            ))}
          </GridList>
        </div>
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
    width: '35%',
  },
}))(HomePage);

const mapStateToProps = (state) => ({
  state,
});

function mapDispatchToProps(dispatch) {
  return {
    async getSeriesAction(data) {
      const responseSeries = await fetch(`https://api.tvmaze.com/search/shows?q=${data}`);
      const responseSeriesJson = await responseSeries.json();
      const seriesActionResult = geSeriesActionObject(responseSeriesJson);
      dispatch(seriesActionResult);
    },
    getFaivoritsAction(data) {
      const faivoritsActionResult = geFaivoritsActionObject(data);
      dispatch(faivoritsActionResult);
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(useStylesForm);
