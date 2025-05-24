import React, { useRef } from 'react'
import { Animated, Easing, Image, ImageSourcePropType, Text, TouchableOpacity, View } from 'react-native'
import { interventionFilter } from '../../constant/data'
import { Filter } from '../../constant/images'
import { globalStyles } from '../../constant/styles'

const DROPDOWN_MAX_HEIGHT = 200;

const Heading = () => {
  const [open, setOpen] = React.useState(false)
  const animation = useRef(new Animated.Value(0)).current;

  const maxHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, DROPDOWN_MAX_HEIGHT],
  });

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const toggleDropdown = () => {
    if (open) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start(() => setOpen(false));
    } else {
      // Open dropdown
      setOpen(true);
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();
    }
  }

  return (
    <View style={[globalStyles.flex, {
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20
    }]}>
      <Text></Text>
      <Text style={[globalStyles.inputLabel, { fontWeight: 700, fontSize: 20, marginBottom: 10 }]}>Intervention</Text>
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={toggleDropdown}
        >
          <Image
            source={Filter as ImageSourcePropType}
            style={{ width: 25, height: 25 }}
          />
        </TouchableOpacity>
        {open && (
          <Animated.View style={{
            shadowColor: "#0e1e25",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 10,
            backgroundColor: "white",
            padding: 10,
            position: "absolute",
            width: 200,
            top: 40,
            right: 0,
            borderRadius: 5,
            maxHeight,
            opacity,
            overflow: 'hidden',
            // remove flex, gap and use padding/margin for spacing if needed
          }}>
            {interventionFilter.map((item) => (
              <Text key={item.value} style={{ marginBottom: 10 }}>
                {item.label}
              </Text>
            ))}
          </Animated.View>
        )}
      </View>
    </View>
  )
}

export default Heading
