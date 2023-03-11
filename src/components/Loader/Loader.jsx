import { RotatingLines } from 'react-loader-spinner';
import css from './Loader.module.css';

export const Loader = () => (
  <div className={css.loader}>
    <RotatingLines
      strokeColor="#0E8388"
      strokeWidth="5"
      animationDuration="0.75"
      width="96"
      visible={true}
    />
  </div>
);
