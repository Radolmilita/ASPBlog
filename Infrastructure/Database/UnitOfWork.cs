using Infrastructure.Database.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Database
{
    public class UnitOfWork : IUnitOfWork
    {
        CommentRepository commentRepository;
        PersonRepository personRepository;
        PostRepository postRepository;

        readonly AppContext appContext;

        public ICommentRepository CommentRepository => throw new NotImplementedException();

        public IPersonRepository PersonRepository => throw new NotImplementedException();

        public IPostRepository PostRepository => throw new NotImplementedException();

        public ITokenRepository TokenRepository => throw new NotImplementedException();

        public IUserRepository UserRepository => throw new NotImplementedException();

        public async Task SaveAsync()
        {
            await appContext.SaveChangesAsync();
        }
    }
}
