import React, { Component } from "react"
import { StyleSheet, View, Navigator, Text, Platform, Keyboard } from "react-native"
import { Icon, Button } from "native-base"

import Lobby from "./Lobby"
import Options from "./Options"

export default class LobbyNav extends Component {
  static getButton({ image = "arrow-back", onPress }) {
    return (
      <Button transparent style={{ flex: 1 }}
        onPress={() => {
          Keyboard.dismiss()
          onPress && onPress()
        }}
      >
        <Icon name={image} style={{ fontSize: 35 }} />
      </Button>
    )
  }

  static getTitle(text) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ fontSize: 20 }}>{text}</Text>
      </View>
    )
  }

  static renderScene(scene) {
    return (
      <View style={{ paddingTop: Platform.OS === "ios" ? 64 : 54, flex: 1 }}>
        {scene}
      </View>
    )
  }

  static renderNavBar() {
    return (
      <Navigator.NavigationBar style={styles.navBar}
        routeMapper={{
          LeftButton: (route, nav, index, navState) => route.left(route, nav, index, navState),
          RightButton: (route, nav, index, navState) => route.right(route, nav, index, navState),
          Title: (route, nav, index, navState) => route.title(route, nav, index, navState),
        }}
      />
    )
  }

  componentWillMount() {
    this.initialRouteIndex = 0

    const findRoute = name => this.routes.find(route => route.name === name)
    const jumpTo = name => this._nav.jumpTo(findRoute(name))
    this.routes = [
      {
        index: 0,
        name: "lobby",
        title: () => LobbyNav.getTitle("Billettkontroll"),
        render: (route, nav) => LobbyNav.renderScene((
          <Lobby ref={r => (this._lobby = r)} {...this.getProps({ route, nav })} />
        )),
        left: () => null,
        right: () => LobbyNav.getButton({
          image: "cog",
          onPress: () => jumpTo("options"),
        }),
        getRef: () => this._lobby,
      },

      {
        index: 1,
        name: "options",
        title: () => LobbyNav.getTitle("Instillinger"),
        render: (route, nav) => LobbyNav.renderScene((
          <Options ref={r => (this._options = r)} {...this.getProps({ route, nav })} />
        )),
        left: () => LobbyNav.getButton({
          onPress: () => jumpTo("lobby"),
        }),
        right: () => null,
        getRef: () => this._lobby,
      },

    ]
  }

  getProps({ route, nav }) {
    return {
      ...this.props,
      route,
      navigator: nav,
    }
  }

  render() {
    return (
      <Navigator style={styles.nav}
        ref={r => (this._nav = r)}
        initialRoute={this.routes[this.initialRouteIndex]}
        initialRouteStack={this.routes}
        renderScene={(route, nav) => route.render(route, nav)}
        onWillFocus={(route, nav) => route.onWillFocus && route.onWillFocus(route, nav)}
        onDidFocus={(route, nav) => route.onDidFocus && route.onDidFocus(route, nav)}
        navigationBar={LobbyNav.renderNavBar()}
        configureScene={route => route.config || Navigator.SceneConfigs.HorizontalSwipeJump}
      />
    )
  }

}

const styles = StyleSheet.create({
  navigator: {
  },

  buttonHighlight: {
    padding: 4,
    flex: 1,
    justifyContent: "center",
  },
  buttonImage: {
    width: 38,
    height: 38,
  },

})
