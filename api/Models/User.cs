namespace API.Models 
{
    public class User
    {
        public int UserId { get; set; }

        public required string FirstName { get; set; }

        public required string LastName { get; set; }
        
        public required string Username { get; set; }

        public required string Email { get; set; }

        public required string UserPassword { get; set; }
    }


    public class UserLogin
    {
        public string? Username { get; set; }

        public string? Email { get; set; }

        public required string Password { get; set; }
    }
}