import React from 'react';
import PropTypes from 'prop-types';

import { Icon, Card } from 'antd';

import _s from './EmailSent.less';

const EmailSent = props => {
  const { email } = props;

  return (
    <Card className={_s.EmailSentCard}>
      <p style={{ fontWeight: 'bold', fontSize: '1.05rem', textAlign: 'center' }}>
        <Icon style={{ paddingRight: '5px' }} type="email" /> Email Sent!
      </p>
      Email sent to {email}! Check your email and verify your account.
    </Card>
  );
};

EmailSent.propTypes = {
  email: PropTypes.string.isRequired
};

export default EmailSent;
