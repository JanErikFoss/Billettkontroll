import React, { Component } from "react"
import { StyleSheet, View } from "react-native"

import firebase from "./app/modules/Firebase"

import Main from "./app/components/Main"
import Auth from "./app/components/Auth/Auth"

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isConfiguring: true,
    }
  }

  componentWillMount() {

  }

  render() {
    return (
      <View style={styles.container}>
        <Auth firebase={firebase} db={firebase.database()}>
          <Main firebase={firebase} db={firebase.database()} />
        </Auth>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "white",
  },

})
