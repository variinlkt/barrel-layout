'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Barrel = function () {
        function Barrel(ele) {
                var baseH = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
                var baseN = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 9.5;

                _classCallCheck(this, Barrel);

                this.ct = ele;
                this.baseNum = baseN;
                this.baseHeight = this.ct.offsetWidth / this.baseNum || baseH;
                this.maxWidth = ele.offsetWidth;
                this.lastRowWidth = 0;
                this.imgList = [];
                this.data = [];
                this.bind();
                this.imgArr = [];
        }

        _createClass(Barrel, [{
                key: 'createImg',
                value: function createImg(arr) {
                        var _this = this;

                        var num = 0;
                        if (this.data.length == 0) {
                                this.data = arr.map(function (val) {
                                        return val;
                                });
                        }
                        this.data.forEach(function (val, i) {
                                var img = {};
                                new Promise(function (resolve, reject) {
                                        img[i] = new Image();
                                        img[i].onload = function () {
                                                return resolve();
                                        };
                                        img[i].onerror = function () {
                                                return reject();
                                        };
                                        img[i].src = val;
                                }).then(function () {
                                        var imgHeight = img[i].height;
                                        var imgWidth = img[i].width;
                                        var proportion = imgWidth / imgHeight;
                                        var imgInfo = {
                                                self: img[i],
                                                width: _this.baseHeight * proportion,
                                                height: _this.baseHeight
                                        };
                                        _this.render(imgInfo, num);
                                        num++;
                                }).catch(function (err) {
                                        return console.log(err);
                                });
                        });
                }
        }, {
                key: 'render',
                value: function render(imgInfo, num) {
                        var _this2 = this;

                        var rowHeight = this.baseHeight,
                            rowWidth = 0,
                            lastImg = imgInfo,
                            tempArr = [];
                        this.imgList.push(imgInfo);
                        this.imgList.forEach(function (val, i) {
                                rowWidth += val.width;
                                if (_this2.maxWidth < rowWidth) {
                                        _this2.imgList.pop();
                                        rowWidth -= lastImg.width;
                                        rowHeight = _this2.maxWidth * _this2.baseHeight / rowWidth;
                                        _this2.createRow(rowHeight); 
                                        _this2.imgList = [];
                                        _this2.imgList.push(lastImg); 
                                }
                        });

                        if (num === this.data.length - 1 && this.imgList.length != 0) {
                                tempArr = this.imgList;
                                tempArr.forEach(function (val) {
                                        rowWidth += val.width;
                                        rowHeight = _this2.maxWidth * _this2.baseHeight / rowWidth;
                                });
                                this.createRow(rowHeight); 
                                this.lastRowWidth = rowWidth; 
                        }
                }
        }, {
                key: 'createRow',
                value: function createRow(rowHeight) {
                        var row = document.createElement('li'),
                            div = document.createElement('div');
                        div.style.height = rowHeight + 'px';
                        this.imgList.forEach(function (val) {
                                var img = val.self;
                                img.style.height = rowHeight + 'px';
                                div.appendChild(img);
                                row.appendChild(div);
                        });
                        this.ct.appendChild(row);
                }
        }, {
                key: 'bind',
                value: function bind() {
                        var _this3 = this;

                        window.addEventListener('resize', function () {
                                _this3.ct.innerHTML = '';
                                _this3.maxWidth = _this3.ct.offsetWidth;
                                _this3.lastRowWidth = 0;
                                _this3.imgList = [];
                                _this3.baseHeight = _this3.ct.offsetWidth / _this3.baseNum;
                                _this3.createImg(_this3.data);
                        });
                }
        }]);

        return Barrel;
}();
