module.exports = {
    default: {
        paths: ['tests/features/**/*.feature'],
        require: ['tests/steps/**/*.js', 'tests/support/**/*.js'],
        format: ['progress']
    }
};