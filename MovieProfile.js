//import liraries
import React, { Component } from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';

// create a component
class MovieProfile extends Component {
    render() {
        const props = this.props.navigation.state.params;
        const img = {
            uri: `https://image.tmdb.org/t/p/w1000_and_h563_bestv2/${this.props.poster_path}`
        };
        return (
            <View>
                <Image style={styles.image} source={img}></Image>
                <View style={styles.textContainer}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.overview}>{props.overview}</Text>
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    image: {
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'nowrap',
        width: 400,
        height: 600
    },
    textContainer: {
        backgroundColor: 'rgb(0, 0, 0, 0.4)',
        position: 'absolute',
        bottom: 0,
    },
    title: {
        color: 'rgb(200, 200, 200)',
        fontSize: 18,
        fontWeight: '600'
    },
    overview: {
        color: 'rgb(200, 200, 200)'
    }
});

//make this component available to the app
export default MovieProfile;
