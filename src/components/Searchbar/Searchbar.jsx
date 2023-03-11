import { Component } from 'react';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import css from './Searchbar.module.css';
import { toast } from 'react-toastify';

export class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  handleChange = e => {
    this.setState({ inputValue: e.target.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if(this.state.inputValue.trim() === '') {
        toast.error('No request - no photos', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
            return
    }
    this.props.formSubmit(this.state.inputValue)
    this.setState({inputValue: ''})
};

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.button}>
            <ImSearch />
          </button>

          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.inputValue}
            name="inputValue"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}


Searchbar.propTypes = {
    formSubmit: PropTypes.func.isRequired,
}