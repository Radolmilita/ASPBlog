using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface ICrud<T> where T: class
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<T> GetAllByIdAsync(int id);
        Task AddAsync(T model);
        Task UpdateAsync(T model);
        Task DeleteAsync(int id);
    }
}
