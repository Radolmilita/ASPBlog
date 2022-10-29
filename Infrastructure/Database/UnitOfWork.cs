using Infrastructure.Database.Repository;

namespace Infrastructure.Database
{
    public class UnitOfWork : IUnitOfWork
    {
        CommentRepository commentRepository;
        PersonRepository personRepository;
        PostRepository postRepository;

        readonly AppContext appContext;

        public UnitOfWork(AppContext appContext) 
        {
            this.appContext = appContext;
        }

        public ICommentRepository CommentRepository => commentRepository ??= new(appContext);

        public IPersonRepository PersonRepository => personRepository ??= new(appContext);

        public IPostRepository PostRepository => postRepository ??= new(appContext);

        public async Task SaveAsync()
        {
            await appContext.SaveChangesAsync();
        }
    }
}
