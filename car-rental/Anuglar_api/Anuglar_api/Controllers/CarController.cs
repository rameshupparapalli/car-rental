using Bussiness_layer.interfaces;
using data_access_layer.Data;
using data_access_layer.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Anuglar_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly Icarservice _service;
        public CarController(DataContext context,Icarservice icarservice)
        {
            _context = context;
            _service = icarservice;

        }


        [HttpGet]

        public async Task<ActionResult<List<Car>>> GetCars()
        {
            var cars = await _service.GetCars();
            return Ok(cars);

        }

        [HttpGet]
        [Route("{id}")]

        public async Task<ActionResult> getCardetails(int id)
        {
           
            var cardata = await _service.getCardetails(id);
            return Ok(cardata);
        }



        [HttpPost]
        public async Task<ActionResult<List<Car>>> CreateCar(Car car)
        {
            
            var data = await _service.CreateCar(car);
            return Ok(data);

        }

        [HttpPut]
        public async Task<ActionResult<List<Car>>> UpdateCar(Car car)
        {
          
            var updateddata = await _service.UpdateCar(car);
            if (updateddata == null)
            {
                return BadRequest("Car not Found..");
            }
            return Ok(updateddata);



        }

        [HttpDelete("{id}")]

        public async Task<ActionResult<List<Car>>> DeleteCar(int id)
        {
           
            var deleteddata= await _service.DeleteCar(id);
            if (deleteddata == null)
            {
                return BadRequest("Car not Found..");
            }

            return Ok(deleteddata);

        }

    }
}
