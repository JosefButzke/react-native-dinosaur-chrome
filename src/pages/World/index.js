import React, {useState, useEffect} from 'react';
import {Container} from './styles';

import background from '../../assets/background-night.png';
import vinha from '../../assets/vinha.png';
import moto from '../../assets/moto.png';
import {Animated, Dimensions, Easing} from 'react-native';

const {width, height} = Dimensions.get('screen');

const World = () => {
  const [position, setPosition] = useState(new Animated.Value(0));
  const [top, setTop] = useState(new Animated.Value(height - 105));
  const [locationBox, setLocationBox] = useState(
    new Animated.Value(width + 30),
  );

  const [jumping, setJumping] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    Animated.loop(
      Animated.timing(position, {
        toValue: -550,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    Animated.loop(
      Animated.timing(locationBox, {
        toValue: -30,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  useEffect(() => {
    locationBox.removeAllListeners();
    locationBox.addListener(({value}) => {
      if (value < 110 && value > 50 && !jumping) {
        callGameOver();
      }
    });
  }, [jumping]);

  const callGameOver = () => {
    locationBox.removeListener();
    setGameOver(true);
    position.stopAnimation();
    top.stopAnimation();
    locationBox.stopAnimation();
  };

  const handleJump = () => {
    setJumping(true);

    setTimeout(() => {
      setJumping(false);
    }, 700);

    !gameOver &&
      Animated.sequence([
        Animated.timing(top, {
          toValue: height - 200,
          duration: 300,
          easing: Easing.bezier(0.2, 1.1, 0.57, 0.8),
          useNativeDriver: true,
        }),
        Animated.timing(top, {
          toValue: height - 105,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]).start();
  };

  return (
    <Container
      onPress={() => {
        !jumping && handleJump();
      }}>
      <Animated.Image
        source={vinha}
        style={{
          position: 'absolute',
          width: 20,
          height: 40,
          zIndex: 100,
          bottom: 0,
          transform: [{translateX: locationBox}],
        }}
      />
      <Animated.Image
        source={background}
        style={{
          transform: [{translateX: position}],
          width: 1100,
          height: '100%',
        }}
      />
      <Animated.Image
        source={moto}
        style={{
          position: 'absolute',
          width: 80,
          height: 80,
          left: 30,
          transform: [{translateY: top}],
        }}
      />
    </Container>
  );
};

export default World;
