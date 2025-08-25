import { Camera, CameraResultType } from '@capacitor/camera';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

async function takePhoto() {
  const photo = await Camera.getPhoto({
    resultType: CameraResultType.Uri
  });
  document.getElementById('output').innerHTML =
    "<p>Photo taken:</p><img src='" + photo.webPath + "' width='200'/>";
}

async function saveFile() {
  await Filesystem.writeFile({
    path: 'demo.txt',
    data: 'Hello from Capacitor!',
    directory: Directory.Documents,
    encoding: Encoding.UTF8,
  });
  alert('File saved to Documents!');
}
