using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace data_access_layer.Model
{
    public class Users
    {
        [Key]
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public string Role { get; set; }
        public string Token { get; set; }
    }
}
