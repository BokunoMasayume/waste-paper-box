/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_webgl2Util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/webgl2Util */ "./util/webgl2Util.ts");
/* harmony import */ var _shader_lenticular_frag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shader/lenticular.frag */ "./shader/lenticular.frag");
/* harmony import */ var _shader_lenticular_vert__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shader/lenticular.vert */ "./shader/lenticular.vert");



var row = 300;
var col = 300;
var depth = -.05;
var positions = new Float32Array(row * col * 4 * 3 * 3);
for (var i = 0; i < col; i++) {
    for (var j = 0; j < row; j++) {
        var idx = j * col + i;
        var centerX = i / col;
        var centerY = j / row;
        var centerZ = depth;
        var leftTopX = centerX - .5 / col;
        var leftTopY = centerY - .5 / row;
        var leftTopZ = 0;
        var rightTopX = centerX + .5 / col;
        var rightTopY = centerY - .5 / row;
        var rightTopZ = 0;
        var rightBottomX = centerX + .5 / col;
        var rightBottomY = centerY + .5 / row;
        var rightBottomZ = 0;
        var leftBottomX = centerX - .5 / col;
        var leftBottomY = centerY + .5 / row;
        var leftBottomZ = 0;
        console.log(centerX, centerY, centerZ, leftTopX, leftTopY, leftTopZ);
        positions[idx * 36] = centerX;
        positions[idx * 36 + 1] = centerY;
        positions[idx * 36 + 2] = centerZ;
        positions[idx * 36 + 3] = leftTopX;
        positions[idx * 36 + 4] = leftTopY;
        positions[idx * 36 + 5] = leftTopZ;
        positions[idx * 36 + 6] = rightTopX;
        positions[idx * 36 + 7] = rightTopY;
        positions[idx * 36 + 8] = rightTopZ;
        positions[idx * 36 + 9] = centerX;
        positions[idx * 36 + 10] = centerY;
        positions[idx * 36 + 11] = centerZ;
        positions[idx * 36 + 12] = rightTopX;
        positions[idx * 36 + 13] = rightTopY;
        positions[idx * 36 + 14] = rightTopZ;
        positions[idx * 36 + 15] = rightBottomX;
        positions[idx * 36 + 16] = rightBottomY;
        positions[idx * 36 + 17] = rightBottomZ;
        positions[idx * 36 + 18] = centerX;
        positions[idx * 36 + 19] = centerY;
        positions[idx * 36 + 20] = centerZ;
        positions[idx * 36 + 21] = rightBottomX;
        positions[idx * 36 + 22] = rightBottomY;
        positions[idx * 36 + 23] = rightBottomZ;
        positions[idx * 36 + 24] = leftBottomX;
        positions[idx * 36 + 25] = leftBottomY;
        positions[idx * 36 + 26] = leftBottomZ;
        positions[idx * 36 + 27] = centerX;
        positions[idx * 36 + 28] = centerY;
        positions[idx * 36 + 29] = centerZ;
        positions[idx * 36 + 30] = leftTopX;
        positions[idx * 36 + 31] = leftTopY;
        positions[idx * 36 + 32] = leftTopZ;
        positions[idx * 36 + 33] = leftBottomX;
        positions[idx * 36 + 34] = leftBottomY;
        positions[idx * 36 + 35] = leftBottomZ;
    }
}
var canvas = document.querySelector('#lenticular');
var video1 = document.querySelector('#source1');
var video2 = document.querySelector('#source2');
setTimeout(function () {
    canvas.width = 800;
    canvas.height = 700;
    var gl = canvas.getContext('webgl2');
    var program = Object(_util_webgl2Util__WEBPACK_IMPORTED_MODULE_0__["createProgram"])(gl, Object(_util_webgl2Util__WEBPACK_IMPORTED_MODULE_0__["createShader"])(gl, gl.VERTEX_SHADER, _shader_lenticular_vert__WEBPACK_IMPORTED_MODULE_2__["default"]), Object(_util_webgl2Util__WEBPACK_IMPORTED_MODULE_0__["createShader"])(gl, gl.FRAGMENT_SHADER, _shader_lenticular_frag__WEBPACK_IMPORTED_MODULE_1__["default"]));
    gl.enable(gl.DEPTH_TEST);
    gl.useProgram(program);
    gl.viewport(0, 0, canvas.width, canvas.height);
    var position1 = gl.getUniformLocation(program, 'u_video1');
    var position2 = gl.getUniformLocation(program, 'u_video2');
    gl.uniform1i(position1, 0);
    gl.uniform1i(position2, 1);
    gl.MousePosition = gl.getUniformLocation(program, 'u_mouse');
    canvas.addEventListener('mousemove', function (e) {
        gl.uniform2fv(gl.MousePosition, [e.offsetX / canvas.clientWidth - .5, -e.offsetY / canvas.clientHeight + .5]);
        console.log('u_mouse', e.offsetX / canvas.clientWidth - .5, -e.offsetY / canvas.clientHeight + .5);
    });
    gl.activeTexture(gl.TEXTURE0);
    var videoTex1 = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, videoTex1);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, video1.videoWidth, video1.videoHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, video1);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.activeTexture(gl.TEXTURE1);
    var videoTex2 = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, videoTex2);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, video2.videoWidth, video2.videoHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, video2);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    var positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    var positionUnifResolution = gl.getUniformLocation(program, 'u_resolution');
    gl.uniform2f(positionUnifResolution, canvas.width, canvas.height);
    var positionbuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionbuffer);
    var vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    gl.enableVertexAttribArray(positionAttributeLocation);
    var size = 3;
    var type = gl.FLOAT;
    var normalize = false;
    var stride = 0;
    var offset = 0;
    gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
    gl.bindVertexArray(vao);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    var primitiveType = gl.TRIANGLES;
    var doffset = 0;
    var count = row * col * 4 * 3;
    gl.drawArrays(primitiveType, doffset, count);
    function tick() {
        gl.activeTexture(gl.TEXTURE0);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, video1.videoWidth, video1.videoHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, video1);
        gl.activeTexture(gl.TEXTURE1);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, video2.videoWidth, video2.videoHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, video2);
        var primitiveType = gl.TRIANGLES;
        var doffset = 0;
        var count = row * col * 4 * 3;
        gl.drawArrays(primitiveType, doffset, count);
        requestAnimationFrame(tick);
    }
    tick();
}, 2000);


