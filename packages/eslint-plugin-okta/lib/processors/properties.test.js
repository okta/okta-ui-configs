const processor = require('./properties');

describe('processor', () => {
  describe('preprocess', () => {
    it('should not crash when no input is provided', () => {
      processor.preprocess();
    });
    it('should return an array', () => {
      const pre = processor.preprocess('hello = there');
      expect(Array.isArray(pre)).toBe(true);
    });
    it('should return properties content as JS', () => {
      const pre = processor.preprocess('hello = there');
      const expectedText = 'module.exports = {\n  "hello": "there"\n};';
      expect(pre[0].text).toEqual(expectedText);
    });
    it('should return filename', () => {
      const filepath = 'filepath';
      const pre = processor.preprocess('hello = there', filepath);
      expect(pre[0].filename).toEqual(filepath);
    });
  });
  describe('postprocess', () => {
    const setUp = (code) => {
      processor.preprocess(code);
    };

    it('removes column numbers from nodes', () => {
      setUp('key = value\nanother.key = another value');
      const post = processor.postprocess([
        [
          { line: 1, column: 0, message: 'Hello, world!', ruleId: 'testRule' },
        ],
      ]);
      expect(post).toEqual(
        [
          { line: 1, column: 0, message: 'Hello, world!', ruleId: 'testRule' }
        ]
      );
    });
    it('handles empty space to keep line numbers in sync with properties file', () => {
      setUp(`line1 = value1

        line3 = value2
      `);
      const post = processor.postprocess([
        [
          { line: 2, column: 0, message: 'Hello, world!', ruleId: 'testRule' },
        ],
      ]);
      expect(post).toEqual(
        [
          { line: 3, column: 0, message: 'Hello, world!', ruleId: 'testRule' }
        ]
      );
    });
    it('handles comments to keep line numbers in sync with properties file', () => {
      setUp(`line1 = value1
        # Comment 1
        # Comment 2
        line4 = value2
      `);
      const post = processor.postprocess([
        [
          { line: 2, column: 0, message: 'Hello, world!', ruleId: 'testRule' },
        ],
      ]);
      expect(post).toEqual(
        [
          { line: 4, column: 0, message: 'Hello, world!', ruleId: 'testRule' }
        ]
      );
    });
  });
  describe('auto-fix', () => {
    it('should now support auto-fix', () => {
      expect(processor.supportsAutofix).toEqual(false);
    });
  });
});
