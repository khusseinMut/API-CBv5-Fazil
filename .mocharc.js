module.exports = {
    require: ['@babel/register'],
    timeout: '500',
    spec: 'tests/**/*.js',
    ignore: 'tests/example.spec.js',
    file: 'global_hook/config.js',
}