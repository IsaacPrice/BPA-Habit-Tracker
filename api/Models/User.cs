namespace API.Models 
{
    using System.ComponentModel.DataAnnotations;

    public class User
    {
        public int UserId { get; set; }

        [MaxLength(50)]
        public required string FirstName { get; set; }

        [MaxLength(50)]
        public required string LastName { get; set; }
        
        [MaxLength(50)]
        public required string Username { get; set; }

        [MaxLength(100)]
        public required string Email { get; set; }

        [MaxLength(255)]
        public required string UserPassword { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public DateTime? LastLoginAt { get; set; }
    }


    public class UserLogin
    {
        public string? Username { get; set; }

        public string? Email { get; set; }

        public required string Password { get; set; }
    }
}