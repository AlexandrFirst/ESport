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
const prisma_module_1 = __webpack_require__(8);
const competition_module_1 = __webpack_require__(11);
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, competition_module_1.CompetitionModule, config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            nestjs_rmq_1.RMQModule.forRootAsync((0, rmq_config_1.getRmqConfig)()),],
        controllers: [],
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
const common_1 = __webpack_require__(1);
const config_1 = __webpack_require__(5);
const getRmqConfig = () => ({
    inject: [config_1.ConfigService],
    imports: [config_1.ConfigModule],
    useFactory: getRmqFactory,
});
exports.getRmqConfig = getRmqConfig;
const getRmqFactory = async (configService) => ({
    exchangeName: configService.get('AMQP_EXCHANGE') ?? '',
    connections: [
        {
            login: configService.get('AMQP_LOGIN') ?? '',
            password: configService.get('AMQP_PASSWORD') ?? '',
            host: configService.get('AMQP_HOSTNAME') ?? '',
        },
    ],
    prefetchCount: parseInt(configService.get('AMQP_PREFETCH_COUNT') ?? '32'),
    serviceName: 'eSport-competitions',
    queueName: configService.get('AMQP_QUEUE'),
    logger: common_1.Logger,
});


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const prisma_service_1 = __webpack_require__(9);
let PrismaModule = exports.PrismaModule = class PrismaModule {
};
exports.PrismaModule = PrismaModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [],
        providers: [prisma_service_1.PrismaService],
        exports: [prisma_service_1.PrismaService],
    })
], PrismaModule);


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const client_1 = __webpack_require__(10);
let PrismaService = exports.PrismaService = class PrismaService extends client_1.PrismaClient {
    async onModuleInit() {
        await this.$connect();
    }
    async enableShutdownHooks(app) {
        this.$on('beforeExit', async () => {
            await app.close();
        });
    }
};
exports.PrismaService = PrismaService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], PrismaService);


