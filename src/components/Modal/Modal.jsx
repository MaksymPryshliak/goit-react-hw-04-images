import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({toggleModal, alt, url}) => {

useEffect(()=> {
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown)
});

const handleBackdropClick = e => {
  if (e.currentTarget === e.target) {
    toggleModal();
  }
};

const  handleKeyDown = e => {
  if (e.code === 'Escape') {
    toggleModal();
  }
};

  return createPortal(
    <div className={css.modalBackdrop} onClick={handleBackdropClick}>
      <div className={css.modalContainer}>
        <img src={url} alt={alt} />
      </div>
    </div>, modalRoot
  );
}

// export class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

  // handleBackdropClick = e => {
  //   if (e.currentTarget === e.target) {
  //     this.props.toggleModal();
  //   }
  // };

  // handleKeyDown = e => {
  //   if (e.code === 'Escape') {
  //     this.props.toggleModal();
  //   }
  // };

//   render() {
//     const { alt, url } = this.props;
//     return createPortal(
//       <div className={css.modalBackdrop} onClick={this.handleBackdropClick}>
//         <div className={css.modalContainer}>
//           <img src={url} alt={alt} />
//         </div>
//       </div>, modalRoot
//     );
//   }
// }



Modal.propTypes = {
    alt: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    toggleModal: PropTypes.func.isRequired,
}