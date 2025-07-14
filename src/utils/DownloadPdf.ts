import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import RNFetchBlob from 'rn-fetch-blob';
import {baseUrl} from './baseUrls';

export const downloadButton = async (url: string, name?: string) => {
  console.log('download pdf button clicked');
  const token = await AsyncStorage.getItem('token');
  try {
    let dirs = RNFetchBlob.fs.dirs;
    const fileName = `${name ?? 'expanses'}-${Date.now()}.pdf`;

    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        title: fileName,
        description: `Your expense is being downloaded`,
        mime: 'application/pdf',
        path: dirs.DownloadDir + '/' + fileName,
        mediaScannable: true,
      },
    })
      .fetch('GET', `${baseUrl}/${url}`, {
        Authorization: `Bearer ${token}`,
      })
      .then(res => {
        console.log(res);
        Toast.show({
          type: 'success',
          text1: 'Download complete!',
          text2: `File saved to:\n${res.path()}`,
        });
      })
      .catch(error => {
        console.log(error);
        Toast.show({
          type: 'error',
          text1: 'Download failed!',
          text2: error.message,
        });
      });
  } catch (error: any) {
    console.log(error);
    Toast.show({
      type: 'error',
      text1: 'Download failed!',
      text2: error.message || 'Unknown error occurred.',
    });
  }
};
