import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Constants } from 'expo';

export default class WeatherDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `Weather Info: ${navigation.getParam('city', 'Unknown')}`,
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const city = navigation.getParam('city', null);
    // const city = 'Daejeon';
    // console.log(city);

    // ( 아이피 주소로 링크를 만들어야 함니당 ) -> 링크에 아이피주소 따올 수 있는 방법을 나중에 찾아보죠
    const cityuri = `http://192.168.1.163:8080/weather-crawler/current-weathers/by-city-name/${city}`
    // console.log(cityuri)
    fetch(cityuri)
      .then(response => response.json())
      .then(info => {
        this.setState({
          ...info,
          isLoading: false,
        });
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Text>데이터를 불러오는 중입니다.</Text>
        </View>
      )
    }

    let weatherMain = this.state.weather[0].main;
    let celsius = this.state.main.temp - 273.15;
    let yuna = this.state.wind.speed;


    return (
      <View style={styles.container}>
        <Text> { weatherMain }</Text>
        <Text>온도: {celsius.toFixed(1)} ℃</Text>
        <Text>바람: {yuna.toFixed(1)} m/s</Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Constants.statusBarHeight,
  },
});
