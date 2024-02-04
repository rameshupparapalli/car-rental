using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace data_access_layer.Model
{
   
        public class Booking
        {
            [Key]

            public int Id { get; set; }
            [Required]
            public string Carid { get; set; }
            [Required]
            public string Maker { get; set; }
            [Required]
            public string Brand { get; set; }
            [Required]
            public string Image { get; set; }
            [Required]
            public int Rentalprice { get; set; }
            [Required]
            public string startdate { get; set; }
            [Required]
            public string enddate { get; set; }
            [Required]
            public int noofdays { get; set; }

            [Required]
            public int totalprice { get; set; }
            [Required]
            public string email { get; set; }
            public bool IsBooked { get; set; }
            
            public string request { get; set; }



    }
    
}