/***/ }),

/***/ "./shader/lenticular.frag":
/*!********************************!*\
  !*** ./shader/lenticular.frag ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("#version 300 es /* Easing Sine In equation */\n\nprecision mediump float;\n\nin vec2  v_texturePosition;\nin float order;\nout vec4  outColor ;\n\nuniform sampler2D u_video1;\nuniform sampler2D u_video2;\n\n\n/* Adapted from Robert Penner easing equations */\n#define PI_TWO\t\t\t1.570796326794897\n\n\n\n\nvoid main (){\n    vec4 color  = texture(u_video1 , v_texturePosition);\n\n    if(order <= 1.){\n        color  = texture(u_video2 , v_texturePosition);\n    }else {\n        color  = texture(u_video1 , v_texturePosition);\n    }\n\n    outColor =color;\n\n}\n");

/***/ }),

/***/ "./shader/lenticular.vert":
/*!********************************!*\
  !*** ./shader/lenticular.vert ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("#version 300 es\n\nin vec3 a_position ; \nout vec2 v_texturePosition;\n\nuniform vec2 u_resolution;\nuniform vec2 u_mouse;\n// uniform float iTime;\n// uniform vec2 u_textureSize;\n// out float time;\nout vec2 resolution;\nout float order;\n// out int imageIdx;\n// out vec2 mouse;\n// out vec2 texturesize;\n\n/* \ncp : camera postion\nla : look at \nvd : origin position \n*/\nvec3 getTransformedPosition(vec3 cp , vec3 la , vec3 vd) {\n    \n\n    vec3 ww = normalize( la - cp );\n    vec3 uu = normalize( cross(vec3(0. , 1. , 0.) , ww  ) );\n    vec3 vv = normalize( cross(ww , uu ) );\n\n    mat3 cameraTransform = mat3(uu, vv, ww);\n\n    return cameraTransform *  vd  ;\n}\n\nvoid main(){\n    vec3 position = vec3(a_position.x*2. - 1., a_position.y*2. - 1., a_position.z);\n    // 会造成形变\n    // gl_Position = vec4(getTransformedPosition(vec3(u_mouse*2.,1.), vec3(0.,0.,0.), position), 1.);\n\n    // 无形变\n    if( a_position.z != 0. ){\n        gl_Position = vec4( position.xy + (u_mouse.xy)*.02, position.z, 1.);\n    }\n    else {\n        gl_Position = vec4(position, 1.);\n    }\n\n    v_texturePosition = a_position.xy  ;\n\n    resolution = u_resolution;\n\n    float idx = mod(float(gl_VertexID), 12.);\n    idx = floor(idx / 3.);\n    order = idx;\n\n    \n\n}");

/***/ }),

/***/ "./util/webgl2Util.ts":
/*!****************************!*\
  !*** ./util/webgl2Util.ts ***!
  \****************************/
