import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import classes from './SliderImages.module.css';
import { useEffect, useMemo, useState } from 'react';
import { ImageFileData } from '../../../types/postCreate';

type SliderImagesProps = {
  images: Array<ImageFileData>;
};

const SliderImages: React.FC<SliderImagesProps> = ({ images }) => {
  const [imageNum, setImageNum] = useState<number>(0);
  const [widthSliderItem, setWidthSliderItem] = useState<number>(0);
  const [sliderLineLeft, setSliderLineLeft] = useState<number>(0);
  const [sliderHeight, setSliderHeight] = useState<number>(0);

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);
    resizeHandler();

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [images]);

  const resizeHandler = () => {
    const postImagesWrap = document.querySelector(
      '.' + classes.slider_images
    ) as HTMLElement;
    setWidthSliderItem(postImagesWrap.offsetWidth);

    if (window.innerWidth <= 768) {
      const sliderLine = document.querySelector(
        '.' + classes.slider_line
      ) as HTMLElement;
      setSliderHeight(sliderLine.offsetHeight);
    } else {
      setSliderHeight(0);
    }
  };

  const imageFiles = useMemo(
    () =>
      images.map((image) => {
        return (
          <div
            key={image.id}
            style={{
              width: widthSliderItem + 'px',
            }}
            className={classes.slider_item}>
            <img src={image.file} alt='' className={classes.image_file} />
          </div>
        );
      }),
    [images, widthSliderItem]
  );

  const next = () => {
    setImageNum(imageNum + 1);
    setSliderLineLeft(widthSliderItem * (imageNum + 1));
  };
  const prev = () => {
    setImageNum(imageNum - 1);
    setSliderLineLeft(widthSliderItem * (imageNum - 1));
  };

  return (
    <div
      style={sliderHeight ? { height: sliderHeight + 'px' } : { height: '' }}
      className={classes.slider_images}>
      <div
        className={classes.slider_line}
        style={{
          width: images.length * widthSliderItem + 'px',
          left: '-' + sliderLineLeft + 'px',
        }}>
        {imageFiles}
      </div>
      {imageNum !== images.length - 1 && (
        <div
          className={classes.arrow_next + ' ' + classes.arrow}
          onClick={next}>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      )}
      {imageNum !== 0 && (
        <div
          className={classes.arrow_prev + ' ' + classes.arrow}
          onClick={prev}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
      )}
    </div>
  );
};

export default SliderImages;
