import React from 'react';
import { View, Text, Image, StyleSheet, ColorSchemeName, useColorScheme, TouchableOpacity } from 'react-native';
import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6';

type Props = {
    car: {
        id: number,
        make: string,
        model: string,
        images: string[],
        year: number,
        pricePerDay: number,
        seats: number,
        transmission: string,
    },
}

const CarCard: React.FC<Props> = ({ car } ) => {

    const theme = useColorScheme();

    const styles = getStyles(theme);

  return (
    <TouchableOpacity>
        <View style={styles.viewStyles} >
            <Image 
                source={{uri: car.images[0]}} 
                resizeMode='cover' 
                style={styles.imageStyles}
            />
            <Text style={styles.titleStyles} >
                {car.model} - {car.make}
            </Text>
            <View style={styles.infoStyles} >
                <View style={styles.specStyles} >
                    <FontAwesome6 
                        name='user-group' 
                        size={14} 
                        color={theme === 'dark' ? 'white' : 'black'} 
                        iconStyle='solid'
                        style={{opacity: 0.7}}
                    />
                    <Text style={styles.specTextStyles} >
                        {car.seats} seats
                    </Text>
                </View>
                <View style={styles.specStyles} >
                    <FontAwesome6 
                        name='gears' 
                        size={16} 
                        color={theme === 'dark' ? 'white' : 'black'} 
                        iconStyle='solid'
                        style={{opacity: 0.7}}
                    />
                    <Text style={styles.specTextStyles} >
                        {car.transmission}
                    </Text>
                </View>
                <View style={styles.specStyles} >
                    <FontAwesome6 
                        name='circle-dollar-to-slot' 
                        size={16} 
                        color={theme === 'dark' ? 'white' : 'black'} 
                        iconStyle='solid'
                        style={{opacity: 0.7}}
                    />
                    <Text style={styles.specTextStyles} >
                        {car.pricePerDay} per day
                    </Text>
                </View>
            </View>
        </View>
    </TouchableOpacity>
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
            width: 360,
            height: 140,
        },
        titleStyles: {
            color: theme === 'dark' ? 'white' : 'black',
            fontSize: 16,
            fontWeight: '500',
        },
        infoStyles: {
            width:'100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
        },
        specStyles: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.7)',
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 5,
            columnGap: 10,
        },
        specTextStyles:{
            color: theme === 'dark' ? 'white' : 'black',
            opacity: 0.7
        }
    });

    return styleSheet;
}

export default CarCard;