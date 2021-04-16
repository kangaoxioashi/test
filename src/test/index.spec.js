const chai = require('chai');
const { assert, expect } = chai;

const { Add, Ajax } = require('../index');
describe('hooks', function () {
  before(function () {
    // runs before all tests in this block
    //console.log('开始测试');
  });
  beforeEach(function () {
    // runs before each test in this block
    //console.log('每一个测试开始前执行');
  });
  after(function () {
    //console.log('测试结束');
  });
  describe('Array', function () {
    console.log(this);
    describe('#indexOf()', function () {
      it('should return -1 when the value is not present', function () {
        assert.equal([1, 2, 3].indexOf(4), -1);
      });
    });
    describe('#splice()', function () {
      it('should return [2, 3]', function () {
        assert.deepEqual([1, 2, 3].splice(1), [2, 3]);
      });
    })
  });
  describe('Index', function () {
    describe('Add', function () {
      it('should equal 1+2 =3', function () {
        assert.equal(Add(1, 2), 3);
      });
    });
    describe('Ajax', function () {
      it('should success', function (done) {
        Ajax().then((res) => {
          console.log('111', res.success, res.val);
          //assert.ok(res.success);
          expect(res.val).to.be.above(5);
          done();
        })
      });
    });
    describe('Add', function () {
      it('should equal 1+3=4', function () {
        assert.equal(Add(1, 3), 4);
      });
    });
  });
})
