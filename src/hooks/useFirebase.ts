import {storage} from '../services/firebase';
import {ref, getDownloadURL, uploadBytesResumable} from 'firebase/storage';

export const upload = (
  photos: Array<any>,
  file: string,
  callback: (array: Array<string>) => void,
) => {
  const urls: Array<string> = [];
  const metadata = {
    contentType: 'image/webp',
  };

  try {
    photos.forEach(async (photo, index) => {
      const filename = `${file}/${file}-${Date.now()}-${photo.name}`;
      const imageRef = ref(storage, `image/${filename}`);
      const img = await fetch(photo.uri);
      const blob = await img.blob();

      uploadBytesResumable(imageRef, blob, metadata).then((snapshot) =>
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          urls.push(downloadURL);
          if (index === photo.lenght - 1) {
            callback(urls);
          }
        }),
      );
    });
  } catch (err) {
    console.log(err);
  }
};
