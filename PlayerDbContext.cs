using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BestPlayerCrud.Models;

namespace BestPlayerCrud.Models
{
    public class PlayerDbContext : DbContext
    {
        public PlayerDbContext(DbContextOptions<PlayerDbContext> options)
        :   base(options)
        {

        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=DESKTOP-A7HUBPS;Database=PlayerDB;Trusted_Connection=True;");
        }
        public DbSet<BestPlayerCrud.Models.PlayerModel> PlayerModel { get; set; }
        public IEnumerable<object> Player { get; internal set; }
    }
    /*public partial class MyContext : DbContext
    {
        public virtual DbSet<Best_Player.Models.PlayerModel> Player { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured) { optionsBuilder.UseSqlServer(Program.Conn); }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) { .... }
    }*/
}
