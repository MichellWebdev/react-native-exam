import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Dummy data
import { EVENTS } from '../../data/dummy';

// Custom components
import EventBox from '../../components/discover/EventBox';

const Events = () => {
  return (
    <SafeAreaView style={styles.eventScreenContainer}>
      <View>
        <FlatList
          data={EVENTS}
          initialNumToRender={10}
          showsVerticalScrollIndicator={false}
          renderItem={itemData => (
            <EventBox
              boxBackgroundColor='rgba(46, 49, 49, 0.5)'
              boxBackgroundImage={itemData.item.image}
              event={itemData.item}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  eventScreenContainer: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: -15,
  },
});

export default Events;
