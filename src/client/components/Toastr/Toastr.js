import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from '../../store/actions';
import { SUCCESS, ERROR, INFO } from '../../store/constants/toastr';

import _s from './Toastr.less';

class Toastr extends Component {
  render() {
    let image = '/icons/toastr-error.svg';
    let text = 'Error';

    switch (this.props.category) {
      case SUCCESS:
        image = '/public/icons/toastr-success.svg';
        text = 'Success';
        break;
      case INFO:
        image = '/public/icons/toastr-success.svg';
        text = 'Info';
        break;
      case ERROR:
        image = '/public/icons/toastr-error.svg';
        text = 'Error';
        break;
      default:
    }

    return (
      <div>
        {this.props.toastrIsShowing && (
          <div className={_s.toastr} category={this.props.category}>
            <img className={_s.status} alt="toastr" src={image} />
            <img className={_s.separator} alt="toastr" src="/public/icons/toastr-separator.svg" />
            <div className={_s.category}>{text}</div>
            <div className={_s.message}>{this.props.message}</div>
            <div
              role="button"
              tabIndex={0}
              onClick={() => this.props.hideToastr()}
              onKeyPress={() => {}}
            >
              <img className={_s.close} alt="toastr" src="/public/icons/close.svg" />
            </div>
          </div>
        )}
      </div>
    );
  }
}

Toastr.propTypes = {
  toastrIsShowing: PropTypes.bool.isRequired,
  category: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  hideToastr: PropTypes.func.isRequired
};

Toastr.defaultProps = {
  toastrIsShowing: false,
  category: ERROR,
  message: 'No message'
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      hideToastr: actions.hideToastr
    },
    dispatch
  );
};

const mapStateToProps = state => ({
  toastrIsShowing: state.toastr.toastrIsShowing,
  category: state.toastr.category,
  message: state.toastr.message
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toastr);
