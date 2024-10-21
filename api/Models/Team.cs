namespace API.Models 
{
    using System.ComponentModel.DataAnnotations;

    public class Team
    {
        public int TeamID { get; set; }

        [MaxLength(100)]
        public required string TeamName { get; set; }

        public int? TeamCaptainID { get; set; } 

        public DateTime? CreatedAt { get; set; }
    }
}