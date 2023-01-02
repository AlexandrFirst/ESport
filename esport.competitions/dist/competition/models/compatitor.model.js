"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompetitorSchema = exports.Competitor = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const compatitorType_enum_1 = require("../../enums/compatitorType.enum");
let Competitor = class Competitor extends mongoose_1.Document {
};
__decorate([
    (0, mongoose_2.Prop)({ requred: true }),
    __metadata("design:type", String)
], Competitor.prototype, "displayName", void 0);
__decorate([
    (0, mongoose_2.Prop)(),
    __metadata("design:type", Number)
], Competitor.prototype, "weight", void 0);
__decorate([
    (0, mongoose_2.Prop)(),
    __metadata("design:type", Number)
], Competitor.prototype, "height", void 0);
__decorate([
    (0, mongoose_2.Prop)({ requred: true, enum: compatitorType_enum_1.CompatitorType }),
    __metadata("design:type", Number)
], Competitor.prototype, "type", void 0);
Competitor = __decorate([
    (0, mongoose_2.Schema)()
], Competitor);
exports.Competitor = Competitor;
exports.CompetitorSchema = mongoose_2.SchemaFactory.createForClass(Competitor);
//# sourceMappingURL=compatitor.model.js.map