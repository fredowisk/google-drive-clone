import { describe, test, expect, jest } from "@jest/globals";

import fs from "fs";
import FileHelper from "../../src/fileHelper.js";
import Routes from "../../src/routes.js";

describe("#File Helper", () => {
  describe("#getFileStatus", () => {
    test("it should return files statuses in correct format", async () => {
      const statMock = {
        dev: 1276865480,
        mode: 33206,
        nlink: 1,
        uid: 0,
        gid: 0,
        rdev: 0,
        blksize: 4096,
        ino: 30680772461503372,
        size: 366195,
        blocks: 720,
        atimeMs: 1631199615516.8955,
        mtimeMs: 1620733447192.4055,
        ctimeMs: 1620775432315.2195,
        birthtimeMs: 1631199528361.8518,
        atime: "2021-09-09T15:00:15.517Z",
        mtime: "2021-05-11T11:44:07.192Z",
        ctime: "2021-05-11T23:23:52.315Z",
        birthtime: "2021-09-09T14:58:48.362Z",
      };

      const mockUser = "fredowisk";
      process.env.USER = mockUser;
      const filename = "file.png";

      jest
        .spyOn(fs.promises, fs.promises.readdir.name)
        .mockResolvedValue([filename]);

      jest
        .spyOn(fs.promises, fs.promises.stat.name)
        .mockResolvedValue(statMock);

      const result = await FileHelper.getFilesStatus("/tmp");

      const expectedResult = [
        {
          size: "366 kB",
          lastModified: statMock.birthtime,
          owner: mockUser,
          file: filename,
        },
      ];

      expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${filename}`);
      expect(result).toMatchObject(expectedResult);
    });
  });
});
