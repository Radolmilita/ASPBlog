using Infrastructure.DataBase;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.DataBase.Repository
{
    public class PostRepository : IPostRepository
    {
        readonly ContextApp contextApp;

        public PostRepository(ContextApp contextApp)
        {
            this.contextApp = contextApp;
        }

        public async Task AddAsync(Post entity)
        {
            await contextApp.Posts.AddAsync(entity);
        }

        public void Delete(Post entity)
        {
            contextApp.Posts.Remove(entity);
        }

        public async Task DeleteByIdAsync(int id)
        {
            Delete(await GetByIdAsync(id));
        }

        public async Task<IEnumerable<Post>> GetAllAsync()
        {
            return await contextApp.Posts.ToListAsync();
        }

        public async Task<IEnumerable<Post>> GetAllWithDetailsAsync()
        {
            return await contextApp.Posts
                .Include(t => t.Person)
                .Include(t => t.Comments)
                .ThenInclude(t => t.Person)
                .ToListAsync();
        }

        public async Task<Post> GetByIdAsync(int id)
        {
            return await contextApp.Posts.FindAsync(id);
        }

        public async Task<Post> GetByIdWithDetailsAsync(int id)
        {
            return await contextApp.Posts
                .Include(t => t.Person)
                .Include(t => t.Comments)
                .ThenInclude(t => t.Person)
                .FirstOrDefaultAsync(t => t.Id == id);
        }

        public void Update(Post entity)
        {
            contextApp.Posts.Update(entity);
        }
    }
}
