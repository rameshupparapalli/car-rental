using data_access_layer.Data;
using data_access_layer.Model;
using data_access_layer.repository.interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data_access_layer.repository
{
   public class bookingrepository:Ibookingrepository
    {
        private readonly DataContext _context;
        public bookingrepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Booking>> bookedcars()
        {
            return await _context.userbookings.ToListAsync();
        }

        public async Task<List<Booking>> BookingCar(Booking book)
        {
            book.request = "request";
            book.IsBooked = false;
            _context.userbookings.Add(book);
            await _context.SaveChangesAsync();
            return await _context.userbookings.ToListAsync();
        }

        public async Task<List<Booking>> DeleteBookedCar(int id)
        {
            var dbCar = await _context.userbookings.FindAsync(id);
            if (dbCar == null)
            {
                return null;
            }

            _context.userbookings.Remove(dbCar);
            await _context.SaveChangesAsync();

            return await _context.userbookings.ToListAsync();
        }

        public async Task<List<Booking>> getbookedcar(string carid)
        {
            var car = await _context.userbookings.Where(x => x.Carid == carid).ToListAsync();
            if (car == null || !car.Any())
            {
                return null;
            }
            else
            {
                return car;
            }
        }

        public async Task<Booking> getCarUpdatedetails(int id)
        {
            var carupdatedetails = await _context.userbookings.FirstOrDefaultAsync(x => x.Id == id);
            return carupdatedetails;
        }

        public async Task<List<Booking>> UpdateBookedCar(Booking booking)
        {
            var dbCar = await _context.userbookings.FindAsync(booking.Id);
            if (dbCar == null)
            {
                return null;
            }
            dbCar.Carid = booking.Carid;
            dbCar.startdate = booking.startdate;
            dbCar.enddate = booking.enddate;
            dbCar.noofdays = booking.noofdays;
            dbCar.totalprice = booking.totalprice;
            dbCar.IsBooked = booking.IsBooked;
            dbCar.request = booking.request;


            await _context.SaveChangesAsync();
            return await _context.userbookings.ToListAsync();
        }

        public async Task<List<Booking>> updateisbooking(int id, bool isbooking)
        {
            var car = await _context.userbookings.FindAsync(id);
            if (car == null)
            {
                return null;
            }
            car.IsBooked = isbooking;
            _context.Entry(car).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return await _context.userbookings.ToListAsync();
        }
    }
}
