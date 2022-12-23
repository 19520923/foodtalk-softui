import {storage} from '../services/firebase';
import {ref, getDownloadURL, uploadBytesResumable} from 'firebase/storage';
import {random} from 'lodash';

const metadata = {
  contentType: 'image/webp',
};

export const upload = async (file: string, photo: any) => {
  try {
    const filename = `${file}/${file}-${Date.now()}-${random()}`;
    const imageRef = ref(storage, `images/${filename}`);
    const img = await fetch(photo);
    const blob = await img.blob();

    return uploadBytesResumable(imageRef, blob, metadata).then((snapshot) =>
      getDownloadURL(snapshot.ref),
    );
  } catch (err) {
    console.log(err);
  }
};

export const uploadMultiple = async (photos: Array<any>, file: string) => {
  const urls: Array<any> = [];

  for (const photo of photos) {
    const url = await upload(file, photo);
    urls.push(url);
  }
  return urls;
};
