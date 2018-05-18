import React from 'react'
import {
  View,
  Text,
  ListView,
  Image,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native'
import Carousel from 'react-native-snap-carousel'
import { inject, observer } from 'mobx-react'
import api from '../../../service/'
var Dimensions = require('Dimensions')
@inject('Store')
@observer
export default class Home extends React.Component {
  static navigationOptions = {
    title: '主页',
    headerTitle: '玩味新美食'
  }
  constructor(props) {
    super(props)
    console.log('this.props', this.props)
    this.state = {
      ds: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      dataSource: [],
      entries: [
        {
          title: '这是标题1',
          img:
            'http://velo-bucket.oss-cn-beijing.aliyuncs.com/image/1513757136904.jpg'
        },
        {
          title: '这是标题2',
          img:
            'http://velo-bucket.oss-cn-beijing.aliyuncs.com/image/1513757136904.jpg'
        },
        {
          title: '这是标题3',
          img:
            'http://velo-bucket.oss-cn-beijing.aliyuncs.com/image/1513757136904.jpg'
        }
      ]
    }
  }
  async componentWillMount() {
    const _ = await this.props.Store.getList()
    this.setState({
      dataSource: _.data
    })
  }
  rowClick(rowData) {
    console.log(rowData)
    this.props.navigation.navigate('ProductDetail', {
      rowData
    })
  }

  _renderItem({ item, index }) {
    return (
      <View style={styles.slide}>
        <Image
          style={({ height: 400 }, styles.slideImg)}
          source={{ uri: item.img }}
        />
      </View>
    )
  }
  render() {
    const sliderWidth = Dimensions.get('window').width
    const itemWidth = sliderWidth - 15
    return (
      <View style={styles.home}>
        <Carousel
          ref={c => {
            this._carousel = c
          }}
          style={styles.carousel}
          data={this.state.entries}
          renderItem={this._renderItem}
          sliderWidth={sliderWidth}
          sliderHeight={400}
          itemWidth={itemWidth}
        />
        <ListView
          enableEmptySections={true}
          style={{ marginTop: 15 }}
          dataSource={this.state.ds.cloneWithRows(this.state.dataSource)}
          renderRow={(rowData, sid, rid) => (
            <TouchableWithoutFeedback
              onPress={() => {
                this.rowClick(rowData)
              }}
            >
              <View
                style={rid % 2 === 0 ? styles.rowItem : styles.rowItemActive}
              >
                <Image style={styles.rowImg} source={{ uri: rowData.img }} />
                <Text style={styles.rowText}>{rowData.title}</Text>
              </View>
            </TouchableWithoutFeedback>
          )}
          highlightRow={(sectionId, rowId) => {
            return rowId > 2
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  home: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%'
  },
  carousel: {
    flex: 0,
    height: 400
  },
  slide: {
    display: 'flex',
    flex: 0,
    flexDirection: 'row',
    height: 400,
    overflow: 'hidden'
  },
  slideImg: {
    width: '100%',
    flex: 0,
    height: 400
  },
  title: {
    color: 'gray'
  },
  listView: {
    height: 500
  },
  rowItem: {
    backgroundColor: '#FFECD2',
    height: 100,
    flexDirection: 'row',
    padding: 10
  },
  rowItemActive: {
    backgroundColor: '#D2E6D8',
    height: 100,
    flexDirection: 'row',
    padding: 10
  },
  rowImg: {
    height: 80,
    width: 80
  },
  rowText: {
    color: '#000',
    marginLeft: 15
  }
})
