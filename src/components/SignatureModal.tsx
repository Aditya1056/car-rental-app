import React, {useState, useRef} from "react";
import Modal from 'react-native-modal';
import SignatureView from "react-native-signature-canvas";
import { Text, View, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomButton from "./CustomButton";

type Props = {
    visible: boolean,
    onConfirm: (signature: string) => void,
    onCancel: () => void,
};

const SignatureModal: React.FC<Props> = ({ visible, onConfirm, onCancel }) => {

    const signRef = useRef<any>(null);

    const [signed, setSigned] = useState<boolean>(false);
    const [signature, setSignature] = useState<string>('');

    const { height, width } = useWindowDimensions();

    const onOkHandler = (sign: string) => {
        setSignature(sign);
    }

    const onClearHandler = () => {
        signRef.current?.clearSignature();
        setSignature('');
        setSigned(false);
    }

    const onEndHandler = () => {
        signRef.current?.readSignature();
        setSigned(true);
    };

    const onConfirmHandler = () => {
        if(signature){
            onConfirm(signature);
            onClearHandler();
        }
    }

    const onCancelHandler = () => {
        onClearHandler();
        onCancel();
    }

    return (
        <Modal
            key="signature-modal"
            isVisible={visible} 
            onBackdropPress={onCancelHandler} 
            style={{ margin: 0, justifyContent: "center", alignItems: "center" }}
            supportedOrientations={["portrait", "landscape"]}
            useNativeDriver 
            propagateSwipe
        >
            <SafeAreaView
                style={{
                    backgroundColor: "white",
                    borderRadius: 16,
                    padding: 16,
                    width: width * 0.95,
                    height: height * 0.8,
                    justifyContent: "space-between",
                }}
            >

                <Text 
                    style={{ 
                        fontSize: 18, 
                        fontWeight:'600',
                        textAlign: "center", 
                        marginBottom: 20,
                        color:'rgba(41, 45, 71, 1)',
                    }}
                >
                    Sign below to confirm booking
                </Text>

                <View
                    style={{ 
                        boxShadow: '0 0 2px rgba(62, 67, 110, 1)',
                        borderWidth: 1,
                        borderColor: "#ccc",
                        borderRadius: 12,
                        overflow: "hidden",
                        flex: 1,
                        minHeight: 300,
                        
                    }}
                >
                    <SignatureView
                        ref={signRef} 
                        onOK={onOkHandler} 
                        onEnd={onEndHandler} 
                        descriptionText="Please sign below" 
                        webStyle={`
                            .m-signature-pad--footer { display: none; }
                            body,html { margin: 0; height: 100%; }
                            canvas {
                                width: 100% !important;
                                height: 100% !important;
                                border-radius: 12px;
                                background-image: linear-gradient(to bottom, #f9f9f9 1px, transparent 1px); 
                                background-size: 100% 24px;
                            }
                        `}
                        minWidth={1.5} 
                        maxWidth={3} 
                    />
                </View>


                <View 
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        columnGap: '8',
                        marginTop:40,
                    }}
                >
                    <CustomButton 
                        title="Cancel" 
                        handlePress={onCancelHandler} 
                        containerStyles={{
                            flex: 1,
                            backgroundColor: 'rgba(126, 126, 126, 1)'
                        }}
                        isLoading={false}  
                    />
                    <CustomButton 
                        title="Clear" 
                        handlePress={onClearHandler}  
                        containerStyles={{
                            flex: 1,
                            backgroundColor: 'rgba(110, 110, 110, 1)'
                        }}
                        isLoading={false} 
                        
                    />
                    <CustomButton 
                        title="Proceed" 
                        handlePress={onConfirmHandler} 
                        containerStyles={{
                            flex: 1,
                            backgroundColor: 'rgba(55, 65, 111, 1)'
                        }}
                        isLoading={!signed} 
                    />
                </View>
            </SafeAreaView>
        </Modal>
    );
}

export default SignatureModal;