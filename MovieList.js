//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import MovieCard from './MovieCard.js'

// create a component
class MovieList extends Component {
    render() {
        const screenProps = this.props.screenProps;
        const navigate = this.props.navigation.navigate;

        return (
            <View>
                <FlatList
                    data={screenProps.movies}
                    keyExtractor={(movie) => movie.id}
                    renderItem={(movieItem) => <MovieCard {...movieItem.item} loadProfile={ () =>{ 
                        navigate('MovieProfile', movieItem.item);
                    }}/>} 
                    onEndReached={screenProps.loadMore}
                    onEndReachedThreshold={0.1}
                    refreshing={screenProps.loading}
                    ListFooterComponent={() =>
                        <View style={{flex: 1, padding: 10}}>
                            <ActivityIndicator size="large" />
                        </View>
                    }
                />
            </View>
        ); 
    }
}

//make this component available to the app
export default MovieList;


