using Domain.Entities;

namespace Domain.Interfaces
{
    public interface ICommentRepository : IRepository<Comment>
    {
        Task<IEnumerable<Comment>> GetAllWithDetailsAsync();

        Task<Comment> GetByIdWithDetailsAsync(int id);
    }
}
