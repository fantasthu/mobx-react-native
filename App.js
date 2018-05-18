import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { observer, Provider } from 'mobx-react'
import Routers from './router'
import Store from './store'
@observer
export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tabIndex: 0,
      name: 12,
      selectedTab: 'home'
    }
  }
  componentWillMount() {}
  onNavigationStateChange = nav => {
    this.tabIndex = nav.index
  }
  render() {
    return (
      <Provider Store={Store}>
        <Routers
          onNavigationStateChange={this.onNavigationStateChange}
          screenProps={{ themeColor: 'white' }}
        />
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff'
  }
})
