exports.Add = function (a, b) {
  return a + b;
};
exports.Ajax = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() * 10 >= 5) {
        resolve({
          success: true
        });
      } else {
        resolve({
          success: false
        });
      }
    }, 1000);
  })
};

console.log('11111111');
