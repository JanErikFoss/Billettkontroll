import React, { Component } from "react"
import { StyleSheet, View, Alert } from "react-native"
import { Spinner } from "native-base"

import DeviceInfo from "react-native-device-info"

export default class Auth extends Component {
  static failedToAuthenticate(err) {
    console.log("Failed to authenticate user: ", err)
  }

  constructor(props) {
    super(props)

    this.state = {
      email: DeviceInfo.getUniqueID() + "@bk.solafosstek.no",
      password: "defaultpass-g23fzcasvhg23rgtpåæ@",
    }
  }

  componentWillMount() {
    let user
    this.authorizeUser()
    .then(u => (user = u))
    .catch(err => {
      console.log("Failed to sign in: ", err)
      Alert.alert("Error: " + err.code, err.message)
      Promise.reject("Failed to sign in, not setting state")
    })
    .then(() => this.setState({ user }))
    .then(() => console.log("User is signed in"))
    .catch(err => console.log("Failed to set state after authorizing: ", err))
  }

  authorizeUser() {
    const auth = this.props.firebase.auth()
    return new Promise((resolve, reject) => {
      auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch(err => (err.code === "auth/email-already-in-use")
        ? auth.signInWithEmailAndPassword(this.state.email, this.state.password)
        : Promise.reject(err))
      .then(resolve)
      .catch(reject)
    })
  }

  render() {
    return (
      <View style={styles.container}>

        {this.state.user &&
          React.cloneElement(this.props.children, { user: this.state.user })
        }
        {!this.state.user &&
          <View style={styles.spinnerContainer}>
            <Spinner color={this.props.color || "white"} />
          </View>
        }

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  spinnerContainer: {
    flex: 1,
    justifyContent: "center",
  },
})
