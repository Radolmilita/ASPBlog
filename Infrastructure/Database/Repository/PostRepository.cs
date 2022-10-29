using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata.Ecma335;

namespace Infrastructure.Database.Repository
{
    public class PostRepository : IPostRepository
    {
        readonly AppContext context;

        public PostRepository(AppContext context)
        {
            this.context = context;
        }

        public async Task AddAsync(Post entity) => await context.Posts.AddAsync(entity);

        public void Delete(Post entity) => context.Posts.Remove(entity);


        public async Task DeleteByIdAsync(int id) => Delete(await GetByIdAsync(id));

        public async Task<IEnumerable<Post>> GetAllAsync() => await context.Posts.ToListAsync();

        public async Task<IEnumerable<Post>> GetAllWithDetailsAsync()
        {
            return await context.Posts
                .Include(t => t.Person)
                .Include(t => t.Comments)
                .ThenInclude(t => t.Person)
                .ToListAsync();
        }

        public async Task<Post> GetByIdAsync(int id)
        {
            return await context.Posts.FindAsync(id);
        }

        public async Task<Post> GetByIdWithDetailsAsync(int id)
        {
            return await context.Posts
                .Include(t => t.Person)
                .Include(t => t.Comments)
                .ThenInclude(t => t.Person)
                .FirstOrDefaultAsync(t => t.Id == id);
        }

        public void Update(Post entity)
        {
            context.Posts.Update(entity);
        }
    }
}
