import React, { useState, useRef } from 'react';
import { Formik } from 'formik';
import { Image, Text, useColorScheme, View, ColorSchemeName, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';
import DatePicker from 'react-native-date-picker';
import {FontAwesome6} from '@react-native-vector-icons/fontawesome6';
import { useNavigation } from '@react-navigation/native';

import CustomButton from '../components/CustomButton';
import MapModal from '../components/MapModal';

import { useAppSelector } from '../store';

const getNumberOfDays = (start: Date, end: Date) => {
  const diff = Math.max(end.getTime() - start.getTime(), 0);
  return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
};

const calculateFare = (days: number, values: any, price: number) => {

    const extras = ((values?.dropOffLocation as any)?.name === 'Custom Location' || 
                    (values?.pickupLocation as any)?.name === 'Custom Location') ? 50 : 0;

    return Math.floor(days * price) + extras;
}

const BookingForm: React.FC = () => {

    const [isMapVisible, setMapVisible] = useState(false);
    const [locationType, setLocationType] = useState<'pickup' | 'dropOff' | null>(null);

    const navigation = useNavigation<any>();

    const formikRef = useRef<any>(null);

    const theme = useColorScheme();

    const styles = getStyles(theme);

    const { car } = useAppSelector(state => state.cars);

    // const dispatch = useAppDispatch();

    const BookingSchema = Yup.object().shape({
        startDate: Yup.date().required('Start date required'),
        endDate: Yup.date().required('End date required'),
        pickupLocation: Yup.object().required('Pickup location required'),
        dropOffLocation: Yup.object().required('Drop off location required'),
    });

    const submitHandler = async (values: any) => {

        try{ 
            console.log(values);
        }
        catch(err: any){
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: err || "Something went wrong",
            });
        }
    }

    const setLocationHandler = (selectedLocation: any) => {
        if(formikRef && locationType && selectedLocation){
            formikRef.current.setFieldValue(`${locationType}Location`, selectedLocation);
        }
    }

    return (
        <SafeAreaView style={[styles.safeAreaStyles]} >

            <ScrollView style={[styles.ScrollViewStyles]} >

            <View style={styles.backViewStyles} >
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <FontAwesome6 
                        name='arrow-left' 
                        size={26} 
                        color='rgba(145, 145, 145, 1)'
                        iconStyle='solid'
                    />
                </TouchableOpacity>
            </View>

                <Text 
                    style={{
                        color: '#d25044ff',
                        fontSize: 24,
                        textAlign: 'center',
                        paddingHorizontal: 20,
                        marginTop:10,
                        marginBottom: 20,
                        fontWeight: '500',
                    }} 
                    numberOfLines={1} 
                >
                    Book - {car.model}, {car.make}
                </Text>

                <View style={styles.carDetailsStyles} >
                    <Image 
                        source={{uri: car.images[0]}}  
                        resizeMode='cover' 
                        style={[styles.carImageStyles]} 
                    />
                    <View 
                        style={{
                            backgroundColor:theme ==='dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.5)',
                            width:'42%',
                            boxSizing:'border-box',
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            borderRadius:5,
                            rowGap:6
                        }}
                    >
                        <Text
                            style={{
                                color: theme === 'dark' ? 'white' : 'black',
                                opacity: 0.8,
                                fontSize:18,
                            }}
                        >
                            {car.model}
                        </Text>
                        <Text
                            style={{
                                color: theme === 'dark' ? 'white' : 'black',
                                opacity: 0.8,
                                fontSize:14,
                            }}
                        >
                            {car.make}, {car.year} 
                        </Text>
                        <View
                            style={{
                                flexDirection:'row',
                                columnGap:5,
                                alignItems:'center',
                                justifyContent:'flex-start',
                            }}
                            >
                            <FontAwesome6 
                                name='gear' 
                                size={12} 
                                color={theme === 'dark' ? 'white' : 'black'}
                                iconStyle='solid' 
                                />
                            <Text
                                style={{
                                    color: theme === 'dark' ? 'white' : 'black',
                                    opacity: 0.6,
                                    fontSize:12,
                                }}
                                numberOfLines={1}
                            >
                                {car.topSpeed}mph, {car.transmission}
                            </Text> 
                        </View>
                    </View>
                </View>

                <Formik
                    initialValues={{ 
                        startDate: new Date(), 
                        endDate: new Date(),
                        pickupLocation: undefined,
                        dropOffLocation: undefined,
                    }}
                    validationSchema={BookingSchema}
                    onSubmit={submitHandler} 
                    innerRef={formikRef} 
                >
                    {({values, setFieldValue, errors, touched, handleSubmit}) => (
                        <>
                            <View style={styles.dateViewStyles} >
                                <Text style={styles.fieldNameStyles} >
                                    Select Start Date
                                </Text>
                                <View
                                    style={{
                                        backgroundColor: theme === 'dark' ? 'rgba(57, 57, 57, 0.4)' : 'rgba(186, 186, 186, 0.4)',
                                        borderRadius:15,
                                        overflow:'hidden',
                                    }}
                                >
                                    <DatePicker 
                                        date={values.startDate}
                                        onDateChange={(date) => setFieldValue('startDate', date)} 
                                        mode='date' 
                                        minimumDate={new Date()} 
                                        style={{
                                            margin:'auto',
                                        }}
                                    />
                                </View>
                                {
                                    touched.startDate && errors.startDate && 
                                    <Text>{String(errors.startDate)}</Text>
                                }
                            </View>

                            <View style={styles.dateViewStyles} >
                                <Text style={styles.fieldNameStyles} >
                                    Select End Date
                                </Text>
                                <View
                                    style={{
                                        backgroundColor: theme === 'dark' ? 'rgba(57, 57, 57, 0.4)' : 'rgba(186, 186, 186, 0.4)',
                                        borderRadius:15,
                                        overflow:'hidden',
                                    }}
                                >
                                    <DatePicker 
                                        date={values.endDate}
                                        onDateChange={(date) => setFieldValue('endDate', date)} 
                                        mode='date' 
                                        minimumDate={values.startDate} 
                                        style={{
                                            margin:'auto',
                                        }}
                                        
                                    />
                                </View>
                                {
                                    touched.endDate && errors.endDate && 
                                    <Text>{String(errors.endDate)}</Text>
                                }
                            </View>

                            <TouchableOpacity 
                                activeOpacity={0.5} 
                                style={styles.selectLocationStyles} 
                                onPress={() => {
                                    setMapVisible(true);
                                    setLocationType('pickup');
                                }}
                            >
                                <FontAwesome6 
                                    name='location-crosshairs' 
                                    iconStyle='solid' 
                                    size={24} 
                                    color='rgba(241, 102, 102, 0.8)'
                                />
                                <Text style={[styles.fieldNameStyles, {width:'90%'}]} numberOfLines={1} >
                                    {values.pickupLocation
                                    ? `Pickup: ${(values.pickupLocation as any).name !== 'Custom Location' ? 
                                        (values.pickupLocation as any).name : 
                                        (values.pickupLocation as any).lat + ' LT, ' + (values.pickupLocation as any).lng + ' LN'
                                    }`
                                    : 'Select Pickup Location'}
                                </Text>
                            </TouchableOpacity>

                            <View 
                                style={{
                                    width:2,
                                    height:20,
                                    backgroundColor:'white',
                                    margin:'auto',
                                }} 
                            />

                            <TouchableOpacity 
                                activeOpacity={0.5} 
                                style={styles.selectLocationStyles}
                                onPress={() => {
                                    setMapVisible(true);
                                    setLocationType('dropOff');
                                }}
                            >
                                <FontAwesome6 
                                    name='location-crosshairs' 
                                    iconStyle='solid' 
                                    size={24} 
                                    color='rgba(241, 102, 102, 0.8)'
                                />
                                <Text style={[styles.fieldNameStyles, {width:'90%'}]} numberOfLines={1} >
                                    {values.dropOffLocation
                                    ? `DropOff: ${(values.dropOffLocation as any).name !== 'Custom Location' ? 
                                        (values.dropOffLocation as any).name : 
                                        (values.dropOffLocation as any).lat + ' LT, ' + (values.dropOffLocation as any).lng + ' LN'
                                    }`
                                    : 'Select Drop Off Location'}
                                </Text>
                            </TouchableOpacity>

                            {
                                (
                                    (values?.dropOffLocation as any)?.name === 'Custom Location' || 
                                    (values?.pickupLocation as any)?.name === 'Custom Location'
                                ) && 
                                <View
                                    style={{
                                        paddingHorizontal: 20,
                                        flexDirection:'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        columnGap: 5,
                                        marginTop: 15,
                                    }}
                                >
                                    <FontAwesome6 
                                        name='circle-info' 
                                        iconStyle='solid' 
                                        size={16}
                                        color={theme === 'dark' ? 'rgba(203, 203, 203, 1)' : 'black'} 
                                    />
                                    <Text
                                        style={[
                                            styles.fieldNameStyles,
                                            {
                                                fontSize: 12
                                            }
                                        ]}
                                    >
                                        Extra fare $50 added for custom location.
                                    </Text>
                                </View>
                            }

                            <View style={styles.footerViewStyles} >
                                <Text
                                    style={{
                                        width: '45%',
                                        fontSize:22,
                                        color: theme === 'dark' ? 'white' : 'black',
                                        fontWeight:500,
                                        backgroundColor: 'rgba(226, 24, 24, 0.3)',
                                        textAlign:'center',
                                        paddingVertical: 5,
                                        borderRadius:20,
                                    }}
                                >
                                    $ {calculateFare(getNumberOfDays(values.startDate, values.endDate), values, Number(car.pricePerDay))}
                                </Text>
                                <CustomButton  
                                    title='Checkout' 
                                    isLoading={!(
                                        values.dropOffLocation &&
                                        values.endDate &&
                                        values.pickupLocation && 
                                        values.startDate
                                    )} 
                                    handlePress={handleSubmit} 
                                    containerStyles={{width:'50%', borderRadius:50}}
                                />
                            </View>
                        </>
                    )}
                </Formik>

                <MapModal 
                    key={"modal"} 
                    visible={isMapVisible} 
                    onSelectLocation={setLocationHandler} 
                    onClose={() => {
                        setLocationType(null);
                        setMapVisible(false);
                    }}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const getStyles = (theme: ColorSchemeName) => {
    const styleSheet = StyleSheet.create({
        backViewStyles:{
            flexDirection: 'row',
            paddingHorizontal: 8,
            marginTop:20,
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        safeAreaStyles: {
            minHeight:'100%',
            backgroundColor: theme === 'dark' ? '#1E1E1E' : 'white',
        },
        ScrollViewStyles: {
            paddingHorizontal: 25,
            marginVertical: 10,
        },
        carDetailsStyles: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            columnGap: 3,
            backgroundColor:theme === 'dark' ? 'rgba(167, 167, 167, 0.2)' : 'rgba(83, 83, 83, 0.2)',
            borderRadius: 10,
            marginBottom:30,
        },
        carImageStyles: {
            width:185,
            height:130
        },
        dateViewStyles:{
            flex:1,
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            marginBottom:20,
        },
        fieldNameStyles:{
            fontSize:16,
            color: theme === 'dark' ? 'rgba(166, 166, 166, 1)' : 'rgba(46, 46, 46, 1)',
            marginBottom:5,
            fontWeight: '500',
        },
        selectLocationStyles:{
            flexDirection: 'row',
            backgroundColor:theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0,0,0,0.1)',
            marginHorizontal:10,
            paddingHorizontal:15,
            paddingVertical:12,
            columnGap:10,
            borderRadius: 5,
        },
        footerViewStyles: {
            flexDirection: 'row',
            paddingHorizontal:20,
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop:30,
            marginBottom:20,
        }
    });

    return styleSheet;
}

export default BookingForm;