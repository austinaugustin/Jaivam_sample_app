import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    StatusBar,
    View,
    StyleSheet,
    FlatList,
    Text
} from 'react-native';
import {
    BORDER_COLOR,
    ERROR_COLOR,
    INPUT_COLOR,
    PRIMARY_COLOR,
    TEXT_COLOR,
    WHITE_COLOR,
} from '../../../assets/color';
import { getData } from "../../store/actions";
import { useDispatch } from "react-redux";

const App = () => {

    const dispatch = useDispatch()
    const data = []

    useEffect(() => {
        dispatch(getData())
    }, [])

    return (
        <>
            <SafeAreaView style={styles.safeArea} />
            <StatusBar backgroundColor={PRIMARY_COLOR} barStyle="light-content" />
            <SafeAreaView style={styles.container}>
                    <View style={styles.flatlist}>
                    <Text style={styles.title}>Welcome</Text>
                        {/* <FlatList
                            data={data}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({ item, index }) =>
                                <Child index={index} item={item} />
                            } /> */}
                    </View>
            </SafeAreaView>
        </>
    )
}

export default App

const Child = ({ item, index }) => (
    <View style={styles.card}>
        <Text style={styles.title}></Text>
    </View>
)

const styles = StyleSheet.create({
    safeArea: {
        flex: 0,
        backgroundColor: PRIMARY_COLOR,
    },
    container: {
        flex: 1,
        backgroundColor: WHITE_COLOR,
    },
    flatlist: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center'
    }
})