function errorHandler (err, req, res, next) {
    let message = 'Internal server error';
    let status = 500;
  
    if (err.error === 'Unauthenticated') {
      status = 401;
      message = 'Please login first to access this endpoint.'
    }
  
    else if (err.message === 'Unsupport file format') {
      status = 400;
      message = `Unsupport file format. Can only accept ${err.support} format.`;
    }
  
    else if (err.message === 'Name empty') {
      status = 400;
      message = `Name cannot be empty.`;
    }
  
    else if (err.message === 'Illegal arguments: undefined, string') {
      status = 400;
      message = `Password cannot be empty.`;
    }
  
    else if (err.message === 'File cannot be empty') {
      status = 400;
      message = `File cannot be empty. Required minimal 1 file.`;
    }
  
    else if (err.message === 'Field value too long') {
      status = 400;
      message = `Max accumulation files size is 500Kb.`;
    }
  
    else if (err.message === 'File too large') {
      status = 400;
      message = `Max file size is 500Kb.`;
    }
  
    else if (err.error === 'Null Value Constraint') {
      status = 400;
      message = `Please kindly check your input. ${err.attribute} cannot be null.`;
    }
  
    else if (err.error === 'Invalid Type') {
      status = 400;
      message = `Invalid type. ${err.attribute} should be a ${err.requiredType}.`;
    }
  
    else if (err.error === 'Min Value Constraint') {
      status = 400;
      message = `Please kindly check your input. ${err.attribute} should not less than ${err.min} character${err.min > 1 ? 's' : ''}.`;
    }
  
    else if (err.error === 'Max Value Constraint') {
      status = 400;
      message = `Please kindly check your input. ${err.attribute} should not more than ${err.max} character${err.max > 1 ? 's' : ''}.`;
    }
  
    else if (err.error === 'Password Invalid') {
      status = 400;
      message = 'Password Invalid.'
    }
  
    else if (err.error === 'User Not Found') {
      status = 404;
      message = `User not found. Please register first.`;
    }
  
    else if (err.error === 'Unauthorized') {
      status = 401;
  
      if (err.authType === 'Seller')  message = 'Unauthorized. Only seller can access this endpoint.';
      else if (err.authType === 'Admin') message = 'Unauthorized. Only Admin can access this endpoint.';
    }
  
    else if (err.error === 'Invalid Token') {
      status = 400;
      message = 'Token invalid. Try to logout and login again.'
    }
  
    else if (err.message && err.message.includes('invalid input')) {
      status = 400;
      message = 'Invalid input.';
    }
  
    else if (err.message && err.message.includes('violates not-null constraint')) {
      status = 400;
      message = 'Invalid input. Please complete form before submit.';
    }
  
    return res.status(status).json({
      status: status,
      message
    })
  }
  
  module.exports = errorHandler;