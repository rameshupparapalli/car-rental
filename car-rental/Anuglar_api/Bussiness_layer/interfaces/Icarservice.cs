using data_access_layer.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Bussiness_layer.interfaces
{
    public interface Icarservice
    {
        Task<List<Car>> GetCars();
        Task<Car> getCardetails(int id);
        Task<List<Car>> CreateCar(Car car);
        Task<List<Car>> UpdateCar(Car car);
        Task<List<Car>> DeleteCar(int id);



    }
}
