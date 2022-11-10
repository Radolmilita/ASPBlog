using Infrastructure.DataBase;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.DataBase.Repository
{
    public class CommentRepository : ICommentRepository
    {
        readonly ContextApp contextApp;

        public CommentRepository(ContextApp contextApp)
        {
            this.contextApp = contextApp;
        }

        public async Task AddAsync(Comment entity)
        {
            await contextApp.Comments.AddAsync(entity);
        }

        public void Delete(Comment entity)
        {
            contextApp.Comments.Remove(entity);
        }

        public async Task DeleteByIdAsync(int id)
        {
            Delete(await GetByIdAsync(id));
        }

        public async Task<IEnumerable<Comment>> GetAllAsync()
        {
            return await contextApp.Comments.ToListAsync();
        }

        public async Task<IEnumerable<Comment>> GetAllWithDetailsAsync()
        {
            return await contextApp.Comments
                .Include(t => t.Person)
                .Include(t => t.Post)
                .ToListAsync();
        }

        public async Task<Comment> GetByIdAsync(int id)
        {
            return await contextApp.Comments.FindAsync(id);
        }

        public async Task<Comment> GetByIdWithDetailsAsync(int id)
        {
            return await contextApp.Comments
                .Include(t => t.Person)
                .Include(t => t.Post)
                .FirstOrDefaultAsync(t => t.Id == id);
        }

        public void Update(Comment entity)
        {
            contextApp.Comments.Update(entity);
        }
    }
}
