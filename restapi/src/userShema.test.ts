import User from "./userSchema";

describe('User model', () => {
    test('should create a valid schema', () => {
      const userSchema = new User({userName : "name", userWebId : "webid", provider : "inrupt"});
      expect(userSchema.userName).toBe("name");
      expect(userSchema.userWebId).toBe("webid");
      expect(userSchema.provider).toBe("inrupt");
    });
  });