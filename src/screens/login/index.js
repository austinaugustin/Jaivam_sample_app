import React, { useEffect, useState } from 'react';
import {
    Keyboard,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { useDispatch,useSelector } from 'react-redux';
import { getuserLogin } from '../../store/actions/userActions';
import Button from '../../components/Button';
import {
    BORDER_COLOR,
    ERROR_COLOR,
    INPUT_COLOR,
    PRIMARY_COLOR,
    TEXT_COLOR,
    WHITE_COLOR,
} from '../../../assets/color';

function App(props) {
    
    const dispatch = useDispatch();
    const userReducer = useSelector((state) => state?.userReducer);

    const [input, onFoucus] = useState('emailAddress');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({
        email: '',
        password: '',
        errorMessage: '',
    });
    const [showPassword, onToggle] = useState(true);
    const [disable, setDisable] = useState(false);

    useEffect(() => {
        dispatch({ type: "USER_LOGIN_RESET" });
    }, []);


    function handleOnFocus(value) {
        onFoucus(value);
        clearError();
    }

    function validateEmail(email) {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const clearError = () => {
        const err = { ...error };
        err.email = '';
        err.password = '';
        err.errorMessage = '';
        setError(err);
    };

    function handleSubmit() {
        Keyboard.dismiss();
        clearError();
        setDisable(true);
        if (email && password) {
            if (validateEmail(email)) {
                let params = {
                    email: email,
                    password: password,
                };
                setDisable(false);
                dispatch(getuserLogin(params))
                // navigation.navigate('Home');
            } else {
                const err = { ...error };
                err.email = 'Invalid email address';
                setError(err);
                setDisable(false);
            }
        } else {
            const err = { ...error };
            err.errorMessage = 'Please enter the credentials';
            setError(err);
            setDisable(false);
        }
    }

    return (
        <>
            <SafeAreaView style={styles.safeArea} />
            <StatusBar backgroundColor={PRIMARY_COLOR} barStyle="light-content" />
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.contentContainer}>
                        <Text style={styles.title}>Let’s get Started</Text>
                        <Text style={styles.text}>Login with your credentials</Text>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.textInputContainer}>
                            <Text style={styles.textInput}>Email ID</Text>
                            <View
                                style={
                                    input === 'emailAddress'
                                        ? styles.activeInputContainer
                                        : styles.inputContainer
                                }>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Email ID"
                                    value={email}
                                    onChangeText={text => setEmail(text)}
                                    onFocus={() => handleOnFocus('emailAddress')}
                                    placeholderTextColor={
                                        input === 'emailAddress' ? INPUT_COLOR : INPUT_COLOR
                                    }
                                />
                            </View>
                        </View>
                        {error.email ? (
                            <Text style={styles.error}>{error.email}</Text>
                        ) : null}
                        <View style={styles.textInputContainer}>
                            <Text style={styles.textInput}>Password</Text>
                            <View
                                style={
                                    input === 'Password'
                                        ? styles.activeInputContainer
                                        : styles.inputContainer
                                }>
                                <TextInput
                                    style={styles.input}
                                    autoCorrect={false}
                                    placeholder="Enter Password"
                                    value={password}
                                    onChangeText={text => setPassword(text)}
                                    onFocus={() => handleOnFocus('Password')}
                                    onSubmitEditing={handleSubmit}
                                    secureTextEntry={showPassword}
                                    placeholderTextColor={
                                        input === 'Password' ? INPUT_COLOR : INPUT_COLOR
                                    }
                                />
                            </View>
                        </View>
                        {userReducer?.errorMessage ? <Text style={styles.error}>{userReducer.errorMessage}</Text> : null}
                        <Button onPress={handleSubmit} label="Login" disable={userReducer?.isLoading} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

export default App;

const styles = StyleSheet.create({
    safeArea: {
        flex: 0,
        backgroundColor: PRIMARY_COLOR,
    },
    container: {
        flex: 1,
        backgroundColor: WHITE_COLOR,
    },
    contentContainer: {
        height: 200,
        padding: 25,
        paddingBottom: 60,
        backgroundColor: PRIMARY_COLOR,
        justifyContent: 'flex-end',
    },
    title: {
        fontSize: 24,
        color: WHITE_COLOR,
        lineHeight: 29,
    },
    text: {
        fontSize: 14,
        color: WHITE_COLOR,
        lineHeight: 17,
        paddingTop: 8,
    },
    content: {
        marginTop: -30,
        backgroundColor: WHITE_COLOR,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 25,
        paddingTop: 40,
        justifyContent: 'space-between',
    },
    textInputContainer: {
        marginVertical: 8,
    },
    textInput: {
        fontSize: 14,
        //   fontFamily: SECONDARY_FONT,
        color: TEXT_COLOR,
        paddingBottom: 8,
    },
    activeInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: BORDER_COLOR,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: BORDER_COLOR,
    },
    input: {
        height: 50,
        flex: 1,
        paddingHorizontal: 15,
        fontSize: 14,
        color: INPUT_COLOR,
    },
    show: {
        paddingRight: 10,
    },
    error: {
        fontSize: 14,
        color: ERROR_COLOR,
        paddingBottom: 8,
    },
});
