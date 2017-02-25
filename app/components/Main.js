import React, { PureComponent } from "react"
import { StyleSheet, View } from "react-native"

import KeyboardSpacer from "react-native-keyboard-spacer"

import LobbyNav from "./Lobby/LobbyNav"

export default class ConfigureHolder extends PureComponent {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <LobbyNav {...this.props} />
        <KeyboardSpacer />
      </View>
    )
  }

}

const styles = StyleSheet.create({ // eslint-disable-line

})
