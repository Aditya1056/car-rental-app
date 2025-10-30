import React, {useState, useEffect} from 'react';
import { View, StyleSheet, useColorScheme, ColorSchemeName, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../util/types';
import { useAppDispatch, useAppSelector } from '../store';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import {generatePDF} from 'react-native-html-to-pdf';
import Share from 'react-native-share';


import Loader from '../components/Loader';
import CarImageCarousel from '../components/CarImageCarousel';
import CustomButton from '../components/CustomButton';

import { getCarById } from '../store/thunks/carThunks';
import { ScrollView } from 'react-native-gesture-handler';

const CarDetails: React.FC = () => {

    const [loading, setLoading] = useState(true);
    const [exporting, setExporting] = useState(false);

    const { car } = useAppSelector(state => state.cars);

    const route = useRoute();
    const theme = useColorScheme();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const dispatch = useAppDispatch();

    const styles = getStyles(theme);

    const { id } = route.params as {id: string};

    const handleExport = async () => {
        try {
            setExporting(true);
            const html = `
                <html>
                <head>
                    <style>
                    body { font-family: Helvetica; padding: 20px; }
                    h1 { text-align: center; color: #1f1f1fff; }
                    img { width: 100%; border-radius: 8px; margin: 10px 0; }
                    p { font-size: 18px; line-height: 22px; color: #5b5b5bff; }
                    </style>
                </head>
                <body>
                    <h1 style="font-size:50px; margin-bottom: 20px; color:rgba(233,81,81,1)" >Avis</h1>
                    <h1>${car.make} - ${car.model}, (${car.year})</h1>
                    <p><b>Description:</b> ${car.description}</p>
                    <p><b>Transmission:</b> ${car.transmission}</p>
                    <p><b>Seats:</b> ${car.seats}</p>
                    <p><b>Top Speed:</b> ${car.topSpeed} mph</p>
                    <p><b>Price Per Day:</b> $${car.pricePerDay}</p>
                    ${car.images.map((url: string) => 
                        `<img src="${url}" style="object-fit:cover" width="460px" height="260px" />`).join('')
                    }
                </body>
                </html>
            `;

            const file = await generatePDF({
                html,
                fileName: `Avis_${car.make}_${car.model}`,
                base64: false,
            });

            await Share.open({
                url: `file://${file.filePath}`,
                type: 'application/pdf',
                failOnCancel: false,
            });

        } 
        catch {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Something went wrong while exporting PDF'

            });
        }
        finally{
            setExporting(false);
        }
    };

    useEffect(() => {
        const fetchCar = async () => {
            try{
                await dispatch(getCarById(id)).unwrap();
            }
            catch{
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Car not Found!',
                });
            }
            finally{
                setLoading(false);
            }
        }

        fetchCar();
    }, [dispatch, id]);

    return (
        <SafeAreaView style={styles.safeAreaStyles} >
            <ScrollView style={styles.scrollStyles} >
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
                {
                    loading && <Loader />
                }
                {
                    !loading && car && 
                    <>
                        <CarImageCarousel images={car.images} />
                        <View style={styles.viewContainerStyles} >
                            <View style={styles.headerContainerStyles} >
                                <View style={{maxWidth: '70%', rowGap: 3}} >
                                    <Text style={[styles.textStyles, {fontSize: 24}]} numberOfLines={1} >
                                        {car.model}
                                    </Text>
                                    <Text style={[styles.textStyles, { opacity: 0.7 }]} numberOfLines={1}>
                                        {car.make} - {car.year}
                                    </Text>
                                </View>
                                <TouchableOpacity 
                                    style={{
                                        flexDirection: 'row', 
                                        justifyContent: 'center', 
                                        alignItems: 'center', 
                                        columnGap: 5,
                                        backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(34, 34, 34, 0.1)', 
                                        borderRadius: 5,
                                        paddingHorizontal: 15, 
                                        paddingVertical: 8,
                                        opacity: exporting ? 0.5 : 1
                                    }} 
                                    disabled={exporting} 
                                    onPress={() => handleExport()} 
                                >
                                    <Text style={[styles.textStyles, { opacity: 0.8 }]}>Export</Text>
                                    <FontAwesome6 
                                        name='download' 
                                        size={14} 
                                        color={theme === 'dark' ? 'rgba(203, 203, 203, 1)' : 'rgba(0, 0, 0, 1)'}
                                        iconStyle='solid' 
                                    />
                                </TouchableOpacity>
                            </View>
                            <Text 
                                style={{
                                    paddingHorizontal: 30,
                                    color: theme ==='dark' ? 'rgba(211, 211, 211, 1)' : 'black',
                                    paddingTop:2,
                                    paddingBottom: 10
                                }} 
                            >
                                {car.description}
                            </Text>
                            <View style={styles.specStylesContainer} >

                                <View style={styles.specStyles} >

                                    <Ionicons
                                        name='speedometer-sharp'
                                        size={23} 
                                        color={theme === 'dark' ? 'white' : 'black'}
                                    />

                                    <Text style={styles.specHeaderStyles} numberOfLines={1} >
                                        Top Speed
                                    </Text>

                                    <Text style={[styles.specInfoStyles]} numberOfLines={1} >
                                        {car.topSpeed} 
                                        <Text style={{
                                            fontWeight: 'regular', 
                                            fontSize: 14
                                            }} 
                                        >
                                            mph
                                        </Text>
                                    </Text>

                                </View>
                                
                                <View style={styles.specStyles} >

                                    <FontAwesome6 
                                        name='gears' 
                                        size={23} 
                                        iconStyle='solid' 
                                        color={theme === 'dark' ? 'white' : 'black'} 
                                    />

                                    <Text style={styles.specHeaderStyles} numberOfLines={1} >
                                        Transmission
                                    </Text>

                                    <Text style={styles.specInfoStyles} numberOfLines={1} >
                                        {car.transmission}
                                    </Text>

                                </View>
                            </View>
                            <View style={styles.specStylesContainer} >
                                <View style={styles.specStyles} >

                                    <FontAwesome6 
                                        name='user-group' 
                                        size={23} 
                                        iconStyle='solid' 
                                        color={theme === 'dark' ? 'white' : 'black'}
                                    />

                                    <Text style={styles.specHeaderStyles} numberOfLines={1} >
                                        Capacity
                                    </Text>

                                    <Text style={styles.specInfoStyles} numberOfLines={1} >
                                        {car.seats} 
                                        <Text style={{
                                            fontWeight: 'regular', 
                                            fontSize: 14
                                            }} 
                                        >
                                            seats
                                        </Text>
                                    </Text>

                                </View>

                                <View style={styles.specStyles} >

                                    <FontAwesome6 
                                        name='circle-dollar-to-slot' 
                                        size={23} 
                                        iconStyle='solid' 
                                        color={theme === 'dark' ? 'white' : 'black'}
                                    />

                                    <Text style={styles.specHeaderStyles} numberOfLines={1} >
                                        Price per Day
                                    </Text>

                                    <Text style={styles.specInfoStyles} numberOfLines={1} >
                                        ${car.pricePerDay} 
                                        <Text style={{
                                            fontWeight: 'regular', 
                                            fontSize: 14
                                            }} 
                                        >
                                            /day
                                        </Text>
                                    </Text>

                                </View>
                            </View>
                            <CustomButton 
                                title='Book Now' 
                                isLoading={false} 
                                handlePress={() => navigation.navigate("BookingForm")} 
                                containerStyles={{width: '90%', margin: 'auto', marginTop: 40, marginBottom: 40}}
                            />
                        </View>
                    </>
                }
            </ScrollView>
        </SafeAreaView>
    );
}

