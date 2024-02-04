using data_access_layer.Data;
using data_access_layer.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Anuglar_api.Controllers
{
   

        [Route("api/[controller]")]
        [ApiController]
        public class UserController : ControllerBase
        {
            private readonly DataContext _authContext;
            public UserController(DataContext dataContext)
            {
                _authContext = dataContext;

            }
            [HttpPost("authenticate")]
            public async Task<IActionResult> Authenticate([FromBody] Users userObj)
            {
               if (userObj == null)
                {

                    return BadRequest();

                }
                var user = await _authContext.usersdata.FirstOrDefaultAsync(x => x.Email == userObj.Email && x.Password == userObj.Password);

                if (user == null)
                {
                    return NotFound(new { Message = "User Not Found" });
                }
                user.Token = CreateJwt(user);
                return Ok(new
                {
                    Token = user.Token,
                    Message = "Login Success"
                });
            }

            private string CreateJwt(Users user)
            {
                var jwtTokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes("veryverysecret.....");
                var claims = new ClaimsIdentity(new Claim[]
                {
                new Claim(ClaimTypes.Role,user.Role),
                new Claim(ClaimTypes.Email, user.Email),


                });
                var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = claims,
                    Expires = DateTime.Now.AddDays(1),
                    SigningCredentials = credentials
                };

                var token = jwtTokenHandler.CreateToken(tokenDescriptor);
                return jwtTokenHandler.WriteToken(token);
            }

        }
    }

