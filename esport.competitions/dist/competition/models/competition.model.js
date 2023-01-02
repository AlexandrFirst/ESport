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
exports.CompetitionSchema = exports.Competition = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const category_model_1 = require("./category.model");
let Competition = class Competition extends mongoose_1.Document {
};
__decorate([
    (0, mongoose_2.Prop)({ required: true }),
    __metadata("design:type", String)
], Competition.prototype, "title", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: true }),
    __metadata("design:type", Date)
], Competition.prototype, "dateStart", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: false }),
    __metadata("design:type", Date)
], Competition.prototype, "dateEnd", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: true }),
    __metadata("design:type", Number)
], Competition.prototype, "organizationId", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: true, type: [category_model_1.CategorySchema], _id: false }),
    __metadata("design:type", Array)
], Competition.prototype, "categories", void 0);
Competition = __decorate([
    (0, mongoose_2.Schema)()
], Competition);
exports.Competition = Competition;
exports.CompetitionSchema = mongoose_2.SchemaFactory.createForClass(Competition);
//# sourceMappingURL=competition.model.js.map