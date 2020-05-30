import '../../blocks/date-dropdown/date-dropdown';
import './index.scss';


const imageUrls = ['../../assets/img/blue-chair.jpg', '../../assets/img/green-room.jpg', '../../assets/img/sofa.jpg'];
let imageIndex = 0;

const changeImage = () => {
  $('.main-page').css('background-image', `url(${imageUrls[imageIndex]})`);
  imageIndex++;
  if (imageIndex === imageUrls.length) {
    imageIndex = 0;
  }
}

setInterval(changeImage, 5000);
