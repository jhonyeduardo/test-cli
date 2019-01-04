const fs = require('fs');

const packageJson = (file, name) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', function (err, data) {

      if (err) {
        return console.log(err);
      }

      let result1 = data.replace(/"name": "sidemenu",/g, `"name": "${name}",`);
      // const result2 = result1.replace(/"author": "",/g, `"author": "${author}",`);

      fs.writeFile(file, result1, 'utf8', function (err) {
        if (err) return console.log(err);
        resolve();
      });
    });
  })
}

module.exports = { packageJson };
