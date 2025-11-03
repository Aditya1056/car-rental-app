import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, ColorSchemeName, useColorScheme } from 'react-native';
import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6';

import CustomButton from './CustomButton';
import PaymentDetailsModal from './PaymentDetailsModal';

type Props = {
    booking: any,
    index: number,
    upComingLast: number,
    divider: boolean
}

const BookingCard: React.FC<Props> = ({ booking, index, upComingLast, divider } ) => {

    const { car, startDate, endDate, pickupLocation, dropOffLocation, paymentDetails  } = booking;

    const[showPaymentDetails, setShowPaymentDetails] = useState(false);

    const openPaymentDetailsHandler = () => {
        setShowPaymentDetails(true);
    }

    const closePaymentDetailsHandler = () => {
        setShowPaymentDetails(false);
    }

    const theme = useColorScheme();

    const styles = getStyles(theme);

    return (
        <>
            <View style={styles.viewStyles} >
                <Image 
                    source={{uri: car.images[0]}} 
                    resizeMode='cover' 
                    style={styles.imageStyles}
                />
                <Text style={styles.titleStyles} >
                    {car.model} - {car.make}
                </Text>
                <Text style={styles.subtitleStyles} >
                    {startDate} &#8594; {endDate}
                </Text>
                <View style={styles.infoStyles} >
                    <FontAwesome6 
                        name='location-crosshairs' 
                        iconStyle='solid' 
                        size={18} 
                        color='rgba(61, 165, 94, 1)'
                    />
                    <Text style={styles.subtitleStyles} >
                        <Text>Pick up: </Text> {pickupLocation.name} 
                    </Text>
                </View>
                <View style={styles.infoStyles} >
                    <FontAwesome6 
                        name='location-crosshairs' 
                        iconStyle='solid' 
                        size={18} 
                        color='rgba(189, 102, 73, 1)' 
                    />
                    <Text style={styles.subtitleStyles} >
                        <Text>Drop off: </Text> {dropOffLocation.name}
                    </Text>
                </View>

                <CustomButton 
                    title={'Payment Details \u00BB'} 
                    containerStyles={{
                        width:'50%', 
                        backgroundColor:'rgba(35, 44, 76, 1)', 
                        elevation:20,
                        borderRadius:6,
                        boxShadow:'0 0 1px 0.1px rgba(125, 133, 167, 1)',
                    }} 
                    textStyles={{fontSize: 14}}
                    isLoading={false} 
                    handlePress={openPaymentDetailsHandler} 
                />

                {
                    Number(index) <= Number(upComingLast) && 
                    <Text
                        style={{
                            backgroundColor: 'rgba(38, 235, 20, 0.5)',
                            color:theme === 'dark' ? 'white' : 'black',
                            paddingHorizontal:40,
                            paddingVertical: 8,
                            borderRadius:50,
                            fontSize:15
                        }}
                    >
                        upcoming
                    </Text>
                }
            </View>
            {
                Number(index) === Number(upComingLast) && divider && 
                <View 
                    style={{
                        height:5,
                        width:'90%',
                        margin:'auto',
                        marginTop:30,
                        backgroundColor:'rgba(162, 162, 162, 0.3)', 
                        borderRadius: 50,
                    }}
                />
            }

            <PaymentDetailsModal 
                visible={showPaymentDetails} 
                paid={paymentDetails.paid} 
                card={paymentDetails.card} 
                cardholder={paymentDetails.cardholder} 
                onCancel={closePaymentDetailsHandler} 
                signature={paymentDetails.signature} 
            />
        </>
    );
}

const getStyles = (theme: ColorSchemeName) => {
    const styleSheet = StyleSheet.create({
        viewStyles:{
            width:'90%',
            margin:'auto',
            borderRadius: 10,
            backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0,0,0,0.08)',
            alignItems: 'center',
            justifyContent: 'center',
            rowGap: 15,
            paddingTop: 2,
            paddingBottom: 20
        },
        imageStyles: {
            width: 300,
            height: 150,
        },
        titleStyles: {
            color: theme === 'dark' ? 'white' : 'black',
            fontSize: 16,
            fontWeight: '500',
        },
        subtitleStyles:{
            color: theme === 'dark' ? 'rgba(203, 203, 203, 1)' : 'rgba(71, 71, 71, 1)',
            fontSize: 14,
            fontWeight: '500',
        },
        infoStyles: {
            width:'90%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            columnGap: 5,
        },
    });

    return styleSheet;
}

export default BookingCard;