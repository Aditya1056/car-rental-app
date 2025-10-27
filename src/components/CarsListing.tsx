import React from 'react';
import { Text, StyleSheet, useColorScheme, ColorSchemeName, Image, View } from 'react-native';
import { useAppSelector } from '../store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';

import CarCard from './CarCard';
import Empty from './Empty';
import Loader from './Loader';

const renderListHeaderComponent = (theme: ColorSchemeName) => {

    return (
        <View
            style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
                marginBottom: 10,
                columnGap: 15,
            }}
        >
            <Image
                source={require('../assets/destination.png')} 
                resizeMode='contain' 
                style={{
                    width: 35,
                    height: 35,
                }}
            />
            <Text
                style={{
                    fontSize: 20,
                    color: theme === 'dark' ?  '#f2f7feff' : 'black',
                    fontWeight: '500'
                }}
            >
                Choose Your Ride
            </Text>
        </View>
    );
}

const renderEmptyComponent = (message: string) => {
    return <Empty message={message} />
}

const CarsListing: React.FC = () => {

    const { loading, cars, error } = useAppSelector((state) => state.cars);

    const theme = useColorScheme();

    const styles = getStyles(theme);

  return (
    <SafeAreaView style={styles.safeAreaStyles} >
        {
            loading && <Loader />
        }
        {
            !loading && error && 
            <Text style={styles.errorStyles} >Error: {error}</Text>
        }
        {
            !loading && !error && 
            <FlatList 
                data={cars ?? []} 
                keyExtractor={(item) => item.id} 
                renderItem={({ item }) => (
                    <CarCard car={item} />
                )}
                ListHeaderComponent={() => renderListHeaderComponent(theme)}
                ListEmptyComponent={() => renderEmptyComponent('No Cars Found!')} 
                contentContainerStyle={{
                    rowGap: 20,
                    paddingVertical: 30
                }}
            />
        }
    </SafeAreaView>
  );
}

const getStyles = (theme: ColorSchemeName) => {
    const styleSheet = StyleSheet.create({
        safeAreaStyles: {
            minHeight: '100%',
            backgroundColor: theme === 'dark' ? '#1E1E1E' : 'white',
        },
        errorStyles: {
            width: '100%',
            paddingTop: 40,
            paddingHorizontal: 20,
            textAlign: 'center',
            color: 'rgba(162, 63, 63, 1)',
        }
    });

    return styleSheet;
}

export default CarsListing;