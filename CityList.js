import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';

export default class CityList extends React.Component {
  static navigationOptions = {
    marginLeft: 400,
    title: 'Choose Your Cities!'

  };

  constructor(props) {
    super(props);

    this.state = {
      cities: [],
    };
  }


// http://localhost:8080/weather-crawler/current-weathers/by-city-name
// http://localhost:8080/weather-crawler/available-cities
// http://demo6468405.mockable.io/weather-crawlers/cities

  componentDidMount() {
    fetch('http://demo6468405.mockable.io/weather-crawlers/cities')
      .then(response => response.json())
      .then(cities => {
        console.log('cities =', cities.length);
        this.setState({
          cities
        });
      });
  }

  onPressCity(item) {
    this.props.navigation.navigate(
      'Detail',
      {
        city: item
      }
    );
  }

  renderItem(city) {
    return (
      <TouchableOpacity style={styles.item} onPress={() => this.onPressCity(city)}>
        <Text style={styles.text}>{city}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <FlatList style={styles.container}
                renderItem={({ item }) => this.renderItem(item)}
                keyExtractor={item => item}
                data={this.state.cities}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  //  textAlign: 'center',
  //  backgroundColor: '#BDBDBD',
  //  marginTop: Constants.statusBarHeight,
  },

  item: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: '#D5D5D5',
  },

  text: {
    fontSize: 20,
    textAlign: 'center',
  }

});
