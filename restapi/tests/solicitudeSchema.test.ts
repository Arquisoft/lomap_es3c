import Solicitude from "../src/solicitudeSchema";

describe('Solicitude model', () => {
    test('should create a valid schema', () => {
      const solicitudeSchema = new Solicitude({senderName : "senderName", senderProvider : "senderProvider", receiverName : "receiverName", receiverProvider: "receiverProvider"});
      expect(solicitudeSchema.senderName).toBe("senderName");
      expect(solicitudeSchema.senderProvider).toBe("senderProvider");
      expect(solicitudeSchema.receiverName).toBe("receiverName");
      expect(solicitudeSchema.receiverProvider).toBe("receiverProvider");
    });
  });