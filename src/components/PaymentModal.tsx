import React, { useState, useRef } from 'react';
import { Formik } from 'formik';
import { Image, Text, useColorScheme, View, ColorSchemeName, StyleSheet, KeyboardAvoidingView, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';
import Modal from 'react-native-modal';
import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6';
import { useNavigation } from '@react-navigation/native';

import CustomButton from '../components/CustomButton';
import FormField from '../components/FormField';
import SignatureModal from './SignatureModal';

import { useAppSelector, useAppDispatch } from '../store';

import { createBooking } from '../store/thunks/bookingThunks';

type Props = {
    isVisible: boolean,
    onClose: () => void,
    booking: any
}

const PaymentModal: React.FC<Props> = ({ isVisible, onClose, booking }) => {

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [signatureBoardVisible, setSignatureBoardVisible] = useState(false);

    const theme = useColorScheme();

    const { car } = useAppSelector((state) => state.cars);
    const { user } = useAppSelector((state) => state.auth);

    const navigation = useNavigation<any>();
    
    const dispatch = useAppDispatch();

    const formikRef = useRef<any>(null);
    
    const scaleAnim = useRef(new Animated.Value(0)).current;

    const styles = getStyles(theme, loading);

    const start = booking.startDate.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const end = booking.endDate.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const paymentSchema = Yup.object().shape({

        cardNumber: Yup.string()
            .transform((val: string) => val.replace(/\s+/g, ""))
            .matches(/^\d{16}$/, "Card number must be 16 digits")
            .required('Card number is required'),
        

        cardName: Yup.string()
            .matches(/^[A-Za-z\s]+$/, "Name can contain only letters")
            .required('Cardholder name is required'),

        cardExpiry: Yup.string()
            .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Enter MM/YY format")
            .test("is-future-date", "Card has expired!", (value) => {
                if(!value){
                    return false;
                }

                const [month , year] = value.split('/').map(Number);

                const now = new Date();

                const expiry  = new Date(2000 + year, month);

                return expiry > now;
            }).
            required('card expiry is required'),

        
        cardCvv: Yup.string()
        .matches(/^\d{3,4}$/, 'Invalid CVV')
        .required('CVV required'),
    });

    const closeHandler = () => {
        onClose();
        setLoading(false);
        setSuccess(false);
    }

    const signatureCancelHandler = () => {
        setLoading(false);
        setSignatureBoardVisible(false);
    }

    const signatureConfirmHandler = async (signature: string) => {

        
        if(!formikRef.current){
            return signatureCancelHandler();
        }

        const { values } = formikRef.current;

        try{

            const last4Digits = values.cardNumber.replace(/\s+/g, "").slice(-4);

            const updatedBooking = {
                ...booking,
                startDate: start,
                endDate: end,
                car: car,
                paymentDetails: {
                    card: '************' + last4Digits,
                    cardholder: values.cardName,
                    signature,
                    paid: booking.cost,
                }
            }

            await dispatch(createBooking({
                data: updatedBooking,
                email: user?.email,
            })).unwrap();

            setSignatureBoardVisible(false);
            setLoading(false);
            setSuccess(true);

            Animated.spring(scaleAnim, {
                toValue: 1,
                useNativeDriver: true,
                friction: 5,
            }).start();
            
            setTimeout(() => {
                navigation.replace('Tabs', {screen: 'Bookings'});
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: "Booking is successful",
                });
            }, 1200);

        }
        catch(err: any){
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: err || "Something went wrong",
            });
            setLoading(false);
            setSignatureBoardVisible(false);
        }
    }

    const submitHandler = async () => {
        setLoading(true);
        setSignatureBoardVisible(true);
    }

    return (
        <Modal 
            isVisible={isVisible} 
            onBackdropPress={closeHandler} 
        >
            <SafeAreaView style={[styles.safeAreaStyles]}>
                    <ScrollView>
                        <KeyboardAvoidingView style={[styles.keyboardViewStyles]} >

                            <View style={styles.carDetailsStyles} >
                                <Image 
                                    source={{uri: car.images[0]}} 
                                    resizeMode='cover' 
                                    style={[styles.carImageStyles]} 
                                />
                                <View 
                                    style={{
                                        backgroundColor:theme ==='dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.5)',
                                        boxSizing:'border-box',
                                        paddingHorizontal: 10,
                                        paddingVertical: 5,
                                        borderRadius:5,
                                        rowGap:6,
                                        alignItems:'center'
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: theme === 'dark' ? 'white' : 'black',
                                            opacity: 0.8,
                                            fontSize:16,
                                        }}
                                    >
                                        {car.model} - {car.make}, {car.year}
                                    </Text>
                                    <View
                                        style={{
                                            flexDirection:'row',
                                            columnGap:5,
                                            alignItems:'center',
                                            justifyContent:'center',
                                        }}
                                        >
                                        <FontAwesome6 
                                            name='calendar-day' 
                                            size={12} 
                                            color='rgba(219, 76, 76, 1)'
                                            iconStyle='solid' 
                                            />
                                        <Text
                                            style={{
                                                color: theme === 'dark' ? 'white' : 'black',
                                                opacity: 0.6,
                                                fontSize:14,
                                            }}
                                            numberOfLines={1}
                                        >
                                            <Text style={{fontWeight:'800'}} >Pick up &#8594;</Text> {start}
                                        </Text> 
                                    </View>
                                    <View
                                        style={{
                                            flexDirection:'row',
                                            columnGap:5,
                                            alignItems:'center',
                                            justifyContent:'center',
                                        }}
                                        >
                                        <FontAwesome6 
                                            name='calendar-day' 
                                            size={12} 
                                            color='rgba(219, 76, 76, 1)'
                                            iconStyle='solid' 
                                            />
                                        <Text
                                            style={{
                                                color: theme === 'dark' ? 'white' : 'black',
                                                opacity: 0.6,
                                                fontSize:14,
                                            }}
                                            numberOfLines={1}
                                        >
                                            <Text style={{fontWeight:'800'}} >Drop off &#8594;</Text> {end}
                                        </Text> 
                                    </View>
                                </View>
                            </View>

                            <View
                                style={{
                                    flexDirection:'row',
                                    justifyContent:'space-between',
                                    paddingHorizontal: 15,
                                    paddingVertical: 12,
                                    backgroundColor:theme === 'dark' ? 'rgba(134, 142, 218, 0.2)' : 'rgba(51, 54, 84, 0.2)',
                                    borderRadius: 10
                                }}
                            >
                                <Text
                                    style={[styles.subTextStyles]}
                                >
                                    Total Fare
                                </Text>
                                <Text
                                    style={[
                                        styles.subTextStyles, {
                                            fontWeight:'600',
                                            fontSize:20,
                                            color:theme === 'dark' ? 'rgba(247, 229, 181, 1)' : 'rgba(57, 48, 21, 1)'
                                        }
                                    ]}
                                >
                                    $ {booking.cost}
                                </Text>
                            </View>

                            <Formik
                                initialValues={{ 
                                    cardNumber: '', 
                                    cardName: '',
                                    cardExpiry: '',
                                    cardCvv: '',
                                }}
                                validationSchema={paymentSchema}
                                onSubmit={submitHandler} 
                                innerRef={formikRef} 
                            >
                                {({handleSubmit}) => (
                                    <>
                                        <FormField 
                                            title='Card Number' 
                                            placeholder='Enter CardNumber...' 
                                            name='cardNumber' 
                                            otherStyles={{marginTop: 15}} 
                                        />

                                        <FormField 
                                            title='Name on Card' 
                                            name='cardName'
                                            placeholder='Enter Name on Card...'
                                            otherStyles={{marginTop: 7}} 
                                        />

                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent:'center',
                                                alignItems:'flex-start',
                                                columnGap:8,
                                                marginTop:7,
                                            }}
                                        >

                                            <FormField 
                                                title='MM/YY' 
                                                name='cardExpiry'
                                                placeholder='02/26'
                                                otherStyles={{flex: 1}} 
                                            />

                                            <FormField 
                                                title='CVV' 
                                                name='cardCvv'
                                                placeholder='456'
                                                otherStyles={{flex: 1}}
                                            />

                                        </View>

                                        <CustomButton 
                                            title='Cancel' 
                                            handlePress={closeHandler} 
                                            containerStyles={{ width:'100%', marginTop: 25, backgroundColor:'rgba(111, 111, 111, 0.6)'}} 
                                            isLoading={false} 
                                        />

                                        <TouchableOpacity 
                                            onPress={handleSubmit} 
                                            activeOpacity={0.7} 
                                            style={[
                                                styles.containerStyles,
                                                success ? 
                                                { backgroundColor: "#2ecc71" } : 
                                                { backgroundColor: loading ? "#ccc" : "#007bff" }
                                            ]}
                                            disabled={loading} 

                                        >
                                            {!success ? (
                                                <Text style={styles.textStyles}>
                                                {loading ? "Processing..." : "Pay Now"}
                                                </Text>
                                            ) : (
                                                <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                                                    <FontAwesome6 name='circle-check' size={28} color="#fff" />
                                                </Animated.View>
                                            )}
                                        </TouchableOpacity>
                                    </>
                                )}
                            </Formik>

                            <SignatureModal 
                                visible={signatureBoardVisible} 
                                onCancel={signatureCancelHandler} 
                                onConfirm={signatureConfirmHandler} 
                            />

                        </KeyboardAvoidingView>
                    </ScrollView>
            </SafeAreaView>
        </Modal>
    );
}

