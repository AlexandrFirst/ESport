"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompetitionEntity = void 0;
class CompetitionEntity {
    constructor(c) {
        this._id = c._id;
        this.categories = c.categories;
        this.dateStart = c.dateStart;
        this.dateEnd = c.dateEnd;
        this.organizationId = c.organizationId;
        this.title = c.title;
    }
}
exports.CompetitionEntity = CompetitionEntity;
//# sourceMappingURL=competition.entity.js.map