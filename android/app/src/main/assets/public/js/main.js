import { Camera, CameraResultType } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { CapacitorVoiceRecorder } from 'capacitor-voice-recorder';

const btnCamera = document.getElementById('btnCamera');
const btnSave = document.getElementById('btnSave');
const preview = document.getElementById('preview');
const btnMicStart = document.getElementById('btnMicStart');
const btnMicStop = document.getElementById('btnMicStop');
const micLog = document.getElementById('micLog');
const player = document.getElementById('player');

let currentImage = null;
let audioData = null;

// 📸 Take Photo
btnCamera.addEventListener('click', async () => {
  const photo = await Camera.getPhoto({
    quality: 90,
    resultType: CameraResultType.DataUrl
  });
  preview.src = photo.dataUrl;
  currentImage = photo.dataUrl;
});

// 💾 Save Photo
btnSave.addEventListener('click', async () => {
  if (!currentImage) {
    alert("Take a photo first!");
    return;
  }
  const fileName = `photo_${Date.now()}.jpeg`;
  await Filesystem.writeFile({
    path: fileName,
    data: currentImage.split(',')[1],
    directory: Directory.Documents
  });
  alert("Photo saved as " + fileName);
});

// 🎤 Mic Record Start
btnMicStart.addEventListener('click', async () => {
  await CapacitorVoiceRecorder.requestAudioRecordingPermission();
  await CapacitorVoiceRecorder.startRecording();
  micLog.textContent = "Recording...";
});

// 🎤 Mic Record Stop
btnMicStop.addEventListener('click', async () => {
  const result = await CapacitorVoiceRecorder.stopRecording();
  micLog.textContent = "Recording stopped.";
  audioData = `data:audio/aac;base64,${result.value.recordDataBase64}`;
  player.src = audioData;
});