const getStyles = (theme: ColorSchemeName, loading:boolean) => {
    const styleSheet = StyleSheet.create({
        modalStyles:{
            margin:0,
            justifyContent: 'flex-end',
        },
        safeAreaStyles: {
            flex:1,
            backgroundColor: theme === 'dark' ? '#272f43ff' : 'white',
            borderRadius:20,
            paddingHorizontal:10,
            paddingVertical:25,
            justifyContent:'center',
            
        },
        keyboardViewStyles: {
            flex:1,
            width: '100%',
        },
        carDetailsStyles: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:theme === 'dark' ? 'rgba(167, 167, 167, 0.2)' : 'rgba(83, 83, 83, 0.2)',
            borderRadius: 10,
            marginTop:10,
            marginBottom:30,
            rowGap:5,
            paddingVertical:15,
        },
        carImageStyles: {
            width:250,
            height:110
        },
        subTextStyles: {
            fontSize: 18,
            fontWeight: 'semibold',
            color: theme === 'dark' ? 'white' : 'black',
        },
        containerStyles: {
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: loading ? 0.5 : 1,
            paddingVertical: 12,
            marginTop:15,
        },
        textStyles: {
            color: 'white',
            fontWeight: 'semibold',
            fontSize: 20,
        }
    });

    return styleSheet;
}

export default PaymentModal;