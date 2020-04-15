import React, {useState, useEffect} from 'react';
import {Container} from './styles';

import background from '../../assets/background-night.png';
import bird from '../../assets/redbird-downflap.png';
import {Animated, Dimensions, Easing, View} from 'react-native';

const {width, height} = Dimensions.get('screen');

const World = () => {
  const [position, setPosition] = useState(new Animated.Value(0));
  const [top, setTop] = useState(new Animated.Value(height - 50));
  const [canJump, setCanJump] = useState(true);

  useEffect(() => {
    Animated.loop(
      Animated.timing(position, {
        toValue: -550,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const handleJump = () => {
    setCanJump(false);
    canJump &&
      Animated.sequence([
        Animated.timing(top, {
          toValue: 500,
          duration: 300,
          easing: Easing.bezier(0.2, 1.1, 0.57, 0.8),
          useNativeDriver: true,
        }),
        Animated.timing(top, {
          toValue: height - 50,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setCanJump(true);
      });
  };

  return (
    <Container onPress={() => handleJump()}>
      <Animated.Image
        source={background}
        style={{
          transform: [{translateX: position}],
          width: 1100,
          height: '100%',
        }}
      />
      <Animated.Image
        source={bird}
        style={{
          position: 'absolute',
          left: width / 2 - 100,
          transform: [{translateY: top}],
        }}
      />
    </Container>
  );
};

export default World;
