import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, TouchableOpacity } from 'react-native';

type Props = {
    title: string,
    handlePress?: () => void,
    containerStyles?: object,
    textStyles?: object,
    isLoading: boolean,
}

const CustomButton: React.FC<Props> = ({ 
    title, 
    handlePress, 
    containerStyles, 
    textStyles, 
    isLoading 
}) => {

    const styles = getStyles(isLoading);

    return (
    <TouchableOpacity 
        onPress={handlePress} 
        activeOpacity={0.7} 
        style={[styles.containerStyles, containerStyles]}
        disabled={isLoading} 
    >
        <Text
            style={[styles.textStyles, textStyles]}
        >
            {title} 
        </Text>
    </TouchableOpacity>
    );
}

const getStyles = (isLoading: boolean) => {

    const styleSheet = StyleSheet.create({
        containerStyles: {
            backgroundColor: '#DE483A',
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: isLoading ? 0.5 : 1,
            paddingVertical: 12
        },
        textStyles: {
            color: 'white',
            fontWeight: 'semibold',
            fontSize: 20,
        }
    });

    return styleSheet;
}


export default CustomButton;