const FileService = require("../services/file.service");
const cloudinary = require("../utils/cloudinary");
const { HttpError, errorHandler } = require("../utils/error-handler");
const response = require("../utils/response");

class FileController {
  async upload(req, res) {
    errorHandler(res, async () => {
      const { folderId } = req.params;
      const { name, description } = req.body;
      const { size, mimetype: type } = req.file;
      const resCloudinary = await cloudinary(req.file);
      const createdFile = await FileService.create(folderId, {
        name,
        type,
        size,
        description,
      });
      if (!resCloudinary || !createdFile) {
        throw new HttpError({
          res,
          message: "File not uploaded",
        });
      }
      response({
        res,
        file: { ...createdFile, url: resCloudinary.secure_url },
        message: "File created successfully",
      });
    });
  }

  async update(req, res) {
    const { folderId, fileId } = req.params;
    const { name, description } = req.body;
    errorHandler(res, async () => {
      const file = await FileService.update(folderId, fileId, {
        name,
        description,
      });
      if (!file) {
        throw new HttpError({
          res,
          message: "File not updated",
        });
      }
      response({
        res,
        file: { fileId, name, description },
        message: "File updated successfully",
      });
    });
  }

  async delete(req, res) {
    const { fileId } = req.params;
    errorHandler(res, async () => {
      const file = await FileService.delete(fileId);
      if (!file || file?.error) {
        throw new HttpError({
          res,
          message: "File not deleted",
        });
      }
      response({ res, message: "File deleted successfully" });
    });
  }

  async findAll(req, res) {
    const { folderId } = req.params;
    errorHandler(res, async () => {
      const files = await FileService.findAll(folderId);
      if (!files || files?.error) {
        throw new HttpError({
          res,
          message: "Files not found",
          status: 404,
          error: files?.error,
        });
      }
      response({ res, files });
    });
  }

  async sort(req, res) {
    const { folderId } = req.params;
    const { sort } = req.query;
    errorHandler(res, async () => {
      const files = await FileService.sort(folderId, sort);
      if (!files || files?.error) {
        throw new HttpError({
          res,
          message: "Files not found",
          status: 404,
          error: files?.error,
        });
      }
      response({ res, files });
    });
  }

  async findByProperty(req, res) {
    const { type } = req.query;
    errorHandler(res, async () => {
      const files = await FileService.findByProperty({ type });
      if (!files || files?.error || files?.length === 0) {
        throw new HttpError({
          res,
          message: "Files not found",
          status: 404,
          error: files?.error,
        });
      }
      response({ res, files });
    });
  }
}

module.exports = new FileController();
