using data_access_layer.Data;
using data_access_layer.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace data_access_layer.repository
{
    public class carrepository : Icarrepository
    {
        public readonly DataContext _context;

        public carrepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Car>> CreateCar(Car car)
        {
            _context.Cars.Add(car);
            await _context.SaveChangesAsync();
            return await _context.Cars.ToListAsync();
        }

        public async Task<List<Car>> DeleteCar(int id)
        {
            var dbCar = await _context.Cars.FindAsync(id);
            if (dbCar == null)
            {
                return null;
            }

            _context.Cars.Remove(dbCar);
            await _context.SaveChangesAsync();

            return await _context.Cars.ToListAsync();
        }

        public async Task<Car> getCardetails(int id)
        {
            return await _context.Cars.FirstOrDefaultAsync(x => x.Id == id);
           
        }

        public Task<List<Car>> GetCars()
        {
            return _context.Cars.ToListAsync();
        }

        public async Task<List<Car>> UpdateCar(Car car)
        {
            var dbCar = await _context.Cars.FindAsync(car.Id);
            if (dbCar == null)
            {
                return null;
            }
            dbCar.Carid = car.Carid;
            dbCar.Maker = car.Maker;
            dbCar.Brand = car.Brand;
            dbCar.Image = car.Image;
            dbCar.Rentalprice = car.Rentalprice;
            dbCar.Availability = car.Availability;

            await _context.SaveChangesAsync();
            return await _context.Cars.ToListAsync();
        }
    }
}
