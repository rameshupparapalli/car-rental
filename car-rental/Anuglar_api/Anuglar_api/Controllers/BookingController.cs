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
    public class BookingController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly Ibookingservice _bookingservice;
        public BookingController(DataContext context,Ibookingservice ibookingservice)
        {
            _context = context;
            _bookingservice = ibookingservice;
        }
        [HttpPost]
        public async Task<ActionResult<List<Booking>>> BookingCar(Booking book)
        {

          
            return await _bookingservice.BookingCar(book);


        }
        [HttpGet]

        public async Task<ActionResult<List<Booking>>> bookedcars()
        {
            var bookedcars = await _bookingservice.bookedcars();
            return Ok(bookedcars);
         

        }

        [HttpGet]
        [Route("{id}")]

        public async Task<ActionResult> getCarUpdatedetails(int id)
        {
           
            var cardetails = await _bookingservice.getCarUpdatedetails(id);
            return Ok(cardetails);
        }



        [HttpPut]
        public async Task<ActionResult<List<Booking>>> UpdateBookedCar(Booking booking)
        {
            var updatedbookdata = await _bookingservice.UpdateBookedCar(booking);
            if(updatedbookdata == null)
            {
                return BadRequest("Car not Found..");
            }
            return Ok(updatedbookdata);

        }
        [HttpDelete("{id}")]

        public async Task<ActionResult<List<Booking>>> DeleteBookedCar(int id)
        {
            var deleteddata = await _bookingservice.DeleteBookedCar(id);
            if (deleteddata == null)
            {
                return BadRequest("Car not Found..");
            }
            return Ok(deleteddata);


        }

        [HttpPut("updateisbooking/{id}/{isbooked}")]
        public async Task<ActionResult<List<Booking>>> updateisbooking(int id,bool isbooking)
        {
           
            var isdata = await _bookingservice.updateisbooking(id, isbooking);
            if (isdata == null)
            {
                return NotFound();
            }
            return Ok(isdata);

        }

        [HttpGet("getbookedcar/{carid}")]

       public async Task<ActionResult<List<Booking>>> getbookedcar(string carid)
        {
           
            var getdata = await _bookingservice.getbookedcar(carid);
            if (getdata == null || !getdata.Any())
            {
                return NotFound(new { Message = "car is not found" });
            }
            else
            {
                return Ok(getdata);
            }
            




        }



    }
}
