if (process.env.NODE_ENV != 'production') require('dotenv').load();

module.exports = {
	APPNAME: process.env.APPNAME || 'Fuse',
    PORT: process.env.PORT || 8080,
    KEYS: process.env.NODE_ENV === 'production' ? require('./.prodKeys') : require('./.devKeys'),
    DEVMODE: (process.env.NODE_ENV != 'production')
};