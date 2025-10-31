import React from 'react';
import { View, Text, useColorScheme, ColorSchemeName, StyleSheet } from 'react-native';

type Props = {
    message: string
}

const Empty: React.FC<Props> = ({ message}) => {

    const theme = useColorScheme();

    const styles = getStyles(theme);

    return (
        <View style={styles.viewStyles} >
            <Text style={styles.textStyles} >
                {message}
            </Text>
        </View>
    );
}

const getStyles = (theme: ColorSchemeName) => {
    const styleSheet = StyleSheet.create({
        viewStyles: {
            width: '100%',
            marginTop: 30,
            justifyContent: 'center',
            alignItems: 'center'
        },
        textStyles: {
            fontSize: 20,
            textAlign: 'center',
            color: theme === 'dark' ? 'white' : 'black',
        }
    });
    return styleSheet;
}

export default Empty;