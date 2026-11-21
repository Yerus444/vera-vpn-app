"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/error-kid";
exports.ids = ["vendor-chunks/error-kid"];
exports.modules = {

/***/ "(ssr)/./node_modules/error-kid/dist/index.js":
/*!**********************************************!*\
  !*** ./node_modules/error-kid/dist/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   errorClass: () => (/* binding */ p),\n/* harmony export */   errorClassWithData: () => (/* binding */ l),\n/* harmony export */   isErrorOfKind: () => (/* binding */ a)\n/* harmony export */ });\nvar f = Object.defineProperty;\nvar u = (r, t, e) => t in r ? f(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;\nvar c = (r, t, e) => u(r, typeof t != \"symbol\" ? t + \"\" : t, e);\nfunction a(r, t) {\n  return (e) => e instanceof r && e.type === t;\n}\nfunction p(r, t) {\n  t || (t = []);\n  const e = Symbol(r);\n  class n extends Error {\n    constructor(...i) {\n      const o = typeof t == \"function\" ? t(...i) : typeof t == \"string\" ? [t] : t || [];\n      super(...o);\n      c(this, \"type\", e);\n      this.name = r;\n    }\n  }\n  return Object.defineProperty(n, \"name\", { value: r }), [n, a(n, e)];\n}\nfunction l(r, t, e) {\n  const n = Symbol(r);\n  class s extends p(r, e)[0] {\n    constructor(...o) {\n      super(...o);\n      c(this, \"data\");\n      c(this, \"type\", n);\n      this.data = t(...o);\n    }\n  }\n  return Object.defineProperty(s, \"name\", { value: r }), [s, a(s, n)];\n}\n\n//# sourceMappingURL=index.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZXJyb3Ita2lkL2Rpc3QvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQSx3Q0FBd0MsMERBQTBEO0FBQ2xHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QyxVQUFVO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsVUFBVTtBQUN0RDtBQUtFO0FBQ0YiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcVXNlclxcRGVza3RvcFxcdmVyYS12cG5cXG5vZGVfbW9kdWxlc1xcZXJyb3Ita2lkXFxkaXN0XFxpbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZiA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbnZhciB1ID0gKHIsIHQsIGUpID0+IHQgaW4gciA/IGYociwgdCwgeyBlbnVtZXJhYmxlOiAhMCwgY29uZmlndXJhYmxlOiAhMCwgd3JpdGFibGU6ICEwLCB2YWx1ZTogZSB9KSA6IHJbdF0gPSBlO1xudmFyIGMgPSAociwgdCwgZSkgPT4gdShyLCB0eXBlb2YgdCAhPSBcInN5bWJvbFwiID8gdCArIFwiXCIgOiB0LCBlKTtcbmZ1bmN0aW9uIGEociwgdCkge1xuICByZXR1cm4gKGUpID0+IGUgaW5zdGFuY2VvZiByICYmIGUudHlwZSA9PT0gdDtcbn1cbmZ1bmN0aW9uIHAociwgdCkge1xuICB0IHx8ICh0ID0gW10pO1xuICBjb25zdCBlID0gU3ltYm9sKHIpO1xuICBjbGFzcyBuIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKC4uLmkpIHtcbiAgICAgIGNvbnN0IG8gPSB0eXBlb2YgdCA9PSBcImZ1bmN0aW9uXCIgPyB0KC4uLmkpIDogdHlwZW9mIHQgPT0gXCJzdHJpbmdcIiA/IFt0XSA6IHQgfHwgW107XG4gICAgICBzdXBlciguLi5vKTtcbiAgICAgIGModGhpcywgXCJ0eXBlXCIsIGUpO1xuICAgICAgdGhpcy5uYW1lID0gcjtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShuLCBcIm5hbWVcIiwgeyB2YWx1ZTogciB9KSwgW24sIGEobiwgZSldO1xufVxuZnVuY3Rpb24gbChyLCB0LCBlKSB7XG4gIGNvbnN0IG4gPSBTeW1ib2wocik7XG4gIGNsYXNzIHMgZXh0ZW5kcyBwKHIsIGUpWzBdIHtcbiAgICBjb25zdHJ1Y3RvciguLi5vKSB7XG4gICAgICBzdXBlciguLi5vKTtcbiAgICAgIGModGhpcywgXCJkYXRhXCIpO1xuICAgICAgYyh0aGlzLCBcInR5cGVcIiwgbik7XG4gICAgICB0aGlzLmRhdGEgPSB0KC4uLm8pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHMsIFwibmFtZVwiLCB7IHZhbHVlOiByIH0pLCBbcywgYShzLCBuKV07XG59XG5leHBvcnQge1xuICBwIGFzIGVycm9yQ2xhc3MsXG4gIGwgYXMgZXJyb3JDbGFzc1dpdGhEYXRhLFxuICBhIGFzIGlzRXJyb3JPZktpbmRcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXBcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/error-kid/dist/index.js\n");

/***/ })

};
;