namespace Application.Models
{
    public class PersonModel
    {
        public int? Id { get; set; }

        public string? Login { get; set; }

        public string? Password { get; set; }

        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public DateTime? BirthDate { get; set; }

        public ICollection<int>? PostIds { get; set; }

        public ICollection<int>? CommentIds { get; set; }
    }
}
