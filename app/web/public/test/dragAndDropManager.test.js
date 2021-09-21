import { describe, expect, test } from '@jest/globals';
import DragAndDropManager from "../src/dragAndDropManager.js";

describe("#Drag and Drop manager", () => {
  describe("#enableDrop should accept the file", () => {
    test("given a file it should return the file list", () => {
      const dragAndDropManager = new DragAndDropManager();
      const result = dragAndDropManager.enableDrop();
      expect(result).toBeFalsy();
    });
  });
});
