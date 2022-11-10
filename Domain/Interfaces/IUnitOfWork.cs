namespace Domain.Interfaces
{
    public interface IUnitOfWork
    {
        ICommentRepository CommentRepository { get; }

        IPersonRepository PersonRepository { get; }

        IPostRepository PostRepository { get; }

        Task SaveAsync();
    }
}
