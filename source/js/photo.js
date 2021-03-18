import {showAlert} from './util.js';

const FILE_TYPES = ['png', 'jpeg'];
const fileAvatarChooser = document.querySelector('.ad-form__field input[type=file]');
const previewAvatar = document.querySelector('#avatar-photo');
const filePhotoChooser = document.querySelector('#images');
const previewPhoto = document.querySelector('.ad-form__photo');

fileAvatarChooser.addEventListener('change', () => {
  const file = fileAvatarChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewAvatar.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
  else {
    showAlert('Выберите файл с расширением .png, .jpeg');
  }
});

filePhotoChooser.addEventListener('change', () => {
  const files = Array.from(filePhotoChooser.files);
  const imgTemplate = document.querySelector('#card').content.querySelector('.popup__photo');

  files.forEach((file) => {
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        const addPhoto = imgTemplate.cloneNode(true);
        addPhoto.classList.add('popup__photos')
        addPhoto.src = reader.result;
        previewPhoto.appendChild(addPhoto);
      });

      reader.readAsDataURL(file);
    }
  });
});
