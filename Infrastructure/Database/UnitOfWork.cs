using Infrastructure.DataBase.Repository;

namespace Infrastructure.DataBase
{
    public class UnitOfWork : IUnitOfWork
    {
        CommentRepository commentRepository;
        PersonRepository personRepository;
        PostRepository postRepository;

        readonly ContextApp contextApp;

        public UnitOfWork(ContextApp contextApp)
        {
            this.contextApp = contextApp;
        }

        public ICommentRepository CommentRepository => commentRepository ??= new(contextApp);

        public IPersonRepository PersonRepository => personRepository ??= new(contextApp);

        public IPostRepository PostRepository => postRepository ??= new(contextApp);

        public async Task SaveAsync()
        {
            await contextApp.SaveChangesAsync();
        }
    }
}
