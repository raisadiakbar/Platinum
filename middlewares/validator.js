class Validator {
    constructor(on, attr) {
      this.on = on;
      this.attr = attr;
    }
  
    static body (attr) {
      return new Validator('body', attr);
    }
    
    static headers (attr) {
      return new Validator('headers', attr);
    }
  
    number({ strict }) {
      return (req, res, next) => {
        if (strict !== true) {
          if (isNaN(req[this.on][this.attr])) return next({
            error: 'Invalid Type',
            attribute: this.attr,
            requiredType: 'number'
          })
        }
  
        if (strict === true) {
          if (typeof req[this.on][this.attr] !== 'number') return next({
            error: 'Invalid Type',
            attribute: this.attr,
            requiredType: 'number'
          })
        }
  
        return next();
      }
    }
  
    notEmpty() {
      return (req, res, next) => {
        if ([null, undefined, ''].includes(req[this.on][this.attr])) return next({
          error: 'Null Value Constraint',
          attribute: this.attr
        })
  
        return next();
      }
    }
  
    length (options) {
      return (req, res, next) => {
        if (options.min) {
          if (req[this.on][this.attr].length < options.min) return next({
            error: 'Min Value Constraint',
            attribute: this.attr,
            min: options.min
          })
        }
  
        if (options.max) {
          if (req[this.on][this.attr] < options.max) return next({
            error: 'Max Value Constraint',
            attribute: this.attr,
            min: options.max
          })
        }
  
        return next();
      }
    }
  }
  
  module.exports = Validator;