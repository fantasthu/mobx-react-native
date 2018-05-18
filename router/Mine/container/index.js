import React from 'react'
import { View, Text } from 'react-native'

export default class Home extends React.Component {
  static navigationOptions = {
    title: '我的'
  }
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View>
        <Text>这是我的页面</Text>
      </View>
    )
  }
}
