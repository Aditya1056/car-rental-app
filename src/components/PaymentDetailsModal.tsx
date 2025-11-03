import React from "react";
import Modal from "react-native-modal";
import { Text, View, Image, useColorScheme, ColorSchemeName, StyleSheet } from "react-native";
import { FontAwesome6 } from "@react-native-vector-icons/fontawesome6";

type Props = {
    visible: boolean,
    card: string,
    cardholder: string,
    paid: number | string,
    signature: string,
    onCancel: () => void
}

const PaymentDetailsModal: React.FC<Props> = ({
    visible,
    card,
    cardholder,
    paid,
    signature,
    onCancel
}) => {

    const theme = useColorScheme();

    const styles = getStyles(theme);

    return (

        <Modal
            isVisible={visible} 
            onBackdropPress={onCancel} 
            onBackButtonPress={onCancel}
        >
            <View
                style={{
                    backgroundColor: 'rgba(45, 52, 84, 1)',
                    borderRadius:10,
                    overflow:'hidden' 
                }}
            >
                <View
                    style={{
                        justifyContent:'center',
                        alignItems:'center',
                        rowGap: 5,
                        paddingVertical: 10,
                    }}
                >
                    <View style={styles.infoStyles} >
                        <FontAwesome6 
                            name='credit-card' 
                            iconStyle='solid' 
                            size={18} 
                            color='rgba(223, 223, 223, 1)'
                        />
                        <Text style={styles.subtitleStyles} >
                            {card}
                        </Text>
                    </View>

                    <View style={styles.infoStyles} >
                        <FontAwesome6 
                            name='user-check' 
                            iconStyle='solid' 
                            size={18} 
                            color='rgba(223, 223, 223, 1)'
                        />
                        <Text style={styles.subtitleStyles} >
                            {cardholder}
                        </Text>
                    </View>


                    <View style={styles.infoStyles} >
                        <FontAwesome6 
                            name='money-check-dollar' 
                            iconStyle='solid' 
                            size={18} 
                            color='rgba(223, 223, 223, 1)'
                        />
                        <Text style={styles.subtitleStyles} >
                            {paid}
                        </Text>
                    </View>
                </View>
                <Image 
                    source={{uri: signature}}
                    style={{
                        width:'100%',
                        height:200,
                        backgroundColor:'white'
                    }}
                    resizeMode="contain"
                />
            </View>
        </Modal>

    );
}

const getStyles = (theme: ColorSchemeName) => {
    const styleSheet = StyleSheet.create({
        viewStyles:{
            width:'90%',
            margin:'auto',
            borderRadius: 10,
            backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0,0,0,0.08)',
            alignItems: 'center',
            justifyContent: 'center',
            rowGap: 15,
            paddingTop: 2,
            paddingBottom: 20
        },
        imageStyles: {
            width: 300,
            height: 120,
        },
        titleStyles: {
            color: theme === 'dark' ? 'white' : 'black',
            fontSize: 16,
            fontWeight: '500',
        },
        subtitleStyles:{
            color: theme === 'dark' ? 'rgba(203, 203, 203, 1)' : 'rgba(71, 71, 71, 1)',
            fontSize: 14,
            fontWeight: '500',
        },
        infoStyles: {
            width:'90%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            columnGap: 5,
        },
    });

    return styleSheet;
}

export default PaymentDetailsModal;