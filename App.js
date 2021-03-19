import React, {useState} from 'react';
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
  Modal,
  Alert,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const mockDataListInitial = [
  {id: '1', text: 'Lorem ipsum'},
  {id: '2', text: 'Simply dummy text'},
  {id: '3', text: 'Standard dummy text'},
  {id: '4', text: 'Letraset sheets'},
  {id: '5', text: 'It has roots'},
  {id: '6', text: 'Extremes of Good'},
  {id: '7', text: 'There are many'},
  {id: '8', text: 'Variations of passages'},
  {id: '9', text: 'All the Lorem Ipsum generators'},
  {id: '10', text: 'Lorem Ipsum is'},
  {id: '11', text: 'Therefore always free'},
  {id: '12', text: 'Embarrassing hidden'},
  {id: '13', text: 'Latin words'},
  {id: '14', text: 'Many desktop publishing'},
  {id: '15', text: 'Packages and web page'},
  {id: '16', text: 'Various versions'},
  {id: '17', text: 'Letraset sheets'},
  {id: '18', text: 'Including versions of Lorem Ipsum'},
  {id: '19', text: 'It uses a dictionary'},
  {id: '20', text: 'Of over 200 Latin words'},
];

const Separator = () => <View style={styles.itemSeparator} />;

const ListItem = ({text, onSwipeFromLeft, onSwipeFromRight}) => (
  <Swipeable
    renderLeftActions={LeftActions}
    onSwipeableLeftOpen={onSwipeFromLeft}
    renderRightActions={RightActions}
    onSwipeableRightOpen={onSwipeFromRight}>
    <View style={styles.listItemContainer}>
      <Text style={styles.listItemText}>{text}</Text>
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
    <View style={styles.leftAction}>
      <Animated.Text style={[styles.actionText, {transform: [{scale}]}]}>
        Add to Archive
      </Animated.Text>
    </View>
  );
};

const RightActions = (progress, dragX) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.rightActions}>
      <Animated.Text style={[styles.actionText, {transform: [{scale}]}]}>
        Remove
      </Animated.Text>
    </View>
  );
};

const App = () => {
  const [archivedItems, setArchivedItems] = useState([]);
  const [mockDataList, setMockDataList] = useState(mockDataListInitial);
  const [modalVisibility, setModalVisibility] = useState(false);

  const handleArchivedItem = itemID => {
    const foundArchivingItem = mockDataList.find(
      item => parseInt(item.id) === parseInt(itemID),
    );
    setArchivedItems([...archivedItems, foundArchivingItem]); // pushing archived item to archived state
    setMockDataList(
      mockDataList.filter(item => parseInt(item.id) !== parseInt(itemID)),
    );
    setModalVisibility(true);
  };

  const deleteMockedItem = itemID => {
    console.log('deleting item', itemID);
    setMockDataList(
      mockDataList.filter(item => parseInt(item.id) !== parseInt(itemID)),
    );
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Button
        onPress={() => setModalVisibility(true)}
        title="Show archived items"
      />
      <Modal visible={modalVisibility}>
        <Button
          title="Close archived items"
          onPress={() => setModalVisibility(false)}
        />
        <Text style={{fontSize: 42, fontWeight: '600', textAlign: 'center'}}>
          Archived items
        </Text>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={archivedItems}
            keyExtractor={item => item.id}
            renderItem={({item}) => <ListItem {...item} />}
            ItemSeparatorComponent={() => <Separator />}
          />
        </SafeAreaView>
      </Modal>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={mockDataList}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <ListItem
              {...item}
              onSwipeFromLeft={() => handleArchivedItem(item.id)}
              onSwipeFromRight={() => {
                Alert.alert(
                  'Delete item',
                  `Are you sure to delete ${item.text} ?`,
                  [
                    {
                      text: 'no',
                      onPress: () => console.log('cancel'),
                      style: 'cancel',
                    },
                    {text: 'Yes', onPress: () => deleteMockedItem(item.id)},
                  ],
                );
              }}
            />
          )}
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
  listItemContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  listItemText: {
    color: '#4a4a4a',
    fontSize: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  leftAction: {
    backgroundColor: 'blue',
    justifyContent: 'center',
    flex: 1,
  },
  rightActions: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  actionText: {
    color: 'white',
    fontWeight: '600',
    padding: 20,
  },
});

export default App;