/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompetitionModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const prisma_module_1 = __webpack_require__(8);
const competition_repository_1 = __webpack_require__(12);
const competition_queries_1 = __webpack_require__(14);
const competition_service_1 = __webpack_require__(18);
const competition_commands_1 = __webpack_require__(21);
const competition_event_emitter_1 = __webpack_require__(20);
let CompetitionModule = exports.CompetitionModule = class CompetitionModule {
};
exports.CompetitionModule = CompetitionModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [competition_queries_1.CompetitionQuery, competition_commands_1.CompetitionCommands],
        providers: [competition_repository_1.CompetitionRepository, competition_service_1.CompetitionService, competition_event_emitter_1.CompetitionEventEmitter],
    })
], CompetitionModule);


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompetitionRepository = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const prisma_service_1 = __webpack_require__(9);
const category_entity_1 = __webpack_require__(13);
let CompetitionRepository = exports.CompetitionRepository = class CompetitionRepository {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async findAll() {
        return this.prismaService.competition.findMany({
            include: {
                categories: {
                    include: {
                        rounds: {
                            include: {
                                fights: {
                                    include: {
                                        round: {
                                            include: {
                                                fights: {
                                                    include: {
                                                        competitors: {
                                                            include: {
                                                                user: true
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                    }
                                }
                            }
                        }
                    }
                }
            },
        });
    }
    async findByOrganisationId(organisationId) {
        return this.prismaService.competition.findMany({
            where: {
                organisationId
            }
        });
    }
    async create(data) {
        const { categories, ...competition } = data;
        const categoryEntities = categories.map(category => new category_entity_1.CategoryEntity(category));
        return this.prismaService.competition.create({ data: {
                ...competition,
            } });
    }
    async update(data) {
        const { categories, ...competition } = data;
        return this.prismaService.competition.update({ where: { id: competition.id }, data: {
                ...competition,
            }
        });
    }
};
exports.CompetitionRepository = CompetitionRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], CompetitionRepository);


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoryEntity = void 0;
class CategoryEntity {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.competitionId = data.competitionId;
        this.competition = data.competition;
        this.rounds = data.rounds;
    }
}
exports.CategoryEntity = CategoryEntity;


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompetitionQuery = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const nestjs_rmq_1 = __webpack_require__(6);
const contracts_1 = __webpack_require__(15);
const competition_service_1 = __webpack_require__(18);
let CompetitionQuery = exports.CompetitionQuery = class CompetitionQuery {
    constructor(service) {
        this.service = service;
    }
    async findAll() {
        return this.service.findAll();
    }
};
tslib_1.__decorate([
    (0, nestjs_rmq_1.RMQRoute)(contracts_1.CompetitionsGetAll.topic),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CompetitionQuery.prototype, "findAll", null);
exports.CompetitionQuery = CompetitionQuery = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof competition_service_1.CompetitionService !== "undefined" && competition_service_1.CompetitionService) === "function" ? _a : Object])
], CompetitionQuery);


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(16), exports);
tslib_1.__exportStar(__webpack_require__(17), exports);


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 17 */
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


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompetitionService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const competition_repository_1 = __webpack_require__(12);
const competition_entity_1 = __webpack_require__(19);
const competition_event_emitter_1 = __webpack_require__(20);
let CompetitionService = exports.CompetitionService = class CompetitionService {
    constructor(repo, eventEmitter) {
        this.repo = repo;
        this.eventEmitter = eventEmitter;
    }
    async findAll() {
        return this.repo.findAll();
    }
    async create(data) {
        const newCompetition = new competition_entity_1.CompetitionEntity(data);
        const comp = await this.repo.create(newCompetition);
        newCompetition.addEvent({
            topic: 'competitions.competition-created.event',
            data: { id: comp.id, name: comp.title, organisationId: comp.organisationId },
        });
        await this.updateCompetition(newCompetition);
        return comp;
    }
    async updateCompetition(comp) {
        return Promise.all([
            this.eventEmitter.handle(comp),
            this.repo.update(comp),
        ]);
    }
};
exports.CompetitionService = CompetitionService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof competition_repository_1.CompetitionRepository !== "undefined" && competition_repository_1.CompetitionRepository) === "function" ? _a : Object, typeof (_b = typeof competition_event_emitter_1.CompetitionEventEmitter !== "undefined" && competition_event_emitter_1.CompetitionEventEmitter) === "function" ? _b : Object])
], CompetitionService);


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompetitionEntity = void 0;
class CompetitionEntity {
    constructor(partial) {
        this.events = [];
        this.id = partial.id;
        this.title = partial.title;
        this.dateStart = this.updateDate(partial.dateStart);
        this.dateEnd = this.updateDate(partial.dateEnd);
        this.organisationId = partial.organisationId;
        this.categories = partial.categories;
    }
    updateDate(date) {
        if (date) {
            return new Date(date);
        }
    }
    addEvent(event) {
        this.events.push(event);
        return this;
    }
}
exports.CompetitionEntity = CompetitionEntity;


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompetitionEventEmitter = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const nestjs_rmq_1 = __webpack_require__(6);
let CompetitionEventEmitter = exports.CompetitionEventEmitter = class CompetitionEventEmitter {
    constructor(rmqService) {
        this.rmqService = rmqService;
    }
    async handle(eventEntity) {
        for (const { data, topic } of eventEntity.events) {
            await this.rmqService.notify(topic, data, {
                persistent: true,
            });
        }
    }
};
exports.CompetitionEventEmitter = CompetitionEventEmitter = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof nestjs_rmq_1.RMQService !== "undefined" && nestjs_rmq_1.RMQService) === "function" ? _a : Object])
], CompetitionEventEmitter);


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompetitionCommands = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const nestjs_rmq_1 = __webpack_require__(6);
const competition_service_1 = __webpack_require__(18);
const competition_entity_1 = __webpack_require__(19);
let CompetitionCommands = exports.CompetitionCommands = class CompetitionCommands {
    constructor(competitionService) {
        this.competitionService = competitionService;
    }
    async create(data) {
        return this.competitionService.create(data);
    }
};
tslib_1.__decorate([
    (0, nestjs_rmq_1.RMQRoute)('competitions.create'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof competition_entity_1.CompetitionEntity !== "undefined" && competition_entity_1.CompetitionEntity) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CompetitionCommands.prototype, "create", null);
exports.CompetitionCommands = CompetitionCommands = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof competition_service_1.CompetitionService !== "undefined" && competition_service_1.CompetitionService) === "function" ? _a : Object])
], CompetitionCommands);


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
    await app.init();
    common_1.Logger.log(`🚀 Competitions is running`);
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map