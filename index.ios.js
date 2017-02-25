import React, { PureComponent } from "react"
import { AppRegistry } from "react-native"

import App from "./App"

export default class Billettkontroll extends PureComponent {
  render() {
    return (
      <App />
    )
  }
}

AppRegistry.registerComponent("Billettkontroll", () => Billettkontroll)
