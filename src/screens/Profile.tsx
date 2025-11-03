import { View, Text, StyleSheet, useColorScheme, ColorSchemeName, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Toast from 'react-native-toast-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import CustomButton from '../components/CustomButton';

import { useAppDispatch, useAppSelector } from '../store';

import { logout } from '../store/thunks/authThunks';

type Props = NativeStackScreenProps<any>;

const Profile: React.FC<Props> = ({ navigation }) => {

  const { loading, user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const theme = useColorScheme();

  const styles = getStyles(theme);

  const logoutHandler = async () => {
    try{
      await dispatch(logout());
      Toast.show({
        type: 'info',
        text1: 'Logged Out!',
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
    <SafeAreaView style={styles.safeAreaStyles} >
      <View style={styles.viewStyles} >
        <FontAwesome6 name='circle-user' size={85} color='#a2a2a2ff' />
        <Text style={styles.usernameStyles} >
          {user.name}
        </Text>
        <Text style={styles.emailStyles} >
          {user.email}
        </Text>
        <View style={styles.containerStyles} >

          <View style={styles.ridesViewStyles} >

            <Image 
              source={require('../assets/ride.png')} 
              style={styles.rideImageStyles} 
              resizeMode='contain' 
            />

            <Text style={styles.ridesHeaderStyles} >
              Rides
            </Text>

            <Text style={styles.ridesCountStyles} >
              0
            </Text>

          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Bookings')} >
            <View style={styles.ridesViewStyles} >

              <FontAwesome6 
                name='table-list' 
                size={24} 
                color='rgba(215, 76, 76, 1)' 
                iconStyle='solid'
                style={{marginTop: 5}}
              />

              <Text style={[styles.ridesHeaderStyles]} >
                Go to Bookings
              </Text>

            </View>
          </TouchableOpacity>
        </View>
        <CustomButton 
          title='Logout' 
          containerStyles={{width: '60%', marginTop: 30}} 
          isLoading={loading} 
          handlePress={logoutHandler} 
        />
      </View>
    </SafeAreaView>
  );
}

const getStyles = (theme: ColorSchemeName) => {
  const styleSheet = StyleSheet.create({
    safeAreaStyles: {
        minHeight: '100%',
        backgroundColor: theme === 'dark' ? '#1E1E1E' : 'white',
    },
    viewStyles: {
      width: '100%',
      justifyContent:'center',
      alignItems: 'center',
      paddingTop: 100
    },
    usernameStyles: {
      color: theme === 'dark' ? 'white' : 'black',
      fontSize: 24,
      marginTop:8,
    },
    emailStyles: {
      color:'#b3b3b3',
      fontSize: 15,
      marginTop:3,
    },
    containerStyles: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      columnGap: 40
    },
    ridesViewStyles: {
      backgroundColor: 'rgba(224, 135, 135, 0.1)',
      borderRadius: 8,
      rowGap: 5,
      marginTop: 20,
      width:120,
      height:120,
      paddingHorizontal: 10,
    },
    rideImageStyles: {
      width: 35,
      height: 35,

    },
    ridesHeaderStyles: {
      fontWeight: 'semibold',
      fontSize: 18,
      color: theme === 'dark' ? 'white' : 'black'
    },
    ridesCountStyles: {
      color: theme === 'dark' ? 'white' : 'black',
      fontSize: 32
    }
  });

  return styleSheet;
}

export default Profile;