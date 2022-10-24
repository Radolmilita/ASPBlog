using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IPostRepository : IRepository<Post>
    {
        Task<IEnumerable<Post>> GetAllWithDetailsAsync();
        Task<Post> GetByIdWithDetailsAsync(int id);
    }
}
