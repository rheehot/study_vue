
import * as firebase from 'firebase/app';
import 'firebase/storage';

const list = [
    '2.jpg',
    '3.jpg',
    'images.jpeg',
];

export function getThumbnail(idx) {
    return firebase.storage().ref(`thumbnail/${list[idx]}`).getDownloadURL();
}