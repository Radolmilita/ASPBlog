using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IPersonRepository : IRepository<Person>
    {
        Task<IEnumerable<Person>> GetAllWithDetailsAsync();

        Task<Person> GetByIdWithDetailsAsync(int id);
    }
}
