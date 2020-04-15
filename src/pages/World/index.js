import React, {useState, useEffect} from 'react';
import {Container, Background, Bird} from './styles';

import background from '../../assets/background-night.png';
import bird from '../../assets/redbird-downflap.png';
import {Animated, Dimensions, Easing} from 'react-native';

const {width} = Dimensions.get('screen');

const World = () => {
  const [position, setPosition] = useState(new Animated.Value(0));
  const [top, setTop] = useState(new Animated.Value(300));

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
    Animated.timing(top, {
      toValue: 600,
      duration: 2000,
      easing: Easing.back(3),
      useNativeDriver: true,
    }).start();
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
