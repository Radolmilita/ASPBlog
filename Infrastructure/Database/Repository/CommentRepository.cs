using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Database.Repository
{
    public class CommentRepository : ICommentRepository
    {
        readonly AppContext appContext;

        public CommentRepository(AppContext appContext)
        {
            this.appContext = appContext;
        }

        public async Task AddAsync(Comment entity)
        {
            await appContext.Comments.AddAsync(entity); 
        }

        public void Delete(Comment entity)
        {
            appContext.Comments.Remove(entity);
        }

        public async Task DeleteByIdAsync(int id)
        {
            Delete(await GetByIdAsync(id));
        }

        public async Task<IEnumerable<Comment>> GetAllAsync()
        {
            return await appContext.Comments.ToListAsync();
        }

        public async Task<IEnumerable<Comment>> GetAllWithDetailsAsync()
        {
            return await appContext.Comments
                .Include(t => t.Person)
                .Include(t => t.Post)
                .ToListAsync();
        }

        public async Task<Comment> GetByIdAsync(int id)
        {
            return await appContext.Comments.FindAsync(id);
        }

        public async Task<Comment> GetByIdWithDetailsAsync(int id)
        {
            return await appContext.Comments
                .Include(t => t.Person)
                .Include(t => t.Post)
                .FirstOrDefaultAsync(t => t.Id == id);
        }

        public void Update(Comment entity)
        {
            appContext.Comments.Update(entity);
        }
    }
}
