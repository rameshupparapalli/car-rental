using Bussiness_layer.interfaces;
using data_access_layer.Model;
using data_access_layer.repository.interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Bussiness_layer.BDC
{
    public class bookingservice : Ibookingservice
    {

        public readonly Ibookingrepository _repository;
        public bookingservice(Ibookingrepository ibookingrepository)
        {
            _repository = ibookingrepository;
        }

        public Task<List<Booking>> bookedcars()
        {
            return _repository.bookedcars();
        }

        public Task<List<Booking>> BookingCar(Booking book)
        {
            return _repository.BookingCar(book);
        }

        public Task<List<Booking>> DeleteBookedCar(int id)
        {
            return _repository.DeleteBookedCar(id);
        }

        public Task<List<Booking>> getbookedcar(string carid)
        {
            return _repository.getbookedcar(carid);
        }

        public Task<List<Booking>> UpdateBookedCar(Booking booking)
        {
            return _repository.UpdateBookedCar(booking);
        }

        public Task<List<Booking>> updateisbooking(int id, bool isbooking)
        {
            return _repository.updateisbooking(id, isbooking);
        }

        Task<Booking> Ibookingservice.getCarUpdatedetails(int id)
        {
            return _repository.getCarUpdatedetails(id);
        }
    }
}
