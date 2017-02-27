import React, { Component } from "react"
import { StyleSheet, View } from "react-native"
import { Button, Icon } from "native-base"

import FCM from "../../modules/FCM" // eslint-disable-line

export default class Lobby extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tracking: false,
    }

    this.toggle = this.toggle.bind(this)
    this.warn = this.warn.bind(this)
  }

  componentWillMount() {
    FCM.init(this.props.db, this.props.user.uid)

    const options = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000,
    }

    const onError = err => console.log("Geolocation error: ", JSON.stringify(err))
    const onPosition = position => {
      this.props.db.ref("test_positions").push(position)
      .then(() => console.log("Pushed test position"))
      .catch(err => console.log("Could not push test position: ", err))
    }

    this.watchID = navigator.geolocation.watchPosition(onPosition, onError, options)
  }

  componentWillUnmount() {

  }

  toggle() {
    console.log("Toggling to " + !this.state.tracking)
    const url = "https://oqoip1g5c9.execute-api.eu-central-1.amazonaws.com/dev/updateLocation"
    fetch(url + "?uid=" + this.props.user.uid + "&lat=59.926507&lng=10.746852")
    .then(res => console.log("Res: ", res))
    .catch(err => console.log("Error during fetch: ", err))
  }

  warn() {
    console.log("Warning")
    this.props.firebase.database()
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }} />
        <Button full
          style={{ backgroundColor: "#3498db", height: 80 }}
          onPress={this.warn}
        >
          <Icon name="alert" />
        </Button>
        <Button full
          style={{ backgroundColor: "#2980b9", height: 80 }}
          onPress={this.toggle}
        >
          <Icon name="play" />
        </Button>
      </View>
    )
  }

}

const styles = StyleSheet.create({ // eslint-disable-line
  button: {
    flex: 1,
  },
})
