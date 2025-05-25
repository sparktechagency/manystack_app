import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {PlatformPressable} from '@react-navigation/elements';
import {useLinkBuilder, useNavigation} from '@react-navigation/native';
import {View} from 'react-native';
import {DrawerTypes} from '../../types/ScreenPropsTypes';
import TabItems from './TabItems';
const Tabbar = ({state, descriptors, navigation}: BottomTabBarProps) => {
  const navigate = useNavigation<DrawerNavigationProp<DrawerTypes>>();
  const {buildHref} = useLinkBuilder();

  return (
    <View style={{flexDirection: 'row', height: 50}}>
      {state.routes.map((route: any, index: any) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          if (route.name === 'Drawer') {
            navigate.openDrawer();
            return;
          }
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key={index}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1}}>
            <TabItems
              key={route.key}
              route={route.name}
              label={label}
              isFocused={isFocused}
            />
          </PlatformPressable>
        );
      })}
    </View>
  );
};

export default Tabbar;
