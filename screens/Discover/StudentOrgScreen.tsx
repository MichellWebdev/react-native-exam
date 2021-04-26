import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { STUDORGS } from '../../data/dummy';
import StudentOrgBox from '../../components/discover/StudentOrgBox';

const StudentOrg = () => {
    return (
        <SafeAreaView style={styles.studentOrgScreenContainer}>
            <View>
                <FlatList
                    data={STUDORGS}
                    renderItem={itemData => (
                        <StudentOrgBox
                            boxBackgroundColor='rgba(46, 49, 49, 0.5)'
                            boxBackgroundImage={itemData.item.orgImage}
                            studentOrg={itemData.item}
                        />
                    )}
                    keyExtractor={item => item.id}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    studentOrgScreenContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: -15,
    }
});

export default StudentOrg;