exports.Add = function (a, b) {
  return a + b;
};
exports.Ajax = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const val = Math.round(Math.random() * 10);
      if (val >= 5) {
        resolve({
          success: true,
          val,
        });
      } else {
        resolve({
          success: false,
          val,
        });
      }
    }, 1000);
  })
};

console.log('111111test');
