using Infrastructure.DataBase;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.DataBase.Repository
{
    public class PersonRepository : IPersonRepository
    {
        readonly ContextApp contextApp;

        public PersonRepository(ContextApp contextApp)
        {
            this.contextApp = contextApp;
        }

        public async Task AddAsync(Person entity)
        {
            await contextApp.People.AddAsync(entity);
        }

        public void Delete(Person entity)
        {
            contextApp.People.Remove(entity);
        }

        public async Task DeleteByIdAsync(int id)
        {
            Delete(await GetByIdAsync(id));
        }

        public async Task<IEnumerable<Person>> GetAllAsync()
        {
            return await contextApp.People.ToListAsync();
        }

        public async Task<IEnumerable<Person>> GetAllWithDetailsAsync()
        {
            return await contextApp.People
                .Include(t => t.Posts)
                .Include(t => t.Comments)
                .ToListAsync();
        }

        public async Task<Person> GetByIdAsync(int id)
        {
            return await contextApp.People.FindAsync(id);
        }

        public async Task<Person> GetByIdWithDetailsAsync(int id)
        {
            return await contextApp.People
                .Include(t => t.Posts)
                .Include(t => t.Comments)
                .FirstOrDefaultAsync(t => t.Id == id);
        }

        public void Update(Person entity)
        {
            contextApp.People.Update(entity);
        }
    }
}
