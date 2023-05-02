"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userSchema_1 = __importDefault(require("../src/userSchema"));
describe('User model', () => {
    test('should create a valid schema', () => {
        const userSchema = new userSchema_1.default({ userName: "name", userWebId: "webid", provider: "inrupt" });
        expect(userSchema.userName).toBe("name");
        expect(userSchema.userWebId).toBe("webid");
        expect(userSchema.provider).toBe("inrupt");
    });
});
