var Files = artifacts.require("./Files.sol");
const truffleAssert = require('truffle-assertions');

contract("Files", function() {
  describe("Setting up the contract", function () {
    var filesInstance;

    beforeEach(async function () {
      filesInstance = await Files.new();
    });

    it("Initializes correct number of files", async function() {
      assert.equal(await filesInstance.id(), 2, "correct number of files");
    });

    it("Initializes files with the correct values", async function () {
      let files = await filesInstance.files(1)
      assert.equal(files[0], 1, "has the correct id");
      assert.equal(files[1], "Starter File", "has the correct name");
      assert.equal(files[2], "Classified information.", "has the correct contents");

      files = await filesInstance.files(2)
      assert.equal(files[0], 2, "has the correct id");
      assert.equal(files[1], "File 2", "has the correct name");
      assert.equal(files[2], "Lorem ipsum.", "has the correct contents");
    });

    it("Third file is not initialized", async function () {
      let files = await filesInstance.files(3)
      assert.equal(files[0], 0, "has a zero id");
      assert.equal(files[1], "", "has no name");
      assert.equal(files[2], "", "has no contents");
    })
  })

  describe("Viewing file contents", function () {
    var filesInstance;

    beforeEach(async function () {
      filesInstance = await Files.new();
    });

    it("File 1: Returns correct contents", async function () {
      let contents = await filesInstance.viewFile.call(1);
      assert.equal(contents, "Classified information.", "File 1: correct contents are displayed");
    })

    it("File 2: Returns correct contents", async function () {
      let contents = await filesInstance.viewFile.call(2);
      assert.equal(contents, "Lorem ipsum.", "File 2: correct contents are displayed");
    })
  })

  describe("Adding files", function () {
    var filesInstance;

    beforeEach(async function () {
      filesInstance = await Files.new();
    });

    it("File successfully added", async function () {
      await filesInstance.addFile("Hi", "Bruh");
      let contents = await filesInstance.viewFile.call(3);
      assert.equal(contents, "Bruh", "File 3: correct contents are displayed");
    })
  })

  describe("Borrowing files", function () {
    var filesInstance;

    beforeEach(async function () {
      filesInstance = await Files.new();
    });

    it("File 2 successfully borrowed", async function () {
      await filesInstance.borrowFile(2, 2);
      let file2 = await filesInstance.files(2)
      let owner = file2.owner
      assert.equal(owner, filesInstance.owner, "File 2: Successfully borrowed");
    })
  })

  describe("Taking files", function () {
    var filesInstance;

    beforeEach(async function () {
      filesInstance = await Files.new();
    });

    it("File 2 successfully taken", async function () {
      await filesInstance.takeFile(2, 3);
      let file2 = await filesInstance.files(2)
      let owner = file2.owner
      assert.equal(owner, filesInstance.owner, "File 2: Successfully taken");
    })
  })

  describe("Lending files", function () {
    var filesInstance;

    beforeEach(async function () {
      filesInstance = await Files.new();
    });

    it("File 2 successfully lent", async function () {
      await filesInstance.lendFile(2, 2, '0xA331EF77c0dA14157f0AF98e1435324Cb4780641');
      let file2 = await filesInstance.files(2)
      let owner = file2.owner
      assert.equal(owner, filesInstance.owner, "File 2: Successfully lent");
    })
  })

  describe("Giving files", function () {
    var filesInstance;

    beforeEach(async function () {
      filesInstance = await Files.new();
    });

    it("File 2 successfully given", async function () {
      await filesInstance.giveFile(2, 3, '0xA331EF77c0dA14157f0AF98e1435324Cb4780641');
      let file2 = await filesInstance.files(2)
      let owner = file2.owner
      assert.equal(owner, filesInstance.owner, "File 2: Successfully given");
    })
  })

  describe("Deleting files", function () {
    var filesInstance;

    beforeEach(async function () {
      filesInstance = await Files.new();
    });

    it("File successfully deleted", async function () {
      await filesInstance.addFile("Hi", "Bruh");
      let contents = await filesInstance.viewFile.call(3);
      assert.equal(contents, "Bruh", "File 3: Successfully added");
      await filesInstance.deleteFile(3, 5);
      await truffleAssert.fails(
        filesInstance.viewFile.call(3),
        truffleAssert.ErrorType.REVERT,
        "VM Exception while processing transaction: revert"
      );
    })
  })
});
