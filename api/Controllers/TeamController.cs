using API.Data;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TeamController : ControllerBase
    {
        private readonly DataBaseContext _context;


        public TeamController(DataBaseContext context)
        {
            _context = context;
        }


        [HttpPost("CreateTeam")]
        public IActionResult CreateTeam([FromBody] Team team)
        {
            var existingTeam = _context.Teams.FirstOrDefault(t => t.TeamName == team.TeamName);

            if (existingTeam != null)
            {
                return BadRequest("Team already exists");
            }

            _context.Teams.Add(team);
            _context.SaveChanges();
            return NoContent();
        }

        [HttpGet("ReadTeam/{id}")]
        [ProducesResponseType(typeof(Team), StatusCodes.Status200OK)]
        public IActionResult ReadTeam(int id)
        {
            var team = _context.Teams.FirstOrDefault(team => team.TeamID == id);
            if (team == null)
            {
                return NotFound();
            }
            return Ok(team);
        }

        [HttpPut("UpdateTeam/{id}")]
        public IActionResult UpdateTeam(int id, [FromBody] Team updatedTeam)
        {
            var team = _context.Teams.FirstOrDefault(team => team.TeamID == id);
            if (team == null)
            {
                return NotFound();
            }

            team.TeamName = updatedTeam.TeamName;
            team.TeamCaptainID = updatedTeam.TeamCaptainID;

            _context.Teams.Update(team);
            _context.SaveChanges();

            return NoContent();
        }

        [HttpDelete("DeleteTeam/{id}")]
        public IActionResult DeleteTeam(int id)
        {
            var team = _context.Teams.FirstOrDefault(team => team.TeamID == id);
            if (team == null)
            {
                return NotFound();
            }
            _context.Teams.Remove(team);
            _context.SaveChanges();
            return NoContent();
        }

        [HttpGet("EnumerateTeam")]
        [ProducesResponseType(typeof(Team[]), StatusCodes.Status200OK)]
        public IActionResult EnumerateTeam()
        {
            return Ok(_context.Teams);
        }
    }
}