using data_access_layer.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace data_access_layer.repository.interfaces
{
   public interface Ibookingrepository
    {
        Task<List<Booking>> BookingCar(Booking book);
        Task<List<Booking>> bookedcars();
        Task<Booking> getCarUpdatedetails(int id);
        Task<List<Booking>> UpdateBookedCar(Booking booking);
        Task<List<Booking>> DeleteBookedCar(int id);
        Task<List<Booking>> updateisbooking(int id, bool isbooking);
        Task<List<Booking>> getbookedcar(string carid);


    }
}
