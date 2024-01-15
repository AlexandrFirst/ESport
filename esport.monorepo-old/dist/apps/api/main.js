/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const config_1 = __webpack_require__(5);
const nestjs_rmq_1 = __webpack_require__(6);
const rmq_config_1 = __webpack_require__(7);
const competitions_controller_1 = __webpack_require__(8);
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            nestjs_rmq_1.RMQModule.forRootAsync((0, rmq_config_1.getRmqConfig)()),
        ],
        controllers: [competitions_controller_1.CompetitionsController],
        providers: [],
    })
], AppModule);


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("nestjs-rmq");

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getRmqConfig = void 0;
const config_1 = __webpack_require__(5);
const getRmqConfig = () => ({
    inject: [config_1.ConfigService],
    imports: [config_1.ConfigModule],
    useFactory: getRmqFactory,
});
exports.getRmqConfig = getRmqConfig;
const getRmqFactory = async (configService) => {
    return {
        exchangeName: configService.get('AMQP_EXCHANGE') ?? '',
        connections: [
            {
                login: configService.get('AMQP_LOGIN') ?? '',
                password: configService.get('AMQP_PASSWORD') ?? '',
                host: configService.get('AMQP_HOSTNAME') ?? '',
            },
        ],
        prefetchCount: parseInt(configService.get('AMQP_PREFETCH_COUNT') ?? '32'),
        serviceName: 'eSport-api',
        // logger: Logger,
    };
};


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompetitionsController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const nestjs_rmq_1 = __webpack_require__(6);
const res_1 = __webpack_require__(9);
const contracts_1 = __webpack_require__(10);
let CompetitionsController = exports.CompetitionsController = class CompetitionsController {
    constructor(rmqService) {
        this.rmqService = rmqService;
    }
    async getAll() {
        return (0, res_1.res)(() => this.rmqService.send(contracts_1.CompetitionsGetAll.topic, {}));
    }
};
tslib_1.__decorate([
    (0, common_1.Get)('all'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CompetitionsController.prototype, "getAll", null);
exports.CompetitionsController = CompetitionsController = tslib_1.__decorate([
    (0, common_1.Controller)('competitions'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof nestjs_rmq_1.RMQService !== "undefined" && nestjs_rmq_1.RMQService) === "function" ? _a : Object])
], CompetitionsController);


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.res = void 0;
const common_1 = __webpack_require__(1);
const nestjs_rmq_1 = __webpack_require__(6);
async function res(cb) {
    try {
        return await cb();
    }
    catch (error) {
        if (error instanceof nestjs_rmq_1.RMQError) {
            common_1.Logger.error(error.message, error.service);
        }
        else {
            common_1.Logger.error(error);
        }
        throw new common_1.HttpException(error?.message, error?.code ?? 500);
    }
}
exports.res = res;


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(11), exports);
tslib_1.__exportStar(__webpack_require__(12), exports);


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompetitionsGetAll = void 0;
var CompetitionsGetAll;
(function (CompetitionsGetAll) {
    CompetitionsGetAll.topic = 'competitions.all.query';
    class Request {
    }
    CompetitionsGetAll.Request = Request;
    class Response {
        constructor() {
            this.competitions = [];
        }
    }
    CompetitionsGetAll.Response = Response;
})(CompetitionsGetAll || (exports.CompetitionsGetAll = CompetitionsGetAll = {}));


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(1);
const core_1 = __webpack_require__(2);
const app_module_1 = __webpack_require__(3);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const globalPrefix = 'api/v1';
    app.setGlobalPrefix(globalPrefix);
    const port = process.env.PORT || 3002;
    await app.listen(port);
    common_1.Logger.log(`🚀 API is running on: http://localhost:${port}/${globalPrefix}`);
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map