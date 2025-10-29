import { View, Text } from 'react-native';
import React, { PropsWithChildren, useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../store';
import { getAllCars } from '../store/thunks/carThunks';

const Home: React.FC<PropsWithChildren> = () => {

    const dispatch = useAppDispatch();

    const { cars } = useAppSelector((state) => state.cars);

    console.log(cars);

    useEffect(() => {
        dispatch(getAllCars());
    }, [dispatch]);

  return (
    <View>
      <Text>This a Car rental app</Text>
    </View>
  );
}

export default Home;