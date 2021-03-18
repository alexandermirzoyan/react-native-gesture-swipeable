import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  FlatList,
  Animated,
  TouchableOpacity,
  Button,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const mockDataList = [
  {id: '1', text: 'Swipe me left!'},
  {id: '2', text: 'Swipe me right!'},
  {id: '3', text: 'Try swiping in both directions'},
];

const Separator = () => <View style={styles.itemSeparator} />;

const ListItem = ({text}) => (
  <Swipeable renderLeftActions={LeftActions} renderRightActions={RightActions}>
    <View style={{paddingVertical: 20}}>
      <Text style={{fontSize: 24}}>{text}</Text>
    </View>
  </Swipeable>
);

const LeftActions = (progress, dragX) => {
  const scale = dragX.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <View style={{flex: 1, backgroundColor: 'blue', justifyContent: 'center'}}>
      <Animated.Text
        style={{
          color: 'white',
          paddingHorizontal: 10,
          fontWeight: '600',
          transform: [{scale}],
        }}>
        Left Action
      </Animated.Text>
    </View>
  );
};

const RightActions = (progress, dragX) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [0.7, 0],
  });

  return (
    <>
      <TouchableOpacity onPress={() => alert('Delete button pressed')}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'red',
            justifyContent: 'center',
          }}>
          <Animated.Text
            style={{
              color: 'white',
              paddingHorizontal: 10,
              fontWeight: '600',
              transform: [{scale}],
            }}>
            Delete
          </Animated.Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => alert('Archive button pressed')}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'green',
            justifyContent: 'center',
          }}>
          <Animated.Text
            style={{
              color: 'white',
              paddingHorizontal: 10,
              fontWeight: '600',
              transform: [{scale}],
            }}>
            Archive
          </Animated.Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Button onPress={() => alert('pressed')} title="Press me" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={mockDataList}
          keyExtractor={item => item.id}
          renderItem={({item}) => <ListItem {...item} />}
          ItemSeparatorComponent={() => <Separator />}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  itemSeparator: {
    flex: 1,
    height: 1,
    backgroundColor: '#444',
  },
  container: {
    flex: 1,
  },
});

export default App;
