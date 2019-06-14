import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Constants } from 'expo';

export default class WeatherDetailScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: `< ${navigation.getParam('city', 'Unknown')} > ' s Weather!`,
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


    // ( 아이피 주소로 링크를 만들어야 합니다! ) -> 링크에 아이피주소 따올 수 있는 방법을 나중에 찾아보죠
    const cityuri = `http://192.168.1.165:8080/weather-crawler/current-weathers/by-city-name/${city}`

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
          <Text style = {styles.dataloading}> Data is loading ... </Text>
        </View>
      )
    }

    let weatherMain = this.state.weather[0].main;
    let celsius = this.state.main.temp - 273.15;
    let wind_speed = this.state.wind.speed;
    let iconId = this.state.weather[0].icon;
    let H_temp = this.state.main.temp_max-273.15;
    let L_temp = this.state.main.temp_min-273.15;

    return (
      <View style={styles.container} >

            <View style={styles.upper}>
            <Image
              style = {styles.image}
              source = {{uri: `http://openweathermap.org/img/w/${iconId}.png`}}
            />
            <Text style={styles.weather}> { weatherMain } </Text>
            <Text style={styles.temp}>온도 : {celsius.toFixed(1)} ℃ </Text>
            <Text style={styles.wind}>바람 : {wind_speed.toFixed(1)} m/s </Text>
            <Text style={styles.Htemp}> 최고기온 : {H_temp.toFixed(1)} ℃ </Text>
            <Text style={styles.Ltemp}> 최저기온 : {L_temp.toFixed(1)} ℃ </Text>
            </View>

      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: -10,
    alignItems:'center',
  },
  upper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  image:{
    width: 150, height: 150,
    marginTop: 0
  },
  temp: {
    fontSize: 20,
    backgroundColor: "transparent",
    color: "black",
    marginTop: 10
  },
  lower: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingLeft: 25
  },
  title: {
    fontSize: 38,
    backgroundColor: "transparent",
    color: "black",
    marginBottom: 10,
    fontWeight: "300",
    },
  subtitle: {
    fontSize: 24,
    backgroundColor: "transparent",
    color: "black",
    marginBottom: 24
  },
  weather: {
    fontSize: 20,
    marginTop : 5
  },
  wind:{
    fontSize: 20,
    marginTop: 10
  },
  Htemp:{
    fontSize: 15,
    color: "#FF6C66",
    marginTop: 15
  },
  Ltemp:{
    fontSize: 15,
    color:"#5AAEFF",
  //  marginTop: 22
  },
  dataloading:{
    marginTop:250,
    fontSize : 20,
    color: '#BDBDBD',
  }
});
