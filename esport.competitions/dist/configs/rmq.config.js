"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRmqConfig = void 0;
const config_1 = require("@nestjs/config");
const getRmqConfig = () => ({
    inject: [config_1.ConfigService],
    imports: [config_1.ConfigModule],
    useFactory: getRmqFactory,
});
exports.getRmqConfig = getRmqConfig;
const getRmqFactory = async (configService) => {
    var _a, _b, _c, _d, _e;
    return ({
        exchangeName: configService.get('AMQP_EXCHANGE'),
        connections: [
            {
                login: (_a = configService.get('AMQP_LOGIN')) !== null && _a !== void 0 ? _a : '',
                password: (_b = configService.get('AMQP_PASSWORD')) !== null && _b !== void 0 ? _b : '',
                host: (_c = configService.get('AMQP_HOSTNAME')) !== null && _c !== void 0 ? _c : '',
            },
        ],
        queueName: (_d = configService.get('AMQP_QUEUE')) !== null && _d !== void 0 ? _d : '',
        prefetchCount: (_e = parseInt(configService.get('AMQP_PREFETCH_COUNT'))) !== null && _e !== void 0 ? _e : 32,
        serviceName: 'eSportKit-account',
    });
};
//# sourceMappingURL=rmq.config.js.map