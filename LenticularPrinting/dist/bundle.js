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
    gl.useProgram(program);
    gl.viewport(0, 0, canvas.width, canvas.height);
    var position1 = gl.getUniformLocation(program, 'u_video1');
    var position2 = gl.getUniformLocation(program, 'u_video2');
    gl.uniform1i(position1, 0);
    gl.uniform1i(position2, 1);
    gl.MousePosition = gl.getUniformLocation(program, 'u_mouse');
    canvas.addEventListener('mousemove', function (e) {
        gl.uniform2fv(gl.MousePosition, [e.offsetX / canvas.clientWidth - .5, -e.offsetY / canvas.clientHeight + .5]);
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
/* harmony default export */ __webpack_exports__["default"] = ("#version 300 es /* Easing Sine In equation */\n\nprecision mediump float;\n\nin vec2  v_texturePosition;\nin float order;\nout vec4  outColor ;\n\nuniform sampler2D u_video1;\nuniform sampler2D u_video2;\n\n\n/* Adapted from Robert Penner easing equations */\n#define PI_TWO\t\t\t1.570796326794897\n\n\n\n\nvoid main (){\n    vec4 color  = texture(u_video1 , v_texturePosition);\n\n    if(order <= 1.3){\n        color  = texture(u_video1 , v_texturePosition);\n    }else {\n        color  = texture(u_video2 , v_texturePosition);\n    }\n\n    outColor =color;\n\n}\n");

/***/ }),

