"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AuctionDto = /** @class */ (function () {
    function AuctionDto(id, title, description, paintingIds, startDate, endDate) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.paintingIds = paintingIds != null ? paintingIds : [];
        this.startDate = startDate;
        this.endDate = endDate;
    }
    return AuctionDto;
}());
exports.AuctionDto = AuctionDto;
//# sourceMappingURL=auction-dto.js.map