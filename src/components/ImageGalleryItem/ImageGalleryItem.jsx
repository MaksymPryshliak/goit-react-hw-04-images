import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({images, children, loadLargeImg}) => (
   
   <div>
       <ul className={css.gallery}>
         {images.map(({id, tags, webformatURL, largeImageURL}) => (
            <li className={css.galleryItem} key={id}>
            <img src={webformatURL} alt={tags} className={css.galleryImage} onClick={()=> loadLargeImg(largeImageURL, tags)} />
          </li>
         ))}
       </ul>
       {children}
   </div>
)

ImageGalleryItem.propTypes = {
    images: PropTypes.arrayOf(PropTypes.exact({
        id: PropTypes.number.isRequired,
        tags: PropTypes.string.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
    })),
    children: PropTypes.node.isRequired,
    loadLargeImg: PropTypes.func.isRequired,
}