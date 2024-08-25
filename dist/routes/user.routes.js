"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/api/user', (req, res, next) => {
    return res.status(200).json({
        message: 'Hey',
    });
});
exports.default = router;
//# sourceMappingURL=user.routes.js.map