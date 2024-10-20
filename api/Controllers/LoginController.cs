using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;


namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly DataBaseContext _context;


        public LoginController(DataBaseContext context)
        {
            _context = context;
        }


        [HttpPost("login")]
        [ProducesResponseType(typeof(LoginResponse), StatusCodes.Status200OK)]
        public IActionResult Login([FromBody] UserLogin loginUser)
        {
            User user;
            
            if (!string.IsNullOrEmpty(loginUser.Username))
            {
                user = _context.Users.FirstOrDefault(u => u.Username == loginUser.Username);
            }
            else if (!string.IsNullOrEmpty(loginUser.Email))
            {
                user = _context.Users.FirstOrDefault(u => u.Email == loginUser.Email);
            }
            else 
            {
                return BadRequest("Username or Email is required");
            }

            if (user == null || user.UserPassword != loginUser.Password)
            {
                return Unauthorized();
            }

            var token = GenerateToken(user);
            return Ok(new LoginResponse{ Token = token });
        }


        [HttpPost("register")]
        [ProducesResponseType(typeof(RegisterResponse), StatusCodes.Status200OK)]
        public IActionResult Register([FromBody] User newUser)
        {
            var existingUser = _context.Users.FirstOrDefault(u => u.Username == newUser.Username);

            if (existingUser != null)
            {
                return Conflict("Username already exists");
            }

            _context.Users.Add(newUser);
            _context.SaveChanges();

            var token = GenerateToken(newUser);
            return Ok(new RegisterResponse { Token = token });
        }

        private string GenerateToken(User user)
        {
            return Convert.ToBase64String(Guid.NewGuid().ToByteArray());
        }
    }
}
