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
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("window.addEventListener('load', runApp);\r\n\r\nlet leftInput = document.getElementById('left-input');\r\nlet rightInput = document.getElementById('right-input');\r\n\r\nlet iHaves = document.querySelectorAll('.i-have');\r\nlet iWants = document.querySelectorAll('.i-want');\r\n\r\nlet leftDescription = document.getElementById('left-description');\r\nlet rightDescription = document.getElementById('right-description');\r\n\r\niHaves.forEach(item => item.addEventListener('click', clicked));\r\niWants.forEach(item => item.addEventListener('click', clicked));\r\n\r\nlet clickedIhave;\r\nlet clickedIwant;\r\n\r\nlet leftResponse;\r\nlet rightResponse;\r\n\r\nlet leftDiv = document.getElementById('left-div');\r\nlet rightDiv = document.getElementById('right-div');\r\n\r\nlet left = leftDiv.getBoundingClientRect().left;\r\nlet right = rightDiv.getBoundingClientRect().left;\r\n\r\nlet arrowButton = document.getElementById('button');\r\narrowButton.addEventListener('click', toggle);\r\n\r\nfunction runApp() {\r\n    clickedIhave = 'RUB';\r\n    clickedIwant = 'USD';\r\n    getResponse();\r\n    leftInput.addEventListener('input', calculateRight);\r\n    rightInput.addEventListener('input', calculateLeft);\r\n}\r\n\r\nfunction calculateRight() {\r\n    let cleanLeftInput = cleaner(leftInput.value);\r\n    setTimeout(() => {\r\n        leftInput.value = cleanLeftInput;\r\n    }, 0);\r\n    if (leftInput.value === '.') {\r\n        rightInput.value = 0;\r\n    } else {\r\n        rightInput.value = cleanLeftInput * +leftResponse.rates[clickedIwant].toFixed(4);\r\n        leftDescription.innerText = `1 ${clickedIhave} = ${+leftResponse.rates[clickedIwant].toFixed(4)} ${clickedIwant}`\r\n        rightDescription.innerText = `1 ${clickedIwant} = ${(1 / +leftResponse.rates[clickedIwant]).toFixed(4)} ${clickedIhave}`\r\n    }\r\n}\r\n\r\nfunction calculateLeft() {\r\n    let cleanRightInput = cleaner(rightInput.value);\r\n    setTimeout(() => {\r\n        rightInput.value = cleanRightInput;\r\n    }, 0);\r\n    if (rightInput.value === '.') {\r\n        leftInput.value = 0;\r\n    } else {\r\n    leftInput.value = cleanRightInput * +rightResponse.rates[clickedIhave].toFixed(4);\r\n    }\r\n}\r\n\r\nfunction clicked(e) {\r\n    if (e.target.classList.contains('i-have')) {\r\n        iHaves.forEach(item => item.classList.remove('clicked'));\r\n        if (e.target.classList.contains('currency')) {\r\n            clickedIhave = e.target.innerText;\r\n        } else if (e.target.classList.contains('select')) {\r\n            clickedIhave = e.target.value;\r\n        }\r\n    }\r\n    if (e.target.classList.contains('i-want')) {\r\n        iWants.forEach(item => item.classList.remove('clicked'));\r\n        if (e.target.classList.contains('currency')) {\r\n            clickedIwant = e.target.innerText;\r\n        } else if (e.target.classList.contains('select')) {\r\n            clickedIwant = e.target.value;\r\n        }\r\n    }\r\n    e.target.classList.add('clicked');\r\n    getResponse();\r\n}\r\n\r\nfunction getResponse() {\r\n    document.querySelector('.ghost').classList.remove('hidden');\r\n    let responseL = fetch(`https://api.ratesapi.io/api/latest?base=${clickedIhave}&symbols=${clickedIwant}`);\r\n    let responseR = fetch(`https://api.ratesapi.io/api/latest?base=${clickedIwant}&symbols=${clickedIhave}`);\r\n    Promise.all([\r\n        responseL,\r\n        responseR\r\n    ]).then(\r\n        responses => Promise.all([\r\n            responses[0].json(),\r\n            responses[1].json()\r\n        ]).then(\r\n            (res) => {\r\n                leftResponse = res[0];\r\n                rightResponse = res[1];\r\n                calculateRight();\r\n            }\r\n        )\r\n    )\r\n        .catch(() => setTimeout(() => {\r\n            alert('Right now our server is not responding.\\nPlease try again later')\r\n        }, 100))\r\n        .finally(() => document.querySelector('.ghost').classList.add('hidden'));\r\n}\r\n\r\nfunction toggle() {\r\n    leftDiv.classList.add('absolute');\r\n    rightDiv.classList.add('absolute');\r\n    leftDiv.style.right = 0;\r\n    rightDiv.style.left = 0;\r\n    leftDiv.style.left = '';\r\n    document.getElementById('left-p').innerText = 'Хочу приобрести';\r\n    document.getElementById('right-p').innerText = 'У меня есть';\r\n    arrowButton.removeEventListener('click', toggle);\r\n    arrowButton.addEventListener('click', reverseToggle);\r\n}\r\n\r\nfunction reverseToggle() {\r\n    leftDiv.style.left = 0;\r\n    rightDiv.style.right = 0;\r\n    rightDiv.style.left = '';\r\n    document.getElementById('left-p').innerText = 'У меня есть';\r\n    document.getElementById('right-p').innerText = 'Хочу приобрести';\r\n    arrowButton.removeEventListener('click', reverseToggle);\r\n    arrowButton.addEventListener('click', toggle);\r\n}\r\n\r\nfunction cleaner(input) {\r\n    let dirty = input;\r\n    let clean = '';\r\n    let isFirstDot = true;\r\n    for (let i = 0; i < dirty.length; i++) {\r\n        if (isFirstDot && (dirty[i] === '.' || dirty[i] === ',')) {\r\n            clean += dirty[i];\r\n            isFirstDot = false;\r\n        }\r\n        if (!isNaN(dirty[i])) {\r\n            clean += dirty[i];\r\n        }\r\n    }\r\n    return clean.replace(',', '.');\r\n}\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

/******/ });