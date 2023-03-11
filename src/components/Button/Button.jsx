import PropTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({loadMore}) => (
    <div className={css.buttonContainer}>
        <button type='button' className={css.loadMore} onClick={loadMore}>
        Load More
        </button>
    </div>
)

Button.propTypes = {
    loadMore: PropTypes.func.isRequired,
}