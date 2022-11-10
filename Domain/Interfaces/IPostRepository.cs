using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IPostRepository : IRepository<Post>
    {
        Task<IEnumerable<Post>> GetAllWithDetailsAsync();

        Task<Post> GetByIdWithDetailsAsync(int id);
    }
}
