import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MovieList from './MovieList.js';
import MovieProfile from './MovieProfile.js';
import { StackNavigator } from 'react-navigation';

const apiKey = '9afa2a3fe178657691627d939afc83a7';

const Routes = StackNavigator ({
  MovieList: {screen: MovieList},
  MovieProfile: {screen: MovieProfile, navigationOptions: ({navigation}) => ({
    title: `${navigation.state.params.title}`
  })}
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.fetchWithPage = this.fetchWithPage.bind(this);
    this.loadMore = this.loadMore.bind(this);    
    this.state = {
      movies: [],
      loading: false,
      page: 1
    }
  }

  fetchWithPage (page) {
    this.setState({
      loading: true
    }, () => {
      fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${page}`)
        .then((data) => data.json())
        .then((json) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(json);
            }, 2000);
          });
        })
        .then((json) => {
          const mSet = new Set([...this.state.movies.map((m) => m.id)]);
          const plusSet = json.results.filter((m) => !mSet.has(m.id));
          const newResults = this.state.movies.concat(plusSet);
          this.setState({
            movies: newResults, //What's this?
            loading: false
          });
        })
    });
  }

  loadMore() {
    const newPage = this.state.page + 1;
    this.setState({
      page: newPage
    }, () => this.fetchWithPage(newPage));
  }

  componentWillMount(props) {
    this.fetchWithPage(1);
  }

  render() {
    return (
      <Routes screenProps={{
        movies: this.state.movies,
        loadMore: this.loadMore,
        loading: this.state.loading
      }} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
