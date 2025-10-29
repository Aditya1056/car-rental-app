import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, useColorScheme, View, StyleSheet, ColorSchemeName } from 'react-native';
import { useField } from 'formik';
import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6';

type Props = {
    name: string,
    title: string,
    placeholder: string,
    otherStyles: object
}

const FormField : React.FC<Props> = ({
    name,
    title, 
    placeholder, 
    otherStyles 
}) => {

    const [field, meta, helpers] = useField(name);

    const [showToken, setShowToken] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const theme = useColorScheme();

    const styles = getStyles(theme, isFocused);

    const toggleShowPassword = () => {
        setShowToken((prev) => !prev);
    }

  return (
    <View 
        style={[styles.viewStyles, otherStyles]}
    >
        <Text
            style={[styles.textStyles]}
        >
            {title} 
        </Text>

        <View
            style={[styles.innerViewStyles]} 
            onFocus={() => setIsFocused(false)} 
            onBlur={() => setIsFocused(false)} 
        >
            <TextInput 
                style={[styles.innerViewStyles]} 
                value={field.value} 
                placeholder={placeholder} 
                placeholderTextColor='#7b7b8b' 
                onChangeText={helpers.setValue} 
                onBlur={() => helpers.setTouched(true)} 
                secureTextEntry={title === 'Token' && !showToken} 
            />
            {
                title === 'Token' && 
                <TouchableOpacity onPress={toggleShowPassword} >
                    {
                        !showToken && 
                        <FontAwesome6 name='eye' size={24} color={theme === 'dark' ? 'white' : 'black'} />
                    }
                    {
                        showToken && 
                        <FontAwesome6 name='eye-slash' size={24} color={theme === 'dark' ? 'white' : 'black'} />
                    }
                </TouchableOpacity>
            }
        </View>
        {
            meta.touched && meta.error && 
            <Text style={[styles.errorStyles]}>{meta.error}</Text>
        }
    </View>
  );
}

const getStyles = (theme: ColorSchemeName, isFocused: boolean) => {

    const styleSheet = StyleSheet.create({
        viewStyles: {
            rowGap: 2,
        },
        textStyles: {
            fontWeight: 'medium',
            color: theme === 'dark' ? 'white' : 'black',
        },
        innerViewStyles: {
            width: '100%',
            flexDirection: 'row',
            height: 16,
            paddingHorizontal: 4,
            borderWidth: 2,
            borderRadius: 10,
            alignItems: 'center',
            backgroundColor: theme === 'dark' ? '#374151' : '#D1D5DB',
            borderColor: isFocused ? '#f87171' : theme === 'dark' ? '#1f2937' : '#cbd5e0',
        },
        textInputStyles: {
            flex: 1,
            fontWeight: 'semibold',
            color: theme === 'dark' ? 'white ' : 'black',
        },
        errorStyles: {
            width:'90%',
            margin: 'auto',
            textAlign:'center',
            color: 'red'
        }
    });

    return styleSheet;
}

export default FormField;