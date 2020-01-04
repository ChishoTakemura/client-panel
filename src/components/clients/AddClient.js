import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { compose } from 'redux';
// import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

export class AddClient extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: ''
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newClient = this.state;

    const { firestore } = this.props;

    // if no balance, make 0
    if (newClient.balance === '') {
      newClient.balance = 0;
    }

    firestore
      .add({ collection: 'clients' }, newClient)
      .then(() => this.props.history.push('/'));
  };
  render() {
    return (
      <div>
        <div className='row'>
          <div className='col-md-6'>
            <Link to='/' className='btn btn-link'>
              <i className='fas fa-arrow-circle-left'></i> Back To Dashboard
            </Link>
          </div>
        </div>

        <div className='card'>
          <div className='card-header'>Add Client</div>
          <div className='card-body'>
            <form onSubmit={this.onSubmit}>
              <div className='from-group'>
                <label htmlFor='firstName'>First Name</label>
                <input
                  type='text'
                  className='form-control'
                  name='firstName'
                  minLength='2'
                  required
                  onChange={this.onChange}
                  value={this.state.firstName}
                />
              </div>
              <div className='from-group'>
                <label htmlFor='lastName'>Last Name</label>
                <input
                  type='text'
                  className='form-control'
                  name='lastName'
                  minLength='2'
                  required
                  onChange={this.onChange}
                  value={this.state.lastName}
                />
              </div>
              <div className='from-group'>
                <label htmlFor='email'>Email</label>
                <input
                  type='text'
                  className='form-control'
                  name='email'
                  onChange={this.onChange}
                  value={this.state.email}
                />
              </div>
              <div className='from-group'>
                <label htmlFor='phone'>Phone</label>
                <input
                  type='text'
                  className='form-control'
                  name='phone'
                  minLength='10'
                  required
                  onChange={this.onChange}
                  value={this.state.phone}
                />
              </div>
              <div className='from-group'>
                <label htmlFor='balance'>balance</label>
                <input
                  type='text'
                  className='form-control'
                  name='balance'
                  onChange={this.onChange}
                  value={this.state.balance}
                />
              </div>

              <input
                type='submit'
                value='Submit'
                className='btn btn-primary btn-block mt-3
                '
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AddClient.PropTypes = {
  firestore: PropTypes.object.isRequired
};

export default firestoreConnect()(AddClient);
