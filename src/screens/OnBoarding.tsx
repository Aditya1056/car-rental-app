import { ColorSchemeName, Image, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../store';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import CustomButton from '../components/CustomButton';

type Props = NativeStackScreenProps<any>;


const OnBoarding: React.FC<Props> = ({ navigation }) => {

    const { loading } = useAppSelector(state => state.auth);

    const theme =  useColorScheme();

    const styles = getStyles(theme);

    return (
        <SafeAreaView style={[styles.safeAreaStyles]} >
            <ScrollView contentContainerStyle={[styles.scrollViewStyles]} >
                <View style={[styles.outerViewStyles]} >

                    <Image 
                        source={require('../assets/car2.png')} 
                        resizeMode='cover' 
                        style={[styles.carImageStyles]} 
                    />

                    <View style={[styles.innerViewStyles]} >
                        <Image 
                            source={require('../assets/carRental.png')}  
                            style={[styles.logoStyles]}
                            resizeMode='contain' 
                        />
                        <Text style={[styles.headerTextStyles]} >
                            Avis
                        </Text>

                    </View>

                    <Text style={styles.subTextStyles} >
                        Avis India introduces a premium bespoke car rental 
                        service exclusively for Airport Transfers. 
                    </Text>

                    <CustomButton 
                        title="Explore Avis" 
                        containerStyles={{width: '90%', marginTop: 20}}
                        isLoading={loading} 
                        handlePress={() => navigation.navigate('Login')} 
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
  );
}

const getStyles = (theme: ColorSchemeName) => {
    const styleSheet = StyleSheet.create({
        safeAreaStyles: {
            height: '100%',
            backgroundColor: theme === 'dark' ? '#1E1E1E' : 'white',
        },
        scrollViewStyles: {
            height: '100%',
        },
        outerViewStyles: {
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100%',
            width: '100%',
            paddingHorizontal: 10,
            rowGap: 10,
        },
        carImageStyles: {
            width:450,
            height:300,
        },
        innerViewStyles: {
            width: '100%',
            flexDirection: 'row',
            justifyContent:'center',
            alignItems: 'center',
            columnGap: 20,
        },
        logoStyles: {
            width: 40,
            height: 40,
        },
        headerTextStyles: {
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#DE483A',
            fontSize: 30,
        },
        subTextStyles: {
            fontSize: 15,
            fontWeight: 'semibold',
            textAlign: 'center',
            marginVertical: 4,
            color: theme === 'dark' ? 'white' : 'black',
        }
    });

    return styleSheet;
}

export default OnBoarding;