/*! exports provided: createShader, createProgram, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createShader", function() { return createShader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createProgram", function() { return createProgram; });
function createShader(gl, type, source) {
    var shader = gl.createShader(type);
    if (!shader)
        return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }
    console.log(type == gl.FRAGMENT_SHADER ? 'frag' : 'vert', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return shader;
}
function createProgram(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();
    if (!program || !vertexShader || !fragmentShader)
        return null;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return program;
}
/* harmony default export */ __webpack_exports__["default"] = ({
    createProgram: createProgram,
    createShader: createShader,
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc2hhZGVyL2xlbnRpY3VsYXIuZnJhZyIsIndlYnBhY2s6Ly8vLi9zaGFkZXIvbGVudGljdWxhci52ZXJ0Iiwid2VicGFjazovLy8uL3V0aWwvd2ViZ2wyVXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQWdFO0FBRWpCO0FBQ0E7QUFDL0MsSUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQ2hCLElBQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUNoQixJQUFNLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQztBQUNuQixJQUFJLFNBQVMsR0FBRyxJQUFJLFlBQVksQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDeEQsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUcsQ0FBQyxHQUFJLEdBQUcsRUFBRyxDQUFDLEVBQUUsRUFBQztJQUN6QixLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRyxDQUFDLEdBQUcsR0FBRyxFQUFHLENBQUMsRUFBRSxFQUFDO1FBQ3hCLElBQUksR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLElBQUksT0FBTyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUU7UUFDdkIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUN0QixJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFFcEIsSUFBSSxRQUFRLEdBQUcsT0FBTyxHQUFHLEVBQUUsR0FBQyxHQUFHLENBQUM7UUFDaEMsSUFBSSxRQUFRLEdBQUcsT0FBTyxHQUFHLEVBQUUsR0FBQyxHQUFHLENBQUM7UUFDaEMsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBRWpCLElBQUksU0FBUyxHQUFHLE9BQU8sR0FBRyxFQUFFLEdBQUMsR0FBRyxDQUFDO1FBQ2pDLElBQUksU0FBUyxHQUFHLE9BQU8sR0FBRyxFQUFFLEdBQUMsR0FBRyxDQUFDO1FBQ2pDLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQztRQUVsQixJQUFJLFlBQVksR0FBRyxPQUFPLEdBQUcsRUFBRSxHQUFDLEdBQUcsQ0FBQztRQUNwQyxJQUFJLFlBQVksR0FBRyxPQUFPLEdBQUcsRUFBRSxHQUFDLEdBQUcsQ0FBQztRQUNwQyxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7UUFFckIsSUFBSSxXQUFXLEdBQUcsT0FBTyxHQUFHLEVBQUUsR0FBQyxHQUFHLENBQUM7UUFDbkMsSUFBSSxXQUFXLEdBQUcsT0FBTyxHQUFHLEVBQUUsR0FBQyxHQUFHLENBQUM7UUFDbkMsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBRXBCLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUcsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUV0RSxTQUFTLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQztRQUM5QixTQUFTLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUM7UUFDbEMsU0FBUyxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDO1FBRWxDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQztRQUNuQyxTQUFTLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUM7UUFDbkMsU0FBUyxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDO1FBRW5DLFNBQVMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQztRQUNwQyxTQUFTLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUM7UUFDcEMsU0FBUyxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDO1FBR3BDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQztRQUNsQyxTQUFTLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUM7UUFDbkMsU0FBUyxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDO1FBRW5DLFNBQVMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQztRQUNyQyxTQUFTLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxTQUFTLENB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QUFPLElBQUksQ0FBQztJQUM5RCxFQUFFLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztJQUN2QyxFQUFFLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsQ0FBQztJQUV6QyxFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRXhCLElBQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2hFLElBQUksT0FBTyxFQUFFO1FBQ1gsT0FBTyxPQUFPLENBQUM7S0FDaEI7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzNDLEVBQUUsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDMUIsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQztBQUljO0lBQ2IsYUFBYTtJQUNiLFlBQVk7Q0FDYixFQUFDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgeyBjcmVhdGVTaGFkZXIsIGNyZWF0ZVByb2dyYW0gfSBmcm9tICcuL3V0aWwvd2ViZ2wyVXRpbCc7XG5cbmltcG9ydCBsZW5GcmFnIGZyb20gJy4vc2hhZGVyL2xlbnRpY3VsYXIuZnJhZyc7XG5pbXBvcnQgbGVuVmVydCBmcm9tICcuL3NoYWRlci9sZW50aWN1bGFyLnZlcnQnO1xuY29uc3Qgcm93ID0gMzAwO1xuY29uc3QgY29sID0gMzAwO1xuY29uc3QgZGVwdGggPSAtLjA1O1xubGV0IHBvc2l0aW9ucyA9IG5ldyBGbG9hdDMyQXJyYXkocm93ICogY29sICogNCAqIDMgKiAzKTtcbmZvcihsZXQgaT0wIDsgaSA8ICBjb2wgOyBpKyspe1xuICAgIGZvcihsZXQgaj0wIDsgaiA8IHJvdyA7IGorKyl7XG4gICAgICAgIGxldCBpZHggPSBqICogY29sICsgaTtcbiAgICAgICAgbGV0IGNlbnRlclggPSBpIC8gY29sIDtcbiAgICAgICAgbGV0IGNlbnRlclkgPSBqIC8gcm93O1xuICAgICAgICBsZXQgY2VudGVyWiA9IGRlcHRoO1xuXG4gICAgICAgIGxldCBsZWZ0VG9wWCA9IGNlbnRlclggLSAuNS9jb2w7XG4gICAgICAgIGxldCBsZWZ0VG9wWSA9IGNlbnRlclkgLSAuNS9yb3c7XG4gICAgICAgIGxldCBsZWZ0VG9wWiA9IDA7XG5cbiAgICAgICAgbGV0IHJpZ2h0VG9wWCA9IGNlbnRlclggKyAuNS9jb2w7XG4gICAgICAgIGxldCByaWdodFRvcFkgPSBjZW50ZXJZIC0gLjUvcm93O1xuICAgICAgICBsZXQgcmlnaHRUb3BaID0gMDtcblxuICAgICAgICBsZXQgcmlnaHRCb3R0b21YID0gY2VudGVyWCArIC41L2NvbDtcbiAgICAgICAgbGV0IHJpZ2h0Qm90dG9tWSA9IGNlbnRlclkgKyAuNS9yb3c7XG4gICAgICAgIGxldCByaWdodEJvdHRvbVogPSAwO1xuXG4gICAgICAgIGxldCBsZWZ0Qm90dG9tWCA9IGNlbnRlclggLSAuNS9jb2w7XG4gICAgICAgIGxldCBsZWZ0Qm90dG9tWSA9IGNlbnRlclkgKyAuNS9yb3c7XG4gICAgICAgIGxldCBsZWZ0Qm90dG9tWiA9IDA7XG5cbiAgICAgICAgY29uc29sZS5sb2coY2VudGVyWCwgY2VudGVyWSwgY2VudGVyWiAsIGxlZnRUb3BYLCBsZWZ0VG9wWSwgbGVmdFRvcFopO1xuICAgICAgICAvL3RvcCB0cmlhbmdsZVxuICAgICAgICBwb3NpdGlvbnNbaWR4ICogMzZdID0gY2VudGVyWDtcbiAgICAgICAgcG9zaXRpb25zW2lkeCAqIDM2ICsgMV0gPSBjZW50ZXJZO1xuICAgICAgICBwb3NpdGlvbnNbaWR4ICogMzYgKyAyXSA9IGNlbnRlclo7XG5cbiAgICAgICAgcG9zaXRpb25zW2lkeCAqIDM2ICsgM10gPSBsZWZ0VG9wWDtcbiAgICAgICAgcG9zaXRpb25zW2lkeCAqIDM2ICsgNF0gPSBsZWZ0VG9wWTtcbiAgICAgICAgcG9zaXRpb25zW2lkeCAqIDM2ICsgNV0gPSBsZWZ0VG9wWjtcblxuICAgICAgICBwb3NpdGlvbnNbaWR4ICogMzYgKyA2XSA9IHJpZ2h0VG9wWDtcbiAgICAgICAgcG9zaXRpb25zW2lkeCAqIDM2ICsgN10gPSByaWdodFRvcFk7XG4gICAgICAgIHBvc2l0aW9uc1tpZHggKiAzNiArIDhdID0gcmlnaHRUb3BaO1xuXG4gICAgICAgIC8vcmlnaHQgdHJpYW5nbGVcbiAgICAgICAgcG9zaXRpb25zW2lkeCAqIDM2ICsgOV0gPSBjZW50ZXJYO1xuICAgICAgICBwb3NpdGlvbnNbaWR4ICogMzYgKyAxMF0gPSBjZW50ZXJZO1xuICAgICAgICBwb3NpdGlvbnNbaWR4ICogMzYgKyAxMV0gPSBjZW50ZXJaO1xuXG4gICAgICAgIHBvc2l0aW9uc1tpZHggKiAzNiArIDEyXSA9IHJpZ2h0VG9wWDtcbiAgICAgICAgcG9zaXRpb25zW2lkeCAqIDM2ICsgMTNdID0gcmlnaHRUb3BZO1xuICAgICAgICBwb3NpdGlvbnNbaWR4ICogMzYgKyAxNF0gPSByaWdodFRvcFo7XG5cbiAgICAgICAgcG9zaXRpb25zW2lkeCAqIDM2ICsgMTVdID0gcmlnaHRCb3R0b21YO1xuICAgICAgICBwb3NpdGlvbnNbaWR4ICogMzYgKyAxNl0gPSByaWdodEJvdHRvbVk7XG4gICAgICAgIHBvc2l0aW9uc1tpZHggKiAzNiArIDE3XSA9IHJpZ2h0Qm90dG9tWjtcblxuICAgICAgICAvL2JvdHRvbSB0cmlhbmdsZVxuICAgICAgICBwb3NpdGlvbnNbaWR4ICogMzYgKyAxOF0gPSBjZW50ZXJYO1xuICAgICAgICBwb3NpdGlvbnNbaWR4ICogMzYgKyAxOV0gPSBjZW50ZXJZO1xuICAgICAgICBwb3NpdGlvbnNbaWR4ICogMzYgKyAyMF0gPSBjZW50ZXJaO1xuXG4gICAgICAgIHBvc2l0aW9uc1tpZHggKiAzNiArIDIxXSA9IHJpZ2h0Qm90dG9tWDtcbiAgICAgICAgcG9zaXRpb25zW2lkeCAqIDM2ICsgMjJdID0gcmlnaHRCb3R0b21ZO1xuICAgICAgICBwb3NpdGlvbnNbaWR4ICogMzYgKyAyM10gPSByaWdodEJvdHRvbVo7XG5cbiAgICAgICAgcG9zaXRpb25zW2lkeCAqIDM2ICsgMjRdID0gbGVmdEJvdHRvbVg7XG4gICAgICAgIHBvc2l0aW9uc1tpZHggKiAzNiArIDI1XSA9IGxlZnRCb3R0b21ZO1xuICAgICAgICBwb3NpdGlvbnNbaWR4ICogMzYgKyAyNl0gPSBsZWZ0Qm90dG9tWjtcblxuICAgICAgICAvLyBsZWZ0IHRyaWFuZ2xlXG4gICAgICAgIHBvc2l0aW9uc1tpZHggKiAzNiArIDI3XSA9IGNlbnRlclg7XG4gICAgICAgIHBvc2l0aW9uc1tpZHggKiAzNiArIDI4XSA9IGNlbnRlclk7XG4gICAgICAgIHBvc2l0aW9uc1tpZHggKiAzNiArIDI5XSA9IGNlbnRlclo7XG5cbiAgICAgICAgcG9zaXRpb25zW2lkeCAqIDM2ICsgMzBdID0gbGVmdFRvcFg7XG4gICAgICAgIHBvc2l0aW9uc1tpZHggKiAzNiArIDMxXSA9IGxlZnRUb3BZO1xuICAgICAgICBwb3NpdGlvbnNbaWR4ICogMzYgKyAzMl0gPSBsZWZ0VG9wWjtcblxuICAgICAgICBwb3NpdGlvbnNbaWR4ICogMzYgKyAzM10gPSBsZWZ0Qm90dG9tWDtcbiAgICAgICAgcG9zaXRpb25zW2lkeCAqIDM2ICsgMzRdID0gbGVmdEJvdHRvbVk7XG4gICAgICAgIHBvc2l0aW9uc1tpZHggKiAzNiArIDM1XSA9IGxlZnRCb3R0b21aO1xuXG5cbiAgICB9XG59XG5cbmxldCBjYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbGVudGljdWxhcicpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xubGV0IHZpZGVvMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzb3VyY2UxJykgYXMgSFRNTFZpZGVvRWxlbWVudDtcbmxldCB2aWRlbzIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc291cmNlMicpIGFzIEhUTUxWaWRlb0VsZW1lbnQ7XG5cbnNldFRpbWVvdXQoKCk9PntcblxuY2FudmFzLndpZHRoID0gODAwO1xuY2FudmFzLmhlaWdodCA9IDcwMDtcblxubGV0IGdsID0gY2FudmFzLmdldENvbnRleHQoJ3dlYmdsMicpO1xuXG5sZXQgcHJvZ3JhbSA9IGNyZWF0ZVByb2dyYW0oXG4gICAgZ2wsXG4gICAgY3JlYXRlU2hhZGVyKGdsLCBnbC5WRVJURVhfU0hBREVSLCBsZW5WZXJ0KSxcbiAgICBjcmVhdGVTaGFkZXIoZ2wsIGdsLkZSQUdNRU5UX1NIQURFUiwgbGVuRnJhZylcbik7XG5cbmdsLmVuYWJsZShnbC5ERVBUSF9URVNUKTtcblxuZ2wudXNlUHJvZ3JhbShwcm9ncmFtKTtcblxuZ2wudmlld3BvcnQoMCAsIDAsICBjYW52YXMud2lkdGggLCBjYW52YXMuaGVpZ2h0KTtcblxuY29uc3QgcG9zaXRpb24xID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0sICd1X3ZpZGVvMScpO1xuY29uc3QgcG9zaXRpb24yID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0sICd1X3ZpZGVvMicpO1xuZ2wudW5pZm9ybTFpKHBvc2l0aW9uMSwgMCk7XG5nbC51bmlmb3JtMWkocG9zaXRpb24yLCAxKTtcblxuKGdsIGFzIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgJiB7IE1vdXNlUG9zaXRpb24/OldlYkdMVW5pZm9ybUxvY2F0aW9ufSkuTW91c2VQb3NpdGlvbiA9ICBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgJ3VfbW91c2UnKVxuXG5cbmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZSk9PntcbiAgIGdsLnVuaWZvcm0yZnYoIChnbCBhcyBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ICYgeyBNb3VzZVBvc2l0aW9uPzpXZWJHTFVuaWZvcm1Mb2NhdGlvbn0pLk1vdXNlUG9zaXRpb24sIFtlLm9mZnNldFggLyBjYW52YXMuY2xpZW50V2lkdGggLSAuNSwgLSBlLm9mZnNldFkgLyBjYW52YXMuY2xpZW50SGVpZ2h0ICsgLjVdKTtcbiAgIGNvbnNvbGUubG9nKCd1X21vdXNlJyxlLm9mZnNldFggLyBjYW52YXMuY2xpZW50V2lkdGggLSAuNSwgLSBlLm9mZnNldFkgLyBjYW52YXMuY2xpZW50SGVpZ2h0ICsgLjUpO1xufSk7XG5cbi8vIHZpZGVvIDFcbmdsLmFjdGl2ZVRleHR1cmUoIGdsLlRFWFRVUkUwKTtcbmNvbnN0IHZpZGVvVGV4MSA9IGdsLmNyZWF0ZVRleHR1cmUoKTtcbmdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHZpZGVvVGV4MSk7XG5nbC5waXhlbFN0b3JlaShnbC5VTlBBQ0tfRkxJUF9ZX1dFQkdMICwgdHJ1ZSk7XG5cbmdsLnRleEltYWdlMkQoXG4gICAgZ2wuVEVYVFVSRV8yRCAsIFxuICAgIDAgLCBcbiAgICBnbC5SR0JBLCBcbiAgICB2aWRlbzEudmlkZW9XaWR0aCxcbiAgICB2aWRlbzEudmlkZW9IZWlnaHQsXG4gICAgMCxcbiAgICBnbC5SR0JBLFxuICAgIGdsLlVOU0lHTkVEX0JZVEUsXG4gICAgdmlkZW8xXG4pO1xuXG5nbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgZ2wuTElORUFSKTtcbmdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5MSU5FQVIpO1xuZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfUywgZ2wuQ0xBTVBfVE9fRURHRSk7XG5nbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9ULCBnbC5DTEFNUF9UT19FREdFKTtcblxuLy8gdmlkZW8gMlxuZ2wuYWN0aXZlVGV4dHVyZSggZ2wuVEVYVFVSRTEpO1xuY29uc3QgdmlkZW9UZXgyID0gZ2wuY3JlYXRlVGV4dHVyZSgpO1xuZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdmlkZW9UZXgyKTtcbmdsLnBpeGVsU3RvcmVpKGdsLlVOUEFDS19GTElQX1lfV0VCR0wgLCB0cnVlKTtcblxuZ2wudGV4SW1hZ2UyRChcbiAgICBnbC5URVhUVVJFXzJEICwgXG4gICAgMCAsIFxuICAgIGdsLlJHQkEsIFxuICAgIHZpZGVvMi52aWRlb1dpZHRoLFxuICAgIHZpZGVvMi52aWRlb0hlaWdodCxcbiAgICAwLFxuICAgIGdsLlJHQkEsXG4gICAgZ2wuVU5TSUdORURfQllURSxcbiAgICB2aWRlbzJcbik7XG5cbmdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5MSU5FQVIpO1xuZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLkxJTkVBUik7XG5nbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9TLCBnbC5DTEFNUF9UT19FREdFKTtcbmdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1QsIGdsLkNMQU1QX1RPX0VER0UpO1xuXG5jb25zdCBwb3NpdGlvbkF0dHJpYnV0ZUxvY2F0aW9uID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbSAsICdhX3Bvc2l0aW9uJyk7XG5cbmNvbnN0IHBvc2l0aW9uVW5pZlJlc29sdXRpb24gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSAsICd1X3Jlc29sdXRpb24nKTtcbmdsLnVuaWZvcm0yZiggcG9zaXRpb25VbmlmUmVzb2x1dGlvbiAsIGNhbnZhcy53aWR0aCAsIGNhbnZhcy5oZWlnaHQgKTtcblxuXG5jb25zdCBwb3NpdGlvbmJ1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIgLCBwb3NpdGlvbmJ1ZmZlcik7XG5cbmNvbnN0IHZhbyA9IGdsLmNyZWF0ZVZlcnRleEFycmF5KCk7XG5nbC5iaW5kVmVydGV4QXJyYXkodmFvKTtcblxuZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkocG9zaXRpb25BdHRyaWJ1dGVMb2NhdGlvbik7XG5cbmNvbnN0IHNpemUgPSAzO1xuY29uc3QgdHlwZSA9IGdsLkZMT0FUO1xuY29uc3Qgbm9ybWFsaXplID0gZmFsc2U7XG5jb25zdCBzdHJpZGUgPSAwO1xuY29uc3Qgb2Zmc2V0ID0gMDtcblxuZ2wudmVydGV4QXR0cmliUG9pbnRlcihwb3NpdGlvbkF0dHJpYnV0ZUxvY2F0aW9uICwgc2l6ZSAsIHR5cGUgLCBub3JtYWxpemUgLCBzdHJpZGUgLCBvZmZzZXQpO1xuXG5nbC5iaW5kVmVydGV4QXJyYXkodmFvKTtcblxuXG4vLyBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiAsIG5ldyBGbG9hdDMyQXJyYXkoW1xuLy8gICAgIDAsIDAsMSxcbi8vICAgICAwLCAxLDEsXG4vLyAgICAgMSwgMCwxLFxuLy8gICAgIDEsIDAsMSxcbi8vICAgICAwLCAxLDEsXG4vLyAgICAgMSwgMSwgMV0pLCBnbC5TVEFUSUNfRFJBVyk7XG5nbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiAscG9zaXRpb25zICxnbC5TVEFUSUNfRFJBVyk7XG5cblxuY29uc3QgcHJpbWl0aXZlVHlwZSA9IGdsLlRSSUFOR0xFUztcbmNvbnN0IGRvZmZzZXQgPSAwO1xuY29uc3QgY291bnQgPSByb3cgKiBjb2wgKiA0ICogMztcbi8vIGNvbnN0IGNvdW50ID0gMiogMztcbmdsLmRyYXdBcnJheXMocHJpbWl0aXZlVHlwZSwgZG9mZnNldCwgY291bnQpO1xuXG5cbmZ1bmN0aW9uIHRpY2soKXtcbiAgICBnbC5hY3RpdmVUZXh0dXJlKCBnbC5URVhUVVJFMCk7XG4gICAgZ2wudGV4SW1hZ2UyRChcbiAgICAgICAgZ2wuVEVYVFVSRV8yRCAsIFxuICAgICAgICAwICwgXG4gICAgICAgIGdsLlJHQkEsIFxuICAgICAgICB2aWRlbzEudmlkZW9XaWR0aCxcbiAgICAgICAgdmlkZW8xLnZpZGVvSGVpZ2h0LFxuICAgICAgICAwLFxuICAgICAgICBnbC5SR0JBLFxuICAgICAgICBnbC5VTlNJR05FRF9CWVRFLFxuICAgICAgICB2aWRlbzFcbiAgICApO1xuICAgIGdsLmFjdGl2ZVRleHR1cmUoIGdsLlRFWFRVUkUxKTtcbiAgICBnbC50ZXhJbWFnZTJEKFxuICAgICAgICBnbC5URVhUVVJFXzJEICwgXG4gICAgICAgIDAgLCBcbiAgICAgICAgZ2wuUkdCQSwgXG4gICAgICAgIHZpZGVvMi52aWRlb1dpZHRoLFxuICAgICAgICB2aWRlbzIudmlkZW9IZWlnaHQsXG4gICAgICAgIDAsXG4gICAgICAgIGdsLlJHQkEsXG4gICAgICAgIGdsLlVOU0lHTkVEX0JZVEUsXG4gICAgICAgIHZpZGVvMlxuICAgICk7XG5cbiAgICBjb25zdCBwcmltaXRpdmVUeXBlID0gZ2wuVFJJQU5HTEVTO1xuICAgIGNvbnN0IGRvZmZzZXQgPSAwO1xuICAgIGNvbnN0IGNvdW50ID0gcm93ICogY29sICogNCAqIDM7XG4gICAgLy8gY29uc3QgY291bnQgPSAyKiAzO1xuICAgIGdsLmRyYXdBcnJheXMocHJpbWl0aXZlVHlwZSwgZG9mZnNldCwgY291bnQpO1xuICAgIC8vIGNvbnNvbGUubG9nKCd0aWNrJyk7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRpY2spO1xufVxuXG50aWNrKCk7XG5cbn0sMjAwMCk7IiwiZXhwb3J0IGRlZmF1bHQgXCIjdmVyc2lvbiAzMDAgZXMgLyogRWFzaW5nIFNpbmUgSW4gZXF1YXRpb24gKi9cXG5cXG5wcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcXG5cXG5pbiB2ZWMyICB2X3RleHR1cmVQb3NpdGlvbjtcXG5pbiBmbG9hdCBvcmRlcjtcXG5vdXQgdmVjNCAgb3V0Q29sb3IgO1xcblxcbnVuaWZvcm0gc2FtcGxlcjJEIHVfdmlkZW8xO1xcbnVuaWZvcm0gc2FtcGxlcjJEIHVfdmlkZW8yO1xcblxcblxcbi8qIEFkYXB0ZWQgZnJvbSBSb2JlcnQgUGVubmVyIGVhc2luZyBlcXVhdGlvbnMgKi9cXG4jZGVmaW5lIFBJX1RXT1xcdFxcdFxcdDEuNTcwNzk2MzI2Nzk0ODk3XFxuXFxuXFxuXFxuXFxudm9pZCBtYWluICgpe1xcbiAgICB2ZWM0IGNvbG9yICA9IHRleHR1cmUodV92aWRlbzEgLCB2X3RleHR1cmVQb3NpdGlvbik7XFxuXFxuICAgIGlmKG9yZGVyIDw9IDEuKXtcXG4gICAgICAgIGNvbG9yICA9IHRleHR1cmUodV92aWRlbzIgLCB2X3RleHR1cmVQb3NpdGlvbik7XFxuICAgIH1lbHNlIHtcXG4gICAgICAgIGNvbG9yICA9IHRleHR1cmUodV92aWRlbzEgLCB2X3RleHR1cmVQb3NpdGlvbik7XFxuICAgIH1cXG5cXG4gICAgb3V0Q29sb3IgPWNvbG9yO1xcblxcbn1cXG5cIjsiLCJleHBvcnQgZGVmYXVsdCBcIiN2ZXJzaW9uIDMwMCBlc1xcblxcbmluIHZlYzMgYV9wb3NpdGlvbiA7IFxcbm91dCB2ZWMyIHZfdGV4dHVyZVBvc2l0aW9uO1xcblxcbnVuaWZvcm0gdmVjMiB1X3Jlc29sdXRpb247XFxudW5pZm9ybSB2ZWMyIHVfbW91c2U7XFxuLy8gdW5pZm9ybSBmbG9hdCBpVGltZTtcXG4vLyB1bmlmb3JtIHZlYzIgdV90ZXh0dXJlU2l6ZTtcXG4vLyBvdXQgZmxvYXQgdGltZTtcXG5vdXQgdmVjMiByZXNvbHV0aW9uO1xcbm91dCBmbG9hdCBvcmRlcjtcXG4vLyBvdXQgaW50IGltYWdlSWR4O1xcbi8vIG91dCB2ZWMyIG1vdXNlO1xcbi8vIG91dCB2ZWMyIHRleHR1cmVzaXplO1xcblxcbi8qIFxcbmNwIDogY2FtZXJhIHBvc3Rpb25cXG5sYSA6IGxvb2sgYXQgXFxudmQgOiBvcmlnaW4gcG9zaXRpb24gXFxuKi9cXG52ZWMzIGdldFRyYW5zZm9ybWVkUG9zaXRpb24odmVjMyBjcCAsIHZlYzMgbGEgLCB2ZWMzIHZkKSB7XFxuICAgIFxcblxcbiAgICB2ZWMzIHd3ID0gbm9ybWFsaXplKCBsYSAtIGNwICk7XFxuICAgIHZlYzMgdXUgPSBub3JtYWxpemUoIGNyb3NzKHZlYzMoMC4gLCAxLiAsIDAuKSAsIHd3ICApICk7XFxuICAgIHZlYzMgdnYgPSBub3JtYWxpemUoIGNyb3NzKHd3ICwgdXUgKSApO1xcblxcbiAgICBtYXQzIGNhbWVyYVRyYW5zZm9ybSA9IG1hdDModXUsIHZ2LCB3dyk7XFxuXFxuICAgIHJldHVybiBjYW1lcmFUcmFuc2Zvcm0gKiAgdmQgIDtcXG59XFxuXFxudm9pZCBtYWluKCl7XFxuICAgIHZlYzMgcG9zaXRpb24gPSB2ZWMzKGFfcG9zaXRpb24ueCoyLiAtIDEuLCBhX3Bvc2l0aW9uLnkqMi4gLSAxLiwgYV9wb3NpdGlvbi56KTtcXG4gICAgLy8g5Lya6YCg5oiQ5b2i5Y+YXFxuICAgIC8vIGdsX1Bvc2l0aW9uID0gdmVjNChnZXRUcmFuc2Zvcm1lZFBvc2l0aW9uKHZlYzModV9tb3VzZSoyLiwxLiksIHZlYzMoMC4sMC4sMC4pLCBwb3NpdGlvbiksIDEuKTtcXG5cXG4gICAgLy8g5peg5b2i5Y+YXFxuICAgIGlmKCBhX3Bvc2l0aW9uLnogIT0gMC4gKXtcXG4gICAgICAgIGdsX1Bvc2l0aW9uID0gdmVjNCggcG9zaXRpb24ueHkgKyAodV9tb3VzZS54eSkqLjAyLCBwb3NpdGlvbi56LCAxLik7XFxuICAgIH1cXG4gICAgZWxzZSB7XFxuICAgICAgICBnbF9Qb3NpdGlvbiA9IHZlYzQocG9zaXRpb24sIDEuKTtcXG4gICAgfVxcblxcbiAgICB2X3RleHR1cmVQb3NpdGlvbiA9IGFfcG9zaXRpb24ueHkgIDtcXG5cXG4gICAgcmVzb2x1dGlvbiA9IHVfcmVzb2x1dGlvbjtcXG5cXG4gICAgZmxvYXQgaWR4ID0gbW9kKGZsb2F0KGdsX1ZlcnRleElEKSwgMTIuKTtcXG4gICAgaWR4ID0gZmxvb3IoaWR4IC8gMy4pO1xcbiAgICBvcmRlciA9IGlkeDtcXG5cXG4gICAgXFxuXFxufVwiOyIsImV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTaGFkZXIoZ2w6IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQsIHR5cGU6IG51bWJlciwgc291cmNlOiBzdHJpbmcpOiBXZWJHTFNoYWRlciB8IG51bGwge1xuICAgIGNvbnN0IHNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcih0eXBlKTtcbiAgICBpZiAoIXNoYWRlcikgcmV0dXJuIG51bGw7XG4gICAgZ2wuc2hhZGVyU291cmNlKHNoYWRlciwgc291cmNlKTtcbiAgICBnbC5jb21waWxlU2hhZGVyKHNoYWRlcik7XG4gIFxuICAgIGNvbnN0IHN1Y2Nlc3MgPSBnbC5nZXRTaGFkZXJQYXJhbWV0ZXIoc2hhZGVyLCBnbC5DT01QSUxFX1NUQVRVUyk7XG4gICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgIHJldHVybiBzaGFkZXI7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKHR5cGUgPT0gZ2wuRlJBR01FTlRfU0hBREVSID8gJ2ZyYWcnIDogJ3ZlcnQnLCBnbC5nZXRTaGFkZXJJbmZvTG9nKHNoYWRlcikpO1xuICAgIGdsLmRlbGV0ZVNoYWRlcihzaGFkZXIpO1xuICAgIHJldHVybiBzaGFkZXI7XG4gIH1cbiAgXG4gIGV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQcm9ncmFtKFxuICAgIGdsOiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0LFxuICAgIHZlcnRleFNoYWRlcjogV2ViR0xTaGFkZXIgfCBudWxsLFxuICAgIGZyYWdtZW50U2hhZGVyOiBXZWJHTFNoYWRlciB8IG51bGxcbiAgKTogV2ViR0xTaGFkZXIgfCBudWxsIHtcbiAgICBjb25zdCBwcm9ncmFtID0gZ2wuY3JlYXRlUHJvZ3JhbSgpO1xuICAgIGlmICghcHJvZ3JhbSB8fCAhdmVydGV4U2hhZGVyIHx8ICFmcmFnbWVudFNoYWRlcikgcmV0dXJuIG51bGw7XG4gICAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIHZlcnRleFNoYWRlcik7XG4gICAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIGZyYWdtZW50U2hhZGVyKTtcbiAgXG4gICAgZ2wubGlua1Byb2dyYW0ocHJvZ3JhbSk7XG4gIFxuICAgIGNvbnN0IHN1Y2Nlc3MgPSBnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHByb2dyYW0sIGdsLkxJTktfU1RBVFVTKTtcbiAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgcmV0dXJuIHByb2dyYW07XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGdsLmdldFByb2dyYW1JbmZvTG9nKHByb2dyYW0pKTtcbiAgICBnbC5kZWxldGVQcm9ncmFtKHByb2dyYW0pO1xuICAgIHJldHVybiBwcm9ncmFtO1xuICB9XG5cbiBcbiAgXG4gIGV4cG9ydCBkZWZhdWx0IHtcbiAgICBjcmVhdGVQcm9ncmFtLFxuICAgIGNyZWF0ZVNoYWRlcixcbiAgfTtcbiAgIl0sInNvdXJjZVJvb3QiOiIifQ==