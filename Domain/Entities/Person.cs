namespace Domain.Entities
{
    public class Person : BaseEntity
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public DateTime? BirthDate { get; set; }
        public string? Bio { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
        public int TokenId { get; set; }
        public Token? Token { get; set; }
        public ICollection<Post>? Posts { get; set; }
        public ICollection<Comment>? Comments { get; set; }
    }
}
