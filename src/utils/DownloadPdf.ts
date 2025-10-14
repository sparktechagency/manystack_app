import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeBlobUtil from 'react-native-blob-util';
import Toast from 'react-native-toast-message';
import { baseUrl } from './baseUrls';

export const downloadButton = async (url: string, name?: string) => {
  const token = await AsyncStorage.getItem('token');
  try {
    let dirs = ReactNativeBlobUtil.fs.dirs;
    const fileName = `${name ?? 'expanses'}-${Date.now()}.pdf`;

    ReactNativeBlobUtil.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        title: fileName,
        description: 'Votre dépense est en cours de téléchargement',
        mime: 'application/pdf',
        path: dirs.DownloadDir + '/' + fileName,
        mediaScannable: true,

      },
    })
      .fetch('GET', `${baseUrl}/${url}`, {
        Authorization: `Bearer ${token}`,
      })
      .then(res => {
        Toast.show({
          type: 'success',
          text1:'Téléchargement terminé!',
          text2: `Fichier enregistré dans:\n${res.path()}`,
        });
      })
      .catch(error => {
        console.log(error);
        Toast.show({
          type: 'error',
          text1:'Téléchargement échoué!',
          text2: error.message,
        });
      });
  } catch (error: any) {
    Toast.show({
      type: 'error',
      text1:'Téléchargement échoué!',
      text2: error.message || "Une erreur inconnue est survenue.",
    });
  }
};
