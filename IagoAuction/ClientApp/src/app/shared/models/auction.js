"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Auction = /** @class */ (function () {
    function Auction(id, title, description, lots, startDate, endDate) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.lots = lots != null ? lots : [];
        this.startDate = startDate;
        this.endDate = endDate;
    }
    return Auction;
}());
exports.Auction = Auction;
//# sourceMappingURL=auction.js.map