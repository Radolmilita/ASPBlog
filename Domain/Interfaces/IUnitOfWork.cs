namespace Domain.Interfaces
{
    public interface IUnitOfWork
    {
        ICommentRepository CommentRepository { get; }
        IPersonRepository PersonRepository { get; }
        IPostRepository PostRepository { get; }
        ITokenRepository TokenRepository { get; }
        IUserRepository UserRepository { get; }

        Task SaveAsync();
    }
}
