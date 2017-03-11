const nativefier = require('nativefier').default;
const configs = require('./configs');

configs.forEach(config => {
  console.log(`Building for platform: ${config.platform}.`);

  nativefier(config, (error, path) => {
    if (error) {
      return console.error('Error compiling app:', error);
    }

    console.log(`App compiled to: ${path}.`);
  });
});
