import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform, PermissionsAndroid } from 'react-native';
import AudioRecord from 'react-native-audio-record';
import Toast from 'react-native-toast-message';
import Modal from 'react-native-modal';
import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6';
import CustomButton from './CustomButton';
import Loader from './Loader';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import locations from '../mocks/locations.json';

import { useAppSelector } from '../store';

import { httpExternalRequest } from '../services/externalService';

type Props = {
    visible: boolean,
    onCancel: () => void,
}

const SpeechModal: React.FC<Props> = ({ visible, onCancel }) => {

    const navigation = useNavigation<any>();
    
    const [isRecording, setIsRecording] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [filePath, setFilePath] = useState<string | null>(null);
    const [recognizedText, setRecognizedText] = useState('');
    const [recognizedStartDate, setRecognizedStartDate] = useState(null);
    const [recognizedEndDate, setRecognizedEndDate] = useState(null);
    const [isConverting, setIsConverting] = useState(false);

    const { user } = useAppSelector((state) => state.auth);

    const requestAudioPermission = async () => {

        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                {
                    title: 'Audio Permission',
                    message: 'App needs access to your microphone',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true;
    };


    const initAudioRecord = () => {
        const options = {
            sampleRate: 16000,
            channels: 1,
            bitsPerSample: 16,
            wavFile: 'speech_record.wav',
        };
        AudioRecord.init(options);
    };

    const onStartRecord = async () => {

        const hasPermission = await requestAudioPermission();
        if(!hasPermission) {
            Toast.show({
                type: 'error',
                text1: 'Permission denied',
                text2: 'Cannot record without microphone access',
            });
            return;
        }

        setIsLoading(true);
        try{
            initAudioRecord();
            await AudioRecord.start();
            setIsRecording(true);
        } 
        catch(error: any){
            Toast.show({
                type:'error',
                text1: 'Error',
                text2: error.message || error
            });
        } 
        finally{
            setIsLoading(false);
        }
    };

    const onStopRecord = async () => {
        setIsLoading(true);
        try {
            const audioFile = await AudioRecord.stop(); // Returns file path

            setFilePath(audioFile);
            setIsRecording(false);

            setIsConverting(true);

            const formData = new FormData();

            formData.append('audio', {
                uri: Platform.OS === 'android' ? 'file://' + audioFile : audioFile,
                name: 'speech_record.wav',
                type: 'audio/wav',
            });

            const data = await httpExternalRequest({
                url: '/convert-speech-to-text',
                method: 'POST',
                data: formData,
                headers: {
                    'Authorization': `Bearer ${user?.email}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if(data && data.transcript && data.startDate && data.endDate){
                setRecognizedText(data.transcript);
                setRecognizedStartDate(data.startDate);
                setRecognizedEndDate(data.endDate);
            }
            else{
                Toast.show({
                    type:'error',
                    text1: 'Error',
                    text2: 'Booking details missing in the given voice'
                });
            }
            
            setIsLoading(false);
            setIsConverting(false);
        }
        catch(error: any){
            Toast.show({
                type:'error',
                text1: 'Error',
                text2: error.message || 'Failed to stop recording'
            });
        } 
        finally{
            setIsLoading(false);
            setIsConverting(false);
        }
    };

    const closeHandler = async () => {
        if(isRecording){
            await AudioRecord.stop();
        }
        setIsRecording(false);
        setIsLoading(false);
        setIsConverting(false);
        setFilePath(null);
        setRecognizedText('');
        setRecognizedStartDate(null);
        setRecognizedEndDate(null);
        onCancel();
    }

    const confirmHandler = () => {
        navigation.navigate('BookingForm', {
            transcript: recognizedText,
            startDate: recognizedStartDate,
            endDate: recognizedEndDate,
            pickupLocation: locations[0],
            dropOffLocation: locations[1],
        });
        setFilePath(null);
        setRecognizedText('');
        setRecognizedStartDate(null);
        setRecognizedEndDate(null);
        onCancel();
    }

    return (
        <Modal 
            isVisible={visible} 
            onBackdropPress={closeHandler} 
        >
            <View
                style={{
                    backgroundColor:'white',
                    justifyContent: 'center',
                    alignItems:'center',
                    paddingVertical: 20,
                    paddingHorizontal: 30,
                    borderRadius: 10,
                    rowGap: 25,
                }}
            >
                <View   
                    style={{
                        width:80,
                        height:80,
                        backgroundColor: isRecording ? 'rgba(17, 201, 14, 0.2)' : 'transparent',
                        borderRadius:50,
                        overflow:'hidden',
                        justifyContent:'center',
                        alignItems:'center',
                    }} 
                >
                    <TouchableOpacity   
                        style={{
                            backgroundColor: isRecording ? 'rgba(17, 201, 14, 0.1)' : 'rgba(0,0,0,0.1)',
                            borderRadius:50,
                            width:60,
                            height:60,
                            justifyContent:'center',
                            alignItems:'center',
                        }} 
                        onPress={isRecording ? onStopRecord : onStartRecord} 
                        disabled={isLoading || isConverting}  
                    >
                        <FontAwesome6 
                            name='microphone' 
                            size={30} 
                            iconStyle='solid' 
                            color={isRecording ? 'rgba(50, 143, 24, 1)' : 'rgba(161, 161, 161, 1)'}
                        />
                    </TouchableOpacity>
                </View>

                <Text
                    style={{
                        fontWeight:500,
                        fontSize: 16,
                    }}
                >
                    {!isRecording ? 'Tap to speak' : 'Tap to stop'} 
                </Text>

                { isRecording && 
                    <FastImage 
                        source={require('../assets/listen.gif')} 
                        style={{ width:100, height:50 }}
                        resizeMode='cover' 
                    />
                }
                
                {
                    !isRecording && isConverting && <Loader />
                }

                {
                    !isRecording && !isConverting && recognizedText && 
                    <Text
                        style={{
                            fontSize:14,
                            fontWeight:500,
                            textAlign: 'center',
                            backgroundColor:'rgba(0,0,0,0.1)',
                            paddingVertical: 10,
                            paddingHorizontal: 10,
                            borderRadius: 5,
                        }}
                    >
                        {recognizedText}
                    </Text>
                }

                <CustomButton 
                    title={'Confirm Booking \u2192'} 
                    isLoading={isLoading || isRecording || !filePath || isConverting || !recognizedText || !recognizedStartDate || !recognizedEndDate} 
                    containerStyles={{
                        width:'100%',
                        backgroundColor:'rgba(50, 55, 81, 1)',
                    }} 
                    textStyles={{
                        fontSize:18
                    }}
                    handlePress={confirmHandler} 
                />
            </View>
            <Toast />
        </Modal>
    );
};

export default SpeechModal;
