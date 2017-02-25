import React, { Component } from "react"
import { StyleSheet, View } from "react-native"
import { Button, Icon } from "native-base"

export default class Lobby extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentWillMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }} />
        <Button full
          style={{ backgroundColor: "#3498db", height: 80 }}
        >
          <Icon name="alert" />
        </Button>
        <Button full
          style={{ backgroundColor: "#2980b9", height: 80 }}
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
