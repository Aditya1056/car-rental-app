import React, { useEffect } from 'react';
import { Text, StyleSheet, useColorScheme, ColorSchemeName, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import Empty from '../components/Empty';
import BookingCard from '../components/BookingCard';
import Loader from '../components/Loader';

import { useAppSelector, useAppDispatch } from '../store';

import { getAllBookings } from '../store/thunks/bookingThunks';

function parseDate(str: any) {

  const clean = str.replace(",", "").trim();
  const parts = clean.split(" ");

  let day, monthName, year;

  if (isNaN(parts[0])) {
    [monthName, day, year] = parts;
  } else {
    [day, monthName, year] = parts;
  }

  const months: any = {
    january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
    july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
  };

  const monthIndex = months[monthName.toLowerCase()];

  const date = new Date(Number(year), monthIndex, Number(day));

  return date;
}

const renderEmptyComponent = (message: string) => {
  return (
    <Empty message={message} /> 
  );
}

const renderHeaderComponent = (theme: ColorSchemeName) => {
  return (
    <Text
      style={{
        textAlign: 'center',
        marginTop:50,
        color: theme === 'dark' ? 'white' : 'black',
        fontSize:26,
      }}
    >
      Your Bookings
    </Text>
  );
}

const Bookings: React.FC = () => {

  const { bookings, loading } = useAppSelector((state) => state.bookings);
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const today = new Date();

  const upcomingBookings = bookings.filter((booking: any) => {
    return parseDate(booking.startDate) >= today;
  });

  const pastBookings = bookings.filter((booking: any) => {
    return parseDate(booking.startDate) < today;
  });

  upcomingBookings.sort((a: any, b: any) => {
    return parseDate(a.startDate).getTime() - parseDate(b.startDate).getTime();

  });

  pastBookings.sort((a: any, b: any) => {
    return parseDate(a.startDate).getTime() - parseDate(b.startDate).getTime();

  });

  const updatedBookings = [
    ...upcomingBookings,
    ...pastBookings,
  ]

  const theme = useColorScheme();

  const styles = getStyles(theme);

  useEffect(() => {

    const fetchBookings = async () => {
      try{
        await dispatch(getAllBookings({
          email: user?.email,
        })).unwrap();
      }
      catch(err: any){
        Toast.show({
          type:'error',
          text1: 'Error',
          text2: err,
        });
      }
    }

    fetchBookings();

  }, [dispatch, user]);

  return (
    <SafeAreaView style={styles.safeAreaStyles} >
      {
        loading && <Loader />
      }
      {
        !loading && 
        <FlatList 
          data={updatedBookings ?? []} 
          keyExtractor={(item) => item._id} 
          renderItem={({ item, index }) => (
            <BookingCard 
              booking={item} 
              index={index} 
              upComingLast={upcomingBookings.length - 1} 
              divider={pastBookings.length > 0 ? true : false} 
            />
          )}
          ListEmptyComponent={() => renderEmptyComponent('No Bookings Yet!')}
          ListHeaderComponent={() => renderHeaderComponent(theme)} 
          contentContainerStyle={{
            rowGap: 30,
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
  });

  return styleSheet;
}

export default Bookings;