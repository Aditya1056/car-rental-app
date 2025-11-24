import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Modal from 'react-native-modal';
import locations from '../mocks/locations.json';
import CustomButton from './CustomButton';

type Props = {
    visible: boolean;
    onClose: () => void;
    onSelectLocation: (location: any) => void;
    selectedLocation: any;
};

const MapModal: React.FC<Props> = ({ visible, onClose, onSelectLocation, selectedLocation }) => {
    
    const [selected, setSelected] = useState(selectedLocation);
    const mapRef = useRef<MapView | null>(null);

    const handleSelect = (loc: any) => setSelected(loc);

    const handleConfirm = () => {
        if (selected) onSelectLocation(selected);
        closeHandler();
    };

    const closeHandler = () => {
        setSelected(null);
        onClose();
    };

    useEffect(() => {
        if (selectedLocation) setSelected(selectedLocation);
    }, [selectedLocation]);

    // 🗺️ Auto adjust map region when modal opens or selection changes
    useEffect(() => {
        if (!mapRef.current) return;

        if (selected) {
            // Zoom in around the selected marker
            mapRef.current.animateToRegion(
                {
                    latitude: Number(selected.lat),
                    longitude: Number(selected.lng),
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                },
                1000
            );
        } else {
            // Fit all locations into view
            const coords = locations.map((loc) => ({
                latitude: Number(loc.lat),
                longitude: Number(loc.lng),
            }));
            setTimeout(() => {
                mapRef.current?.fitToCoordinates(coords, {
                    edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
                    animated: true,
                });
            }, 300);
        }
    }, [visible, selected]);

    return (
        <Modal
            isVisible={visible}
            onBackdropPress={closeHandler}
            style={{ margin: 0, justifyContent: 'flex-end' }}
        >
            <View
                style={{
                    backgroundColor: 'rgba(42, 42, 42, 1)',
                    height: '70%',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    overflow: 'hidden',
                }}
            >
                <MapView
                    ref={mapRef}
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: Number(locations[0].lat),
                        longitude: Number(locations[0].lng),
                        latitudeDelta: 10,
                        longitudeDelta: 10,
                    }}
                    onPress={(event) => {
                        const { latitude, longitude } = event.nativeEvent.coordinate;

                        let selectedLoc = locations.find(
                            (loc) =>
                                loc.lat.toString() === latitude.toString() &&
                                loc.lng.toString() === longitude.toString()
                        );

                        if (!selectedLoc) {
                            selectedLoc = {
                                id: Date.now(),
                                name: 'Custom Location',
                                lat: latitude,
                                lng: longitude,
                            };
                        }

                        handleSelect(selectedLoc);
                    }}
                >
                    {locations.map((loc) => (
                        <Marker
                            key={loc.id}
                            coordinate={{
                                latitude: Number(loc.lat),
                                longitude: Number(loc.lng),
                            }}
                            pinColor={selected?.id === loc.id ? 'blue' : 'red'}
                            title={loc.name}
                        />
                    ))}
                    {selected && !locations.find((l) => l.id === selected.id) && (
                        <Marker
                            coordinate={{
                                latitude: Number(selected.lat),
                                longitude: Number(selected.lng),
                            }}
                            pinColor="blue"
                            title={selected.name}
                        />
                    )}
                </MapView>

                <View style={styles.bottomBar}>
                    <Text style={styles.selectedText}>
                        {selected ? selected.name : 'Select from given locations'}
                    </Text>

                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <TouchableOpacity
                            onPress={closeHandler}
                            style={[styles.btn, { backgroundColor: '#ccc' }]}
                        >
                            <Text>Cancel</Text>
                        </TouchableOpacity>

                        <CustomButton
                            title="Confirm"
                            handlePress={handleConfirm}
                            isLoading={!selected}
                            containerStyles={{
                                width: 100,
                                height: 45,
                            }}
                            textStyles={{
                                fontSize: 16,
                            }}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default MapModal;

const styles = StyleSheet.create({
    bottomBar: {
        backgroundColor: 'rgba(42, 42, 42, 1)',
        padding: 15,
        borderTopWidth: 1,
        borderColor: '#5f5f5fff',
        alignItems: 'center',
    },
    selectedText: {
        marginBottom: 10,
        fontSize: 16,
        color: '#cbcbcbff',
    },
    btn: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        fontSize: 16,
    },
});
