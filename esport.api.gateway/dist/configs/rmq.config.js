"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRMQConfig = void 0;
const config_1 = require("@nestjs/config");
const getRMQConfig = () => ({
    inject: [config_1.ConfigService],
    imports: [config_1.ConfigModule],
    useFactory: getRmqFactory,
});
exports.getRMQConfig = getRMQConfig;
const getRmqFactory = async (configService) => ({
    exchangeName: configService.get('AMQP_EXCHANGE'),
    connections: [
        {
            login: configService.get('AMQP_LOGIN') || '',
            password: configService.get('AMQP_PASSWORD') || '',
            host: configService.get('AMQP_HOSTNAME') || '',
        },
    ],
    prefetchCount: parseInt(configService.get('AMQP_PREFETCH_COUNT')) || 32,
    serviceName: 'eSport.API.Gateway',
});
//# sourceMappingURL=rmq.config.js.map