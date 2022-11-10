using Microsoft.EntityFrameworkCore;

namespace Infrastructure.DataBase
{
    public class ContextApp : DbContext
    {
        public DbSet<Person> People { get; set; }

        public DbSet<Post> Posts { get; set; }

        public DbSet<Comment> Comments { get; set; }

        public ContextApp(DbContextOptions options) : base(options) { }

        //public ContextApp() { }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseSqlServer(@"Server=DESKTOP-2P8PEBK;Database=BlogLab;Trusted_Connection=True;");
        //}

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<Post>()
        //        .HasOne<Person>(t => t.Person)
        //        .WithMany(t => t.Posts)
        //        .HasForeignKey(t => t.PersonId)
        //        .OnDelete(DeleteBehavior.NoAction);
        //    modelBuilder.Entity<Person>()
        //            .Property(e => e.BirthDate)
        //            .HasColumnType("date");
        //}
    }
}
