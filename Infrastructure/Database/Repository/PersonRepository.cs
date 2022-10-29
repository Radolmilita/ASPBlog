using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Database.Repository
{
    public class PersonRepository : IPersonRepository
    {
        readonly AppContext context;

        public PersonRepository(AppContext context) 
        {
            this.context = context;
        }

        public async Task AddAsync(Person entity) => await context.People.AddAsync(entity);

        public void Delete(Person entity) => context.People.Remove(entity);

        public async Task DeleteByIdAsync(int id) => Delete(await GetByIdAsync(id));

        public async Task<IEnumerable<Person>> GetAllAsync() => await context.People.ToListAsync();

        public async Task<IEnumerable<Person>> GetAllWithDetailsAync()
        {
            return await context.People
                .Include(t => t.Posts)
                .Include(t => t.Comments)
                .ToListAsync();
        }

        public async Task<Person> GetByIdAsync(int id) => await context.People.FindAsync(id);

        public async Task<Person> GetByIdWithDetailsAsync(int id)
        {
            return await context.People
                .Include(t => t.Posts)
                .Include(t => t.Comments)
                .FirstOrDefaultAsync(t => t.Id == id);
        }

        public void Update(Person entity)
        {
            context.People.Update(entity);
        }
    }
}
