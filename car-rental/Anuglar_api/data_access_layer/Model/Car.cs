using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace data_access_layer.Model
{
    public class Car
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
        public string Availability { get; set; }
    }
}