/***/ "./shader/lenticular.vert":
/*!********************************!*\
  !*** ./shader/lenticular.vert ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("#version 300 es\n\nin vec3 a_position ; \nout vec2 v_texturePosition;\n\nuniform vec2 u_resolution;\nuniform vec2 u_mouse;\n// uniform float iTime;\n// uniform vec2 u_textureSize;\n// out float time;\nout vec2 resolution;\nout float order;\n// out int imageIdx;\n// out vec2 mouse;\n// out vec2 texturesize;\n\n/* \ncp : camera postion\nla : look at \nvd : origin position \n*/\nvec3 getTransformedPosition(vec3 cp , vec3 la , vec3 vd) {\n    \n\n    vec3 ww = normalize( la - cp );\n    vec3 uu = normalize( cross(vec3(0. , 1. , 0.) , ww  ) );\n    vec3 vv = normalize( cross(ww , uu ) );\n\n    mat3 cameraTransform = mat3(uu, vv, ww);\n\n    return cameraTransform *  vd  ;\n}\n\nvoid main(){\n    vec3 position = vec3(1. - a_position.x*2., a_position.y*2. - 1., a_position.z);\n    // gl_Position = vec4(getTransformedPosition(vec3(u_mouse*2.,1.), vec3(0.,0.,0.), position), 1.);\n\n    if( a_position.z != 0. ){\n        gl_Position = vec4( position.xy + (u_mouse.xy)*.02, position.z, 1.);\n    }\n    else {\n        gl_Position = vec4(position, 1.);\n    }\n\n    v_texturePosition = a_position.xy  ;\n\n    resolution = u_resolution;\n\n    float idx = mod(float(gl_VertexID), 12.);\n    idx = floor(idx / 3.);\n    order = idx;\n\n    \n\n}");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc2hhZGVyL2xlbnRpY3VsYXIuZnJhZyIsIndlYnBhY2s6Ly8vLi9zaGFkZXIvbGVudGljdWxhci52ZXJ0Iiwid2VicGFjazovLy8uL3V0aWwvd2ViZ2wyVXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQWdFO0FBRWpCO0FBQ0E7QUFDL0MsSUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQ2hCLElBQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUNoQixJQUFNLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQztBQUNuQixJQUFJLFNBQVMsR0FBRyxJQUFJLFlBQVksQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDeEQsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUcsQ0FBQyxHQUFJLEdBQUcsRUFBRyxDQUFDLEVBQUUsRUFBQztJQUN6QixLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRyxDQUFDLEdBQUcsR0FBRyxFQUFHLENBQUMsRUFBRSxFQUFDO1FBQ3hCLElBQUksR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLElBQUksT0FBTyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUU7UUFDdkIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUN0QixJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFFcEIsSUFBSSxRQUFRLEdBQUcsT0FBTyxHQUFHLEVBQUUsR0FBQyxHQUFHLENBQUM7UUFDaEMsSUFBSSxRQUFRLEdBQUcsT0FBTyxHQUFHLEVBQUUsR0FBQyxHQUFHLENBQUM7UUFDaEMsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBRWpCLElBQUksU0FBUyxHQUFHLE9BQU8sR0FBRyxFQUFFLEdBQUMsR0FBRyxDQUFDO1FBQ2pDLElBQUksU0FBUyxHQUFHLE9BQU8sR0FBRyxFQUFFLEdBQUMsR0FBRyxDQUFDO1FBQ2pDLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQztRQUVsQixJQUFJLFlBQVksR0FBRyxPQUFPLEdBQUcsRUFBRSxHQUFDLEdBQUcsQ0FBQztRQUNwQyxJQUFJLFlBQVksR0FBRyxPQUFPLEdBQUcsRUFBRSxHQUFDLEdBQUcsQ0FBQztRQUNwQyxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7UUFFckIsSUFBSSxXQUFXLEdBQUcsT0FBTyxHQUFHLEVBQUUsR0FBQyxHQUFHLENBQUM7UUFDbkMsSUFBSSxXQUFXLEdBQUcsT0FBTyxHQUFHLEVBQUUsR0FBQyxHQUFHLENBQUM7UUFDbkMsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBRXBCLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUcsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUV0RSxTQUFTLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQztRQUM5QixTQUFTLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUM7UUFDbEMsU0FBUyxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDO1FBRWxDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQztRQUNuQyxTQUFTLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUM7UUFDbkMsU0FBUyxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDO1FBRW5DLFNBQVMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQztRQUNwQyxTQUFTLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUM7UUFDcEMsU0FBUyxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDO1FBR3BDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQztRQUNsQyxTQUFTLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUM7UUFDbkMsU0FBUyxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDO1FBRW5DLFNBQVMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQztRQUNyQyxTQUFTLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxTQUFTLENB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QUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNoRSxJQUFJLE9BQU8sRUFBRTtRQUNYLE9BQU8sT0FBTyxDQUFDO0tBQ2hCO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUMzQyxFQUFFLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzFCLE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUM7QUFJYztJQUNiLGFBQWE7SUFDYixZQUFZO0NBQ2IsRUFBQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IHsgY3JlYXRlU2hhZGVyLCBjcmVhdGVQcm9ncmFtIH0gZnJvbSAnLi91dGlsL3dlYmdsMlV0aWwnO1xuXG5pbXBvcnQgbGVuRnJhZyBmcm9tICcuL3NoYWRlci9sZW50aWN1bGFyLmZyYWcnO1xuaW1wb3J0IGxlblZlcnQgZnJvbSAnLi9zaGFkZXIvbGVudGljdWxhci52ZXJ0JztcbmNvbnN0IHJvdyA9IDMwMDtcbmNvbnN0IGNvbCA9IDMwMDtcbmNvbnN0IGRlcHRoID0gLS4wNTtcbmxldCBwb3NpdGlvbnMgPSBuZXcgRmxvYXQzMkFycmF5KHJvdyAqIGNvbCAqIDQgKiAzICogMyk7XG5mb3IobGV0IGk9MCA7IGkgPCAgY29sIDsgaSsrKXtcbiAgICBmb3IobGV0IGo9MCA7IGogPCByb3cgOyBqKyspe1xuICAgICAgICBsZXQgaWR4ID0gaiAqIGNvbCArIGk7XG4gICAgICAgIGxldCBjZW50ZXJYID0gaSAvIGNvbCA7XG4gICAgICAgIGxldCBjZW50ZXJZID0gaiAvIHJvdztcbiAgICAgICAgbGV0IGNlbnRlclogPSBkZXB0aDtcblxuICAgICAgICBsZXQgbGVmdFRvcFggPSBjZW50ZXJYIC0gLjUvY29sO1xuICAgICAgICBsZXQgbGVmdFRvcFkgPSBjZW50ZXJZIC0gLjUvcm93O1xuICAgICAgICBsZXQgbGVmdFRvcFogPSAwO1xuXG4gICAgICAgIGxldCByaWdodFRvcFggPSBjZW50ZXJYICsgLjUvY29sO1xuICAgICAgICBsZXQgcmlnaHRUb3BZID0gY2VudGVyWSAtIC41L3JvdztcbiAgICAgICAgbGV0IHJpZ2h0VG9wWiA9IDA7XG5cbiAgICAgICAgbGV0IHJpZ2h0Qm90dG9tWCA9IGNlbnRlclggKyAuNS9jb2w7XG4gICAgICAgIGxldCByaWdodEJvdHRvbVkgPSBjZW50ZXJZICsgLjUvcm93O1xuICAgICAgICBsZXQgcmlnaHRCb3R0b21aID0gMDtcblxuICAgICAgICBsZXQgbGVmdEJvdHRvbVggPSBjZW50ZXJYIC0gLjUvY29sO1xuICAgICAgICBsZXQgbGVmdEJvdHRvbVkgPSBjZW50ZXJZICsgLjUvcm93O1xuICAgICAgICBsZXQgbGVmdEJvdHRvbVogPSAwO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGNlbnRlclgsIGNlbnRlclksIGNlbnRlclogLCBsZWZ0VG9wWCwgbGVmdFRvcFksIGxlZnRUb3BaKTtcbiAgICAgICAgLy90b3AgdHJpYW5nbGVcbiAgICAgICAgcG9zaXRpb25zW2lkeCAqIDM2XSA9IGNlbnRlclg7XG4gICAgICAgIHBvc2l0aW9uc1tpZHggKiAzNiArIDFdID0gY2VudGVyWTtcbiAgICAgICAgcG9zaXRpb25zW2lkeCAqIDM2ICsgMl0gPSBjZW50ZXJaO1xuXG4gICAgICAgIHBvc2l0aW9uc1tpZHggKiAzNiArIDNdID0gbGVmdFRvcFg7XG4gICAgICAgIHBvc2l0aW9uc1tpZHggKiAzNiArIDRdID0gbGVmdFRvcFk7XG4gICAgICAgIHBvc2l0aW9uc1tpZHggKiAzNiArIDVdID0gbGVmdFRvcFo7XG5cbiAgICAgICAgcG9zaXRpb25zW2lkeCAqIDM2ICsgNl0gPSByaWdodFRvcFg7XG4gICAgICAgIHBvc2l0aW9uc1tpZHggKiAzNiArIDddID0gcmlnaHRUb3BZO1xuICAgICAgICBwb3NpdGlvbnNbaWR4ICogMzYgKyA4XSA9IHJpZ2h0VG9wWjtcblxuICAgICAgICAvL3JpZ2h0IHRyaWFuZ2xlXG4gICAgICAgIHBvc2l0aW9uc1tpZHggKiAzNiArIDldID0gY2VudGVyWDtcbiAgICAgICAgcG9zaXRpb25zW2lkeCAqIDM2ICsgMTBdID0gY2VudGVyWTtcbiAgICAgICAgcG9zaXRpb25zW2lkeCAqIDM2ICsgMTFdID0gY2VudGVyWjtcblxuICAgICAgICBwb3NpdGlvbnNbaWR4ICogMzYgKyAxMl0gPSByaWdodFRvcFg7XG4gICAgICAgIHBvc2l0aW9uc1tpZHggKiAzNiArIDEzXSA9IHJpZ2h0VG9wWTtcbiAgICAgICAgcG9zaXRpb25zW2lkeCAqIDM2ICsgMTRdID0gcmlnaHRUb3BaO1xuXG4gICAgICAgIHBvc2l0aW9uc1tpZHggKiAzNiArIDE1XSA9IHJpZ2h0Qm90dG9tWDtcbiAgICAgICAgcG9zaXRpb25zW2lkeCAqIDM2ICsgMTZdID0gcmlnaHRCb3R0b21ZO1xuICAgICAgICBwb3NpdGlvbnNbaWR4ICogMzYgKyAxN10gPSByaWdodEJvdHRvbVo7XG5cbiAgICAgICAgLy9ib3R0b20gdHJpYW5nbGVcbiAgICAgICAgcG9zaXRpb25zW2lkeCAqIDM2ICsgMThdID0gY2VudGVyWDtcbiAgICAgICAgcG9zaXRpb25zW2lkeCAqIDM2ICsgMTldID0gY2VudGVyWTtcbiAgICAgICAgcG9zaXRpb25zW2lkeCAqIDM2ICsgMjBdID0gY2VudGVyWjtcblxuICAgICAgICBwb3NpdGlvbnNbaWR4ICogMzYgKyAyMV0gPSByaWdodEJvdHRvbVg7XG4gICAgICAgIHBvc2l0aW9uc1tpZHggKiAzNiArIDIyXSA9IHJpZ2h0Qm90dG9tWTtcbiAgICAgICAgcG9zaXRpb25zW2lkeCAqIDM2ICsgMjNdID0gcmlnaHRCb3R0b21aO1xuXG4gICAgICAgIHBvc2l0aW9uc1tpZHggKiAzNiArIDI0XSA9IGxlZnRCb3R0b21YO1xuICAgICAgICBwb3NpdGlvbnNbaWR4ICogMzYgKyAyNV0gPSBsZWZ0Qm90dG9tWTtcbiAgICAgICAgcG9zaXRpb25zW2lkeCAqIDM2ICsgMjZdID0gbGVmdEJvdHRvbVo7XG5cbiAgICAgICAgLy8gbGVmdCB0cmlhbmdsZVxuICAgICAgICBwb3NpdGlvbnNbaWR4ICogMzYgKyAyN10gPSBjZW50ZXJYO1xuICAgICAgICBwb3NpdGlvbnNbaWR4ICogMzYgKyAyOF0gPSBjZW50ZXJZO1xuICAgICAgICBwb3NpdGlvbnNbaWR4ICogMzYgKyAyOV0gPSBjZW50ZXJaO1xuXG4gICAgICAgIHBvc2l0aW9uc1tpZHggKiAzNiArIDMwXSA9IGxlZnRUb3BYO1xuICAgICAgICBwb3NpdGlvbnNbaWR4ICogMzYgKyAzMV0gPSBsZWZ0VG9wWTtcbiAgICAgICAgcG9zaXRpb25zW2lkeCAqIDM2ICsgMzJdID0gbGVmdFRvcFo7XG5cbiAgICAgICAgcG9zaXRpb25zW2lkeCAqIDM2ICsgMzNdID0gbGVmdEJvdHRvbVg7XG4gICAgICAgIHBvc2l0aW9uc1tpZHggKiAzNiArIDM0XSA9IGxlZnRCb3R0b21ZO1xuICAgICAgICBwb3NpdGlvbnNbaWR4ICogMzYgKyAzNV0gPSBsZWZ0Qm90dG9tWjtcblxuXG4gICAgfVxufVxuXG5sZXQgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xlbnRpY3VsYXInKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbmxldCB2aWRlbzEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc291cmNlMScpIGFzIEhUTUxWaWRlb0VsZW1lbnQ7XG5sZXQgdmlkZW8yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NvdXJjZTInKSBhcyBIVE1MVmlkZW9FbGVtZW50O1xuXG5zZXRUaW1lb3V0KCgpPT57XG5cbmNhbnZhcy53aWR0aCA9IDgwMDtcbmNhbnZhcy5oZWlnaHQgPSA3MDA7XG5cbmxldCBnbCA9IGNhbnZhcy5nZXRDb250ZXh0KCd3ZWJnbDInKTtcblxubGV0IHByb2dyYW0gPSBjcmVhdGVQcm9ncmFtKFxuICAgIGdsLFxuICAgIGNyZWF0ZVNoYWRlcihnbCwgZ2wuVkVSVEVYX1NIQURFUiwgbGVuVmVydCksXG4gICAgY3JlYXRlU2hhZGVyKGdsLCBnbC5GUkFHTUVOVF9TSEFERVIsIGxlbkZyYWcpXG4pO1xuZ2wudXNlUHJvZ3JhbShwcm9ncmFtKTtcblxuZ2wudmlld3BvcnQoMCAsIDAsICBjYW52YXMud2lkdGggLCBjYW52YXMuaGVpZ2h0KTtcblxuY29uc3QgcG9zaXRpb24xID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0sICd1X3ZpZGVvMScpO1xuY29uc3QgcG9zaXRpb24yID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0sICd1X3ZpZGVvMicpO1xuZ2wudW5pZm9ybTFpKHBvc2l0aW9uMSwgMCk7XG5nbC51bmlmb3JtMWkocG9zaXRpb24yLCAxKTtcblxuKGdsIGFzIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgJiB7IE1vdXNlUG9zaXRpb24/OldlYkdMVW5pZm9ybUxvY2F0aW9ufSkuTW91c2VQb3NpdGlvbiA9ICBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgJ3VfbW91c2UnKVxuXG5cbmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZSk9PntcbiAgIGdsLnVuaWZvcm0yZnYoIChnbCBhcyBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ICYgeyBNb3VzZVBvc2l0aW9uPzpXZWJHTFVuaWZvcm1Mb2NhdGlvbn0pLk1vdXNlUG9zaXRpb24sIFtlLm9mZnNldFggLyBjYW52YXMuY2xpZW50V2lkdGggLSAuNSwgLSBlLm9mZnNldFkgLyBjYW52YXMuY2xpZW50SGVpZ2h0ICsgLjVdKTtcbn0pO1xuXG4vLyB2aWRlbyAxXG5nbC5hY3RpdmVUZXh0dXJlKCBnbC5URVhUVVJFMCk7XG5jb25zdCB2aWRlb1RleDEgPSBnbC5jcmVhdGVUZXh0dXJlKCk7XG5nbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB2aWRlb1RleDEpO1xuZ2wucGl4ZWxTdG9yZWkoZ2wuVU5QQUNLX0ZMSVBfWV9XRUJHTCAsIHRydWUpO1xuXG5nbC50ZXhJbWFnZTJEKFxuICAgIGdsLlRFWFRVUkVfMkQgLCBcbiAgICAwICwgXG4gICAgZ2wuUkdCQSwgXG4gICAgdmlkZW8xLnZpZGVvV2lkdGgsXG4gICAgdmlkZW8xLnZpZGVvSGVpZ2h0LFxuICAgIDAsXG4gICAgZ2wuUkdCQSxcbiAgICBnbC5VTlNJR05FRF9CWVRFLFxuICAgIHZpZGVvMVxuKTtcblxuZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01BR19GSUxURVIsIGdsLkxJTkVBUik7XG5nbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgZ2wuTElORUFSKTtcbmdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1MsIGdsLkNMQU1QX1RPX0VER0UpO1xuZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfVCwgZ2wuQ0xBTVBfVE9fRURHRSk7XG5cbi8vIHZpZGVvIDJcbmdsLmFjdGl2ZVRleHR1cmUoIGdsLlRFWFRVUkUxKTtcbmNvbnN0IHZpZGVvVGV4MiA9IGdsLmNyZWF0ZVRleHR1cmUoKTtcbmdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHZpZGVvVGV4Mik7XG5nbC5waXhlbFN0b3JlaShnbC5VTlBBQ0tfRkxJUF9ZX1dFQkdMICwgdHJ1ZSk7XG5cbmdsLnRleEltYWdlMkQoXG4gICAgZ2wuVEVYVFVSRV8yRCAsIFxuICAgIDAgLCBcbiAgICBnbC5SR0JBLCBcbiAgICB2aWRlbzIudmlkZW9XaWR0aCxcbiAgICB2aWRlbzIudmlkZW9IZWlnaHQsXG4gICAgMCxcbiAgICBnbC5SR0JBLFxuICAgIGdsLlVOU0lHTkVEX0JZVEUsXG4gICAgdmlkZW8yXG4pO1xuXG5nbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgZ2wuTElORUFSKTtcbmdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5MSU5FQVIpO1xuZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfUywgZ2wuQ0xBTVBfVE9fRURHRSk7XG5nbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9ULCBnbC5DTEFNUF9UT19FREdFKTtcblxuY29uc3QgcG9zaXRpb25BdHRyaWJ1dGVMb2NhdGlvbiA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHByb2dyYW0gLCAnYV9wb3NpdGlvbicpO1xuXG5jb25zdCBwb3NpdGlvblVuaWZSZXNvbHV0aW9uID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0gLCAndV9yZXNvbHV0aW9uJyk7XG5nbC51bmlmb3JtMmYoIHBvc2l0aW9uVW5pZlJlc29sdXRpb24gLCBjYW52YXMud2lkdGggLCBjYW52YXMuaGVpZ2h0ICk7XG5cblxuY29uc3QgcG9zaXRpb25idWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbmdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSICwgcG9zaXRpb25idWZmZXIpO1xuXG5jb25zdCB2YW8gPSBnbC5jcmVhdGVWZXJ0ZXhBcnJheSgpO1xuZ2wuYmluZFZlcnRleEFycmF5KHZhbyk7XG5cbmdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHBvc2l0aW9uQXR0cmlidXRlTG9jYXRpb24pO1xuXG5jb25zdCBzaXplID0gMztcbmNvbnN0IHR5cGUgPSBnbC5GTE9BVDtcbmNvbnN0IG5vcm1hbGl6ZSA9IGZhbHNlO1xuY29uc3Qgc3RyaWRlID0gMDtcbmNvbnN0IG9mZnNldCA9IDA7XG5cbmdsLnZlcnRleEF0dHJpYlBvaW50ZXIocG9zaXRpb25BdHRyaWJ1dGVMb2NhdGlvbiAsIHNpemUgLCB0eXBlICwgbm9ybWFsaXplICwgc3RyaWRlICwgb2Zmc2V0KTtcblxuZ2wuYmluZFZlcnRleEFycmF5KHZhbyk7XG5cblxuLy8gZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIgLCBuZXcgRmxvYXQzMkFycmF5KFtcbi8vICAgICAwLCAwLDEsXG4vLyAgICAgMCwgMSwxLFxuLy8gICAgIDEsIDAsMSxcbi8vICAgICAxLCAwLDEsXG4vLyAgICAgMCwgMSwxLFxuLy8gICAgIDEsIDEsIDFdKSwgZ2wuU1RBVElDX0RSQVcpO1xuZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIgLHBvc2l0aW9ucyAsZ2wuU1RBVElDX0RSQVcpO1xuXG5cbmNvbnN0IHByaW1pdGl2ZVR5cGUgPSBnbC5UUklBTkdMRVM7XG5jb25zdCBkb2Zmc2V0ID0gMDtcbmNvbnN0IGNvdW50ID0gcm93ICogY29sICogNCAqIDM7XG4vLyBjb25zdCBjb3VudCA9IDIqIDM7XG5nbC5kcmF3QXJyYXlzKHByaW1pdGl2ZVR5cGUsIGRvZmZzZXQsIGNvdW50KTtcblxuXG5mdW5jdGlvbiB0aWNrKCl7XG4gICAgZ2wuYWN0aXZlVGV4dHVyZSggZ2wuVEVYVFVSRTApO1xuICAgIGdsLnRleEltYWdlMkQoXG4gICAgICAgIGdsLlRFWFRVUkVfMkQgLCBcbiAgICAgICAgMCAsIFxuICAgICAgICBnbC5SR0JBLCBcbiAgICAgICAgdmlkZW8xLnZpZGVvV2lkdGgsXG4gICAgICAgIHZpZGVvMS52aWRlb0hlaWdodCxcbiAgICAgICAgMCxcbiAgICAgICAgZ2wuUkdCQSxcbiAgICAgICAgZ2wuVU5TSUdORURfQllURSxcbiAgICAgICAgdmlkZW8xXG4gICAgKTtcbiAgICBnbC5hY3RpdmVUZXh0dXJlKCBnbC5URVhUVVJFMSk7XG4gICAgZ2wudGV4SW1hZ2UyRChcbiAgICAgICAgZ2wuVEVYVFVSRV8yRCAsIFxuICAgICAgICAwICwgXG4gICAgICAgIGdsLlJHQkEsIFxuICAgICAgICB2aWRlbzIudmlkZW9XaWR0aCxcbiAgICAgICAgdmlkZW8yLnZpZGVvSGVpZ2h0LFxuICAgICAgICAwLFxuICAgICAgICBnbC5SR0JBLFxuICAgICAgICBnbC5VTlNJR05FRF9CWVRFLFxuICAgICAgICB2aWRlbzJcbiAgICApO1xuXG4gICAgY29uc3QgcHJpbWl0aXZlVHlwZSA9IGdsLlRSSUFOR0xFUztcbiAgICBjb25zdCBkb2Zmc2V0ID0gMDtcbiAgICBjb25zdCBjb3VudCA9IHJvdyAqIGNvbCAqIDQgKiAzO1xuICAgIC8vIGNvbnN0IGNvdW50ID0gMiogMztcbiAgICBnbC5kcmF3QXJyYXlzKHByaW1pdGl2ZVR5cGUsIGRvZmZzZXQsIGNvdW50KTtcbiAgICAvLyBjb25zb2xlLmxvZygndGljaycpO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aWNrKTtcbn1cblxudGljaygpO1xuXG59LDIwMDApOyIsImV4cG9ydCBkZWZhdWx0IFwiI3ZlcnNpb24gMzAwIGVzIC8qIEVhc2luZyBTaW5lIEluIGVxdWF0aW9uICovXFxuXFxucHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XFxuXFxuaW4gdmVjMiAgdl90ZXh0dXJlUG9zaXRpb247XFxuaW4gZmxvYXQgb3JkZXI7XFxub3V0IHZlYzQgIG91dENvbG9yIDtcXG5cXG51bmlmb3JtIHNhbXBsZXIyRCB1X3ZpZGVvMTtcXG51bmlmb3JtIHNhbXBsZXIyRCB1X3ZpZGVvMjtcXG5cXG5cXG4vKiBBZGFwdGVkIGZyb20gUm9iZXJ0IFBlbm5lciBlYXNpbmcgZXF1YXRpb25zICovXFxuI2RlZmluZSBQSV9UV09cXHRcXHRcXHQxLjU3MDc5NjMyNjc5NDg5N1xcblxcblxcblxcblxcbnZvaWQgbWFpbiAoKXtcXG4gICAgdmVjNCBjb2xvciAgPSB0ZXh0dXJlKHVfdmlkZW8xICwgdl90ZXh0dXJlUG9zaXRpb24pO1xcblxcbiAgICBpZihvcmRlciA8PSAxLjMpe1xcbiAgICAgICAgY29sb3IgID0gdGV4dHVyZSh1X3ZpZGVvMSAsIHZfdGV4dHVyZVBvc2l0aW9uKTtcXG4gICAgfWVsc2Uge1xcbiAgICAgICAgY29sb3IgID0gdGV4dHVyZSh1X3ZpZGVvMiAsIHZfdGV4dHVyZVBvc2l0aW9uKTtcXG4gICAgfVxcblxcbiAgICBvdXRDb2xvciA9Y29sb3I7XFxuXFxufVxcblwiOyIsImV4cG9ydCBkZWZhdWx0IFwiI3ZlcnNpb24gMzAwIGVzXFxuXFxuaW4gdmVjMyBhX3Bvc2l0aW9uIDsgXFxub3V0IHZlYzIgdl90ZXh0dXJlUG9zaXRpb247XFxuXFxudW5pZm9ybSB2ZWMyIHVfcmVzb2x1dGlvbjtcXG51bmlmb3JtIHZlYzIgdV9tb3VzZTtcXG4vLyB1bmlmb3JtIGZsb2F0IGlUaW1lO1xcbi8vIHVuaWZvcm0gdmVjMiB1X3RleHR1cmVTaXplO1xcbi8vIG91dCBmbG9hdCB0aW1lO1xcbm91dCB2ZWMyIHJlc29sdXRpb247XFxub3V0IGZsb2F0IG9yZGVyO1xcbi8vIG91dCBpbnQgaW1hZ2VJZHg7XFxuLy8gb3V0IHZlYzIgbW91c2U7XFxuLy8gb3V0IHZlYzIgdGV4dHVyZXNpemU7XFxuXFxuLyogXFxuY3AgOiBjYW1lcmEgcG9zdGlvblxcbmxhIDogbG9vayBhdCBcXG52ZCA6IG9yaWdpbiBwb3NpdGlvbiBcXG4qL1xcbnZlYzMgZ2V0VHJhbnNmb3JtZWRQb3NpdGlvbih2ZWMzIGNwICwgdmVjMyBsYSAsIHZlYzMgdmQpIHtcXG4gICAgXFxuXFxuICAgIHZlYzMgd3cgPSBub3JtYWxpemUoIGxhIC0gY3AgKTtcXG4gICAgdmVjMyB1dSA9IG5vcm1hbGl6ZSggY3Jvc3ModmVjMygwLiAsIDEuICwgMC4pICwgd3cgICkgKTtcXG4gICAgdmVjMyB2diA9IG5vcm1hbGl6ZSggY3Jvc3Mod3cgLCB1dSApICk7XFxuXFxuICAgIG1hdDMgY2FtZXJhVHJhbnNmb3JtID0gbWF0Myh1dSwgdnYsIHd3KTtcXG5cXG4gICAgcmV0dXJuIGNhbWVyYVRyYW5zZm9ybSAqICB2ZCAgO1xcbn1cXG5cXG52b2lkIG1haW4oKXtcXG4gICAgdmVjMyBwb3NpdGlvbiA9IHZlYzMoMS4gLSBhX3Bvc2l0aW9uLngqMi4sIGFfcG9zaXRpb24ueSoyLiAtIDEuLCBhX3Bvc2l0aW9uLnopO1xcbiAgICAvLyBnbF9Qb3NpdGlvbiA9IHZlYzQoZ2V0VHJhbnNmb3JtZWRQb3NpdGlvbih2ZWMzKHVfbW91c2UqMi4sMS4pLCB2ZWMzKDAuLDAuLDAuKSwgcG9zaXRpb24pLCAxLik7XFxuXFxuICAgIGlmKCBhX3Bvc2l0aW9uLnogIT0gMC4gKXtcXG4gICAgICAgIGdsX1Bvc2l0aW9uID0gdmVjNCggcG9zaXRpb24ueHkgKyAodV9tb3VzZS54eSkqLjAyLCBwb3NpdGlvbi56LCAxLik7XFxuICAgIH1cXG4gICAgZWxzZSB7XFxuICAgICAgICBnbF9Qb3NpdGlvbiA9IHZlYzQocG9zaXRpb24sIDEuKTtcXG4gICAgfVxcblxcbiAgICB2X3RleHR1cmVQb3NpdGlvbiA9IGFfcG9zaXRpb24ueHkgIDtcXG5cXG4gICAgcmVzb2x1dGlvbiA9IHVfcmVzb2x1dGlvbjtcXG5cXG4gICAgZmxvYXQgaWR4ID0gbW9kKGZsb2F0KGdsX1ZlcnRleElEKSwgMTIuKTtcXG4gICAgaWR4ID0gZmxvb3IoaWR4IC8gMy4pO1xcbiAgICBvcmRlciA9IGlkeDtcXG5cXG4gICAgXFxuXFxufVwiOyIsImV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTaGFkZXIoZ2w6IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQsIHR5cGU6IG51bWJlciwgc291cmNlOiBzdHJpbmcpOiBXZWJHTFNoYWRlciB8IG51bGwge1xuICAgIGNvbnN0IHNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcih0eXBlKTtcbiAgICBpZiAoIXNoYWRlcikgcmV0dXJuIG51bGw7XG4gICAgZ2wuc2hhZGVyU291cmNlKHNoYWRlciwgc291cmNlKTtcbiAgICBnbC5jb21waWxlU2hhZGVyKHNoYWRlcik7XG4gIFxuICAgIGNvbnN0IHN1Y2Nlc3MgPSBnbC5nZXRTaGFkZXJQYXJhbWV0ZXIoc2hhZGVyLCBnbC5DT01QSUxFX1NUQVRVUyk7XG4gICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgIHJldHVybiBzaGFkZXI7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKHR5cGUgPT0gZ2wuRlJBR01FTlRfU0hBREVSID8gJ2ZyYWcnIDogJ3ZlcnQnLCBnbC5nZXRTaGFkZXJJbmZvTG9nKHNoYWRlcikpO1xuICAgIGdsLmRlbGV0ZVNoYWRlcihzaGFkZXIpO1xuICAgIHJldHVybiBzaGFkZXI7XG4gIH1cbiAgXG4gIGV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQcm9ncmFtKFxuICAgIGdsOiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0LFxuICAgIHZlcnRleFNoYWRlcjogV2ViR0xTaGFkZXIgfCBudWxsLFxuICAgIGZyYWdtZW50U2hhZGVyOiBXZWJHTFNoYWRlciB8IG51bGxcbiAgKTogV2ViR0xTaGFkZXIgfCBudWxsIHtcbiAgICBjb25zdCBwcm9ncmFtID0gZ2wuY3JlYXRlUHJvZ3JhbSgpO1xuICAgIGlmICghcHJvZ3JhbSB8fCAhdmVydGV4U2hhZGVyIHx8ICFmcmFnbWVudFNoYWRlcikgcmV0dXJuIG51bGw7XG4gICAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIHZlcnRleFNoYWRlcik7XG4gICAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIGZyYWdtZW50U2hhZGVyKTtcbiAgXG4gICAgZ2wubGlua1Byb2dyYW0ocHJvZ3JhbSk7XG4gIFxuICAgIGNvbnN0IHN1Y2Nlc3MgPSBnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHByb2dyYW0sIGdsLkxJTktfU1RBVFVTKTtcbiAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgcmV0dXJuIHByb2dyYW07XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGdsLmdldFByb2dyYW1JbmZvTG9nKHByb2dyYW0pKTtcbiAgICBnbC5kZWxldGVQcm9ncmFtKHByb2dyYW0pO1xuICAgIHJldHVybiBwcm9ncmFtO1xuICB9XG5cbiBcbiAgXG4gIGV4cG9ydCBkZWZhdWx0IHtcbiAgICBjcmVhdGVQcm9ncmFtLFxuICAgIGNyZWF0ZVNoYWRlcixcbiAgfTtcbiAgIl0sInNvdXJjZVJvb3QiOiIifQ==