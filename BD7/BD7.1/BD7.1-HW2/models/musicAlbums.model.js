const mongoose = require("mongoose");

const musicAlbumsSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    artist: { type: String, require: true },
    releaseYear: Number,
    genre: {
      type: String,
      enum: [
        "Rock",
        "Pop",
        "Hip-Hop",
        "Jazz",
        "Classical",
        "Country",
        "Electronic",
        "R&B",
        "Reggae",
        "Rock",
        "Indie",
      ],
    },
    recordLabel: String,
    formate: String,
    isExplicit: {
      type: Boolean,
      default: false,
    },
    isAvailableOnStreaming: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const MusicAlbums = mongoose.model("MusicAlbums", musicAlbumsSchema);
module.exports = MusicAlbums;
