import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Image, Text, useColorScheme, View, ColorSchemeName, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import CustomButton from '../components/CustomButton';
import FormField from '../components/FormField';

import { useAppSelector, useAppDispatch } from '../store';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { signUp } from '../store/thunks/authThunks';

type Props = NativeStackScreenProps<any>;

const Login: React.FC<Props> = ({ navigation }) => {

    const theme = useColorScheme();

    const styles = getStyles(theme);

    const dispatch = useAppDispatch();

    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(6, 'Too short!').required('Password required'),
        fullname: Yup.string().required('Name is required'),
    });

    const { loading } = useAppSelector(state => state.auth);

  
  const submitHandler = async (values: any) => {

    try{
        await dispatch(signUp(values)).unwrap();
        Toast.show({
            type: 'success',
            text1: 'Success',
            text2: "Signed up successfully",
        });
    }
    catch(err: any){
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: err || "Something went wrong",
        });
    }
  }

    return (
        <SafeAreaView style={[styles.safeAreaStyles]} >

            <KeyboardAvoidingView style={[styles.keyboardViewStyles]} >

                <Image 
                    source={require('../assets/car.png')} 
                    resizeMode='cover' 
                    style={[styles.carImageStyles]} 
                />

                <View style={[styles.innerViewStyles]} >
                    <Image 
                    source={require('../assets/carRental.png')} 
                    resizeMode='contain' 
                    style={[styles.logoStyles]} 
                    />

                    <Text style={[styles.subTextStyles]} >
                        SignUp into Avis
                    </Text>
                </View>

                <Formik
                    initialValues={{ email: '', password: '', fullname: '' }}
                    validationSchema={LoginSchema}
                    onSubmit={submitHandler} 
                >
                    {({handleSubmit}) => (
                        <>
                            <FormField 
                                title='Full Name' 
                                placeholder='Enter your Name...'
                                name='fullname' 
                                otherStyles={{marginTop: 12}} 
                            />
                            <FormField 
                                title='Email' 
                                placeholder='Enter your Email...'
                                name='email' 
                                otherStyles={{marginTop: 7}} 
                            />

                            <FormField 
                                title='Password' 
                                name='password'
                                placeholder='Enter your Password...'
                                otherStyles={{marginTop: 7}} 
                            />

                            <CustomButton 
                                title='Sign Up' 
                                handlePress={handleSubmit} 
                                containerStyles={{ width:'100%', marginTop: 30}} 
                                isLoading={loading} 
                            />

                        </>
                    )}
                </Formik>

                <View style={styles.linkViewStyles} >

                    <Text style={[styles.linkTextStyles]}> 
                        Already have an account?
                    </Text>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.linkButtonStyles} >
                            Sign In
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const getStyles = (theme: ColorSchemeName) => {
    const styleSheet = StyleSheet.create({
        safeAreaStyles: {
            minHeight: '100%',
            backgroundColor: theme === 'dark' ? '#1E1E1E' : 'white',
        },
        keyboardViewStyles: {
            justifyContent: 'center',
            flex:1,
            width: '100%',
            paddingHorizontal: 25,
            marginVertical: 10,
        },
        carImageStyles: {
            width:380,
            height:220
        },
        innerViewStyles: {
            width: '100%',
            marginTop:3,
            flexDirection: 'row',
            justifyContent:'center',
            alignItems: 'center',
            columnGap: 20,
        },
        logoStyles: {
            width: 40,
            height: 40,
        },
        subTextStyles: {
            fontSize: 20,
            fontWeight: 'semibold',
            color: theme === 'dark' ? 'white' : 'black',
        },
        linkViewStyles: {
            justifyContent: 'center',
            paddingTop: 20,
            flexDirection: 'row',
            gap: 8,

        },
        linkTextStyles: {
            color: theme === 'dark' ? '#f7fafc' : 'black',
            fontSize: 15,
            fontWeight: 'regular'
        },
        linkButtonStyles: {
            color: '#bf683f',
            fontSize: 15,
            fontWeight: 'semibold',
        }
    });

    return styleSheet;
}

export default Login;