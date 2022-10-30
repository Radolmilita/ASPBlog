using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;


namespace Infrastructure.Database
{
    public class BloggingContextFactory : IDesignTimeDbContextFactory<AppContext>
    {
        public AppContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<AppContext>();
            optionsBuilder.UseSqlServer(@"Server=DESKTOP-2P8PEBK\radol;Database=Blog;Trusted_Connection=True;");

            return new AppContext(optionsBuilder.Options);
        }
    }
}
