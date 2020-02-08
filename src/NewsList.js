import React from 'react';
import GridList from '@material-ui/core/GridList';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import CircularIndeterminate from './CircularIndeterminate';
import NewsItem from './NewsItem';
import { geNewsActionObject, geNewsActionObjectInCache } from './actions/actions';

class NewsList extends React.Component {
    chunkSize = 10;

    numberOfPage;

    textInput = React.createRef();

  state = {
    news: [],
    isLoading: false,
    cache: {},
  };

  componentDidMount() {
    this.getNewsPage(this.currentPage);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.page !== prevProps.match.params.page) {
      this.getNewsPage(this.currentPage);
    }
  }

  get currentPage() {
    const { params } = this.props.match;
    if (+params.page) {
      return params.page;
    }
    return 0;
  }

  get startSlice() {
    return this.currentPage * this.chunkSize;
  }

  get endSlice() {
    return this.chunkSize + this.startSlice;
  }

    getNewsPage = async (index) => {
      this.setState({
        isLoading: true,
      });
      const seriesArr = await this.props.getNewsAction(index);
      console.log(seriesArr);
      this.props.history.push(`/news/${index}`);
      this.numberOfPage = this.props.state.numberOfPage;
      this.setState({
        isLoading: false,
      });
    }

    nextPage = () => {
      this.getNewsPage(this.currentPage + 1);
    }

    backPage = () => {
      this.getNewsPage(this.currentPage - 1);
    }

    render() {
      const { news } = this.props.state;

      if (this.state.isLoading) {
        return <CircularIndeterminate />;
      }

      return (
        <div>
          <center>
            <div>
              <Typography variant="h6" noWrap>
                {`Page № ${+this.currentPage + 1}`}
              </Typography>
            </div>
          </center>
          <div className={this.props.classes.root}>
            <GridList cellHeight={150} className={this.props.classes.gridList}>
              {news.map((item) => (
                <NewsItem
                  item={item}
                />
              ))}
            </GridList>
          </div>
          <center>
            <ButtonGroup
              color="secondary"
              aria-label="large outlined secondary button group"
            >
              <Button onClick={this.backPage}>Назад</Button>
              {new Array(this.numberOfPage).fill(null).map((value, index) => (
                <Button
                  style={{ backgroundColor: (this.currentPage == index) ? 'blue' : '' }}
                  value={index}
                  onClick={() => this.getNewsPage(index)}
                >
                  {index + 1}
                </Button>
              ))}
              <Button onClick={this.nextPage}>Вперед</Button>
            </ButtonGroup>
          </center>
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
}))(NewsList);

const mapStateToProps = (state) => ({
  state,
});

function mapDispatchToProps(dispatch) {
  return {
    async getNewsAction(data) {
      const cacheItem = { ...this.state.cache };
      const responseNumberOfPage = await fetch(`http://localhost:8080/api/news/${data}`);
      const responseJsonNumberOfPage = await responseNumberOfPage.json();
      if (data in cacheItem) {
        const newsActionResult = geNewsActionObject(this.state.cache[data]);
        dispatch(newsActionResult);
      } else {
        cacheItem[data] = responseJsonNumberOfPage.news;

        const newsActionResult = geNewsActionObjectInCache(
          responseJsonNumberOfPage.news,
          cacheItem,
          responseJsonNumberOfPage.numbOfPage,
        );
        dispatch(newsActionResult);
      }
      const newsActionResult = geNewsActionObject(responseJsonNumberOfPage.news);
      dispatch(newsActionResult);
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(useStylesForm);
