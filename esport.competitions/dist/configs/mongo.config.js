"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMongoFactory = exports.getMongoConfig = void 0;
const config_1 = require("@nestjs/config");
const getMongoConfig = () => ({
    imports: [config_1.ConfigModule],
    inject: [config_1.ConfigService],
    useFactory: exports.getMongoFactory,
});
exports.getMongoConfig = getMongoConfig;
const getMongoFactory = async (configService) => {
    return {
        uri: configService.get('MONGO_DIRECT_URL') || getMongoUrl(configService),
    };
};
exports.getMongoFactory = getMongoFactory;
const getMongoUrl = (configService) => 'mongodb://' +
    configService.get('MONGO_LOGIN') +
    ':' +
    configService.get('MONGO_PASSWORD') +
    '@' +
    configService.get('MONGO_HOST') +
    ':' +
    configService.get('MONGO_PORT') +
    '/' +
    configService.get('MONGO_AUTHDATABASE');
//# sourceMappingURL=mongo.config.js.map