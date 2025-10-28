import React, { useRef, useState } from 'react';
import { View, FlatList, Dimensions, StyleSheet } from 'react-native';
import { Dispatch, SetStateAction } from 'react';
import FastImage from 'react-native-fast-image';

import Loader from './Loader';

const { width: screenWidth } = Dimensions.get('window');

type Props = {
  images: string[];
}

type carouselItemType = {
    index: number,
    loadingIndex: number | null,
    image: string,
    styles: any,
    setLoadingIndex: Dispatch<SetStateAction<number | null>>,
}

const renderCarouselItem = ({ index, loadingIndex, styles, image, setLoadingIndex }: carouselItemType) => {

    return (
          <View style={styles.imageContainerStyles}>
            {
                loadingIndex === index && 
                <View style={styles.loaderContainerStyles}>
                    <Loader />
                </View>
            }
            <FastImage
                source={{ uri: image }}
                style={styles.imageStyles}
                resizeMode={FastImage.resizeMode.cover}
                onLoadStart={() => setLoadingIndex(index)}
                onLoadEnd={() => setLoadingIndex(null)}
            />
          </View>
    );
}

const CarImageCarousel: React.FC<Props> = ({ images }) => {

    const [activeIndex, setActiveIndex] = useState(0);

    const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

    const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setActiveIndex(viewableItems[0].index);
        }
    });

    const styles = getStyles();

    return (
        <View>
            <FlatList
                data={images}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item, index }) => renderCarouselItem({
                    index,
                    loadingIndex,
                    styles,
                    image: item,
                    setLoadingIndex
                })}
                onViewableItemsChanged={onViewableItemsChanged.current}
                viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
                initialNumToRender={1}
                maxToRenderPerBatch={2}
                windowSize={3}
            />

            <View style={styles.dotsContainerStyles}>
            {
                images.map((_, i) => (
                    <View
                        key={i}
                        style={[
                            styles.dotStyles,
                            {   
                                width: i === activeIndex ? 20 : 8,
                                backgroundColor: i === activeIndex ? 
                                '#ac2424ff' : '#a8a8a8ff' 
                            },
                        ]}
                    />
                ))
            }
        </View>
        </View>
    );
};

const getStyles = () => {
    const styles = StyleSheet.create({
        imageContainerStyles: {
            width: screenWidth,
            height: 220,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
        },
        imageStyles: {
            width: '100%',
            height: '100%',
            borderRadius: 8,
        },
        loaderContainerStyles: {
            position: 'absolute',
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
        },
        dotsContainerStyles: {
            flexDirection: 'row',
            justifyContent: 'center',
            paddingTop:3,
            paddingBottom:20,
        },
        dotStyles: {
            height: 8,
            borderRadius: 4,
            marginHorizontal: 4,
        },
    });

return styles;
}


export default CarImageCarousel;