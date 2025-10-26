import { View, Text, TouchableOpacity } from 'react-native';
import React, { PropsWithChildren } from 'react';

import { useAppDispatch } from '../store';

import { logout } from '../store/thunks/authThunks';

import Toast from 'react-native-toast-message';

const Profile: React.FC<PropsWithChildren> = () => {

  const dispatch = useAppDispatch();

  const logoutHandler = async () => {
    try{
      await dispatch(logout());
    }
    catch(err: any){
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: err.message || "Something went wrong",
      });
    }
  }

  return (
    <View>
      <Text>Profile</Text>
      <TouchableOpacity onPress={logoutHandler} >
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Profile;