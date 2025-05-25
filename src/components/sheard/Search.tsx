import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {SearchIcon} from '../../constant/images';
import {useGlobalContext} from '../../providers/GlobalContextProvider';
import {hexToRGBA} from '../../utils/hexToRGBA';
interface SearchProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}
const Search = ({search, setSearch}: SearchProps) => {
  const {themeColors} = useGlobalContext();
  return (
    <View
      style={{
        position: 'relative',
        marginTop: 6,
        backgroundColor: hexToRGBA(themeColors.primary as string, 0.07),
      }}>
      <Image
        source={SearchIcon as ImageSourcePropType}
        style={{
          position: 'absolute',
          width: 20,
          height: 20,
          tintColor: hexToRGBA(themeColors.black as string, 0.7),
          top: 13,
          left: 10,
        }}
      />
      <TextInput
        value={search}
        onChangeText={text => setSearch(text)}
        placeholder="Search..."
        placeholderTextColor={hexToRGBA(themeColors.black as string, 0.3)}
        style={{
          padding: 16,
          borderRadius: 8,
          paddingLeft: 40,
        }}
        // onSubmitEditing={() => { console.log('submit') }}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
