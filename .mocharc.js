module.exports = {
    require: ['@babel/register'],
    timeout: '5000',
    spec: 'tests/**/*.js',
    ignore: 'tests/example.spec.js',
    file: 'global_hook/config.js',
}