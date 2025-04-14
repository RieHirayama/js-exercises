describe("Emoji", () => {
    it("the length of the emoji '💯'", () => {
      const emoji = "💯";
      expect(emoji.length).toBe(2); // えもじの長さは２らしい
    });
  
    it("UTF-16 and UTF-32 test", () => {
      const emoji = "💯";
      const utf16 = "\uD83D\uDCAF"; // UTF-16
      const utf32 = "\u{0001F4AF}"; // UTF-32
  
      expect(utf16).toBe(emoji);
      expect(utf32).toBe(emoji);
    });
  });