const getStyles = (theme: ColorSchemeName) => {
    const styleSheet = StyleSheet.create({
        safeAreaStyles: {
            minHeight: '100%',
            backgroundColor: theme === 'dark' ? '#1E1E1E' : 'white',
        },
        scrollStyles: {
            minHeight: '100%',
            width: '100%',
        },
        backViewStyles:{
            flexDirection: 'row',
            paddingHorizontal: 20,
            marginVertical: 30,
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        viewContainerStyles: {
            backgroundColor: theme === 'dark' ? 'rgba(143, 143, 143, 0.3)' : 'rgba(121, 121, 121, 0.4)',
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
        },
        headerContainerStyles: {
            width: '100%',
            flexDirection: 'row',
            paddingHorizontal: 40,
            marginVertical: 30,
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        textStyles:{
            color: theme === 'dark' ? 'white' : 'black',
        },
        specStylesContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            paddingHorizontal: 30,
            columnGap: 20,
        },
        specStyles: {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderRadius: 8,
            justifyContent:'space-around',
            marginTop: 20,
            flex: 1,
            height:120,
            paddingLeft:10,
            paddingRight: 5
        },
        specHeaderStyles: {
            fontWeight: 'semibold',
            fontSize: 14,
            color: theme === 'dark' ? 'white' : 'black'
        },
        specInfoStyles: {
            color: theme === 'dark' ? 'white' : 'black',
            fontSize: 18,
            fontWeight: '500'

        }
    });
    return styleSheet;
}

export default CarDetails;