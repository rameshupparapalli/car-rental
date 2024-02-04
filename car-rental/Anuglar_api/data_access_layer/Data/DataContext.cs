using data_access_layer.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace data_access_layer.Data
{
   
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Car> Cars { get; set; }
        public DbSet<Users> usersdata { get; set; }

       public DbSet<Booking> userbookings { get; set; }




    }
}
