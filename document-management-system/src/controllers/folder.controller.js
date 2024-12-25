const FolderService = require("../services/folder.service");
const response = require("../utils/response");
const { HttpError, errorHandler } = require("../utils/error-handler");

class FolderController {
  async create(req, res) {
    const types = ["csv", "img", "pdf", "ppt"];
    const type = req.body?.type.toLowerCase();
    const name = req.body.name;
    const maxFileLimit = parseInt(req.body.maxFileLimit) || 10;
    errorHandler(res, async () => {
      if (!types.includes(type))
        return res.status(400).json({ message: "Invalid file type" });

      if (isNaN(maxFileLimit) || maxFileLimit <= 0)
        return res.status(400).json({
          message: "maxFileLimit must be a number and greater than 0",
        });

      const folder = await FolderService.create({ name, type, maxFileLimit });
      if (!folder || folder?.error) {
        throw new HttpError({
          res,
          message: "Folder not created",
          error: folder?.error,
        });
      }
      response({
        res,
        status: 201,
        message: "Folder created successfully",
        folder,
      });
    });
  }

  async update(req, res) {
    const { folderId } = req.params;
    const { name, type } = req.body;
    const maxFileLimit = parseInt(req.body?.maxFileLimit);
    errorHandler(res, async () => {
      if (maxFileLimit && isNaN(maxFileLimit))
        return res
          .status(400)
          .json({ message: "maxFileLimit must be a number" });

      const folder = await FolderService.update(folderId, {
        name,
        type,
        maxFileLimit,
      });
      if (!folder || folder?.error) {
        throw new HttpError({
          res,
          message: "Folder not updated",
          error: folder?.error,
        });
      }
      response({
        res,
        folder: { name, type, maxFileLimit },
        message: "Folder updated successfully",
      });
    });
  }

  async delete(req, res) {
    const { folderId } = req.params;
    errorHandler(res, async () => {
      const folder = await FolderService.delete(folderId);
      if (!folder || folder?.error) {
        throw new HttpError({
          res,
          message: "Folder ID does not exist",
          error: folder?.error,
        });
      }
      response({ res, message: "Folder deleted successfully" });
    });
  }

  async findAll(req, res) {
    const folders = await FolderService.findAll();
    response({ res, folders });
  }
}

module.exports = new FolderController();
