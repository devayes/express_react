
let config = {
  customValidators: {
    isArray: function(value) {
        return Array.isArray(value);
    },
    op: function(param, op, num) {
        return param >= num;
    },
    between: function(param, low, high) {
        return (param >= low && param <= high);
    },
    regex: function(param, regex) {
        let re = new RegExp(regex);
        return re.test(param);
    },
  }
};

module.exports = config;