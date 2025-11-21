const DetailComment = require("../../Domains/comments/entities/DetailComment");
const DetailThread = require("../../Domains/threads/entities/DetailThread");

class GetThreadUseCase {
  constructor({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async execute(useCasePayload) {
    const { threadId } = useCasePayload;

    // 1. Verifikasi thread ada
    await this._threadRepository.verifyThreadAvailability(threadId);

    // 2. Ambil data raw dari repository
    const thread = await this._threadRepository.getThreadById(threadId);
    const comments = await this._commentRepository.getCommentsByThreadId(
      threadId
    );

    // 3. Mapping ke Entity DetailComment
    // Entity ini otomatis menangani logika "is_delete" -> "**komentar telah dihapus**"
    const commentsDetails = comments.map(
      (comment) =>
        new DetailComment({
          ...comment,
          date: new Date(comment.date).toISOString(), // Formatting date
          // Pastikan repository mengembalikan is_delete (boolean)
        })
    );

    // 4. Mapping ke Entity DetailThread
    return new DetailThread({
      ...thread,
      date: new Date(thread.date).toISOString(),
      comments: commentsDetails,
    });
  }
}

module.exports = GetThreadUseCase;
