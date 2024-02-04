using Bussiness_layer.interfaces;
using data_access_layer.Model;
using data_access_layer.repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Bussiness_layer.BDC
{
   public class carservice : Icarservice

    {
        public readonly Icarrepository _repository;
        public carservice(Icarrepository icarrepository)
        {
            _repository = icarrepository;
        }
        
        public Task<List<Car>> CreateCar(Car car)
        {
            return _repository.CreateCar(car);
        }

        public Task<List<Car>> DeleteCar(int id)
        {
            return _repository.DeleteCar(id);
        }

        public Task<Car> getCardetails(int id)
        {
            return _repository.getCardetails(id);
        }

        public Task<List<Car>> GetCars()
        {
            return _repository.GetCars();
        }

        public Task<List<Car>> UpdateCar(Car car)
        {
            return _repository.UpdateCar(car);
        }
    }
}
