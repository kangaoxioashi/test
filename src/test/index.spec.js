const chai = require('chai');
const { assert } = chai;

const { Add, Ajax } = require('../index');
describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
describe('Index', function () {
  describe('Add', function () {
    it('should equal', function () {
      assert.equal(Add(1, 2), 3);
    });
  });
  describe('Ajax', function () {
    it('should success', function (done) {
      Ajax().then((res) => {
        console.log('111', res.success);
        assert.ok(res.success);
        done();
        // if (res.success) {
        //   assert.ok(true);
        //   done();
        // }
      })
    });
  });
});