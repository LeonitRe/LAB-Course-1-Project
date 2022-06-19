
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

   namespace BestTrainerAPI_ASP.NET.Models
    {
        public class TrainerDbContext : DbContext
        {
            public TrainerDbContext(DbContextOptions<TrainerDbContext> options) : base(options)
            {

            }

            public DbSet<TrainerModel> Trainers { get; set; }
        }
    }

