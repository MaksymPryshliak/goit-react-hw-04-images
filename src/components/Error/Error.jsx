import { MdOutlineImageNotSupported } from 'react-icons/md';
import css from './Error.module.css';
import PropTypes from 'prop-types';

export const Error = ({searchResult}) => (
    <div className={css.error}>
        <MdOutlineImageNotSupported size="15em" className={css.errorSvg}/>
        <p className={css.errorMessage}>
        Sorry, there are no images matching your search "{searchResult}".
      <br /> Please try again.
        </p>
    </div>
)

Error.propTypes = {
    searchResult: PropTypes.string.isRequired,
  };