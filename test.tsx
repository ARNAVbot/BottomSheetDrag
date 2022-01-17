import {FlatList, StatusBar, StyleSheet, Text, View} from 'react-native';
import {NativeViewGestureHandler} from 'react-native-gesture-handler';
import React, { useContext } from "react";
import {userContext} from './App';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title:
      'Curabitur accumsan sit amet massa quis cursus. Fusce sollicitudin nunc nisl, quis efficitur quam tristique eget. Ut non erat molestie, ullamcorper turpis nec, euismod neque. Praesent aliquam risus ultricies, cursus mi consectetur, bibendum lorem. Nunc eleifend consectetur metus quis pulvinar. In vitae lacus eu nibh tincidunt sagittis ut id lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque sagittis mauris rhoncus, maximus justo in, consequat dolor. Pellentesque ornare laoreet est vulputate vestibulum. Aliquam sit amet metus lorem.',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const CustomBS = () => {
  // const {nativeGestureRef} = props;
  const {nativeGestureRef} = useContext(userContext);
  const renderItem = ({item}) => <Item title={item.title} />;
  return (
    <View>
      <Text>Hey this is test</Text>
      <NativeViewGestureHandler
        ref={nativeGestureRef}
        shouldCancelWhenOutside={false}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </NativeViewGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: '#eee',
  },
});

export default CustomBS;
