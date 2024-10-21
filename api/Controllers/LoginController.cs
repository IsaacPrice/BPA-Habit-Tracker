using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
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

            var token = GenerateJwtToken(user);
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

            var token = GenerateJwtToken(newUser);
            return Ok(new RegisterResponse { Token = token });
        }

        private string GenerateJwtToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("68PUN6mq5d7RXePR2YQY7TuwuwueUPmh"));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: "yourIssuer",
                audience: "yourAudience",
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
