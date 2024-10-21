using Microsoft.EntityFrameworkCore;
using API.Models;


namespace API.Data
{
    public class DataBaseContext : DbContext
    {
        public DataBaseContext(DbContextOptions<DataBaseContext> options) : base(options) {}

        public DbSet<User> Users { get; set; }
        public DbSet<Team> Teams { get; set; }
    }
}
