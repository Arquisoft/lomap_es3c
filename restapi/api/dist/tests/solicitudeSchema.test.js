"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const solicitudeSchema_1 = __importDefault(require("../src/solicitudeSchema"));
describe('Solicitude model', () => {
    test('should create a valid schema', () => {
        const solicitudeSchema = new solicitudeSchema_1.default({ senderName: "senderName", senderProvider: "senderProvider", receiverName: "receiverName", receiverProvider: "receiverProvider" });
        expect(solicitudeSchema.senderName).toBe("senderName");
        expect(solicitudeSchema.senderProvider).toBe("senderProvider");
        expect(solicitudeSchema.receiverName).toBe("receiverName");
        expect(solicitudeSchema.receiverProvider).toBe("receiverProvider");
    });
});
