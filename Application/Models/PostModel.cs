namespace Application.Models
{
    public class PostModel
    {
        public int Id { get; set; }

        public string? Title { get; set; }

        public string? Content { get; set; }

        public DateTime DateCreated { get; set; }

        public int PersonId { get; set; }

        public ICollection<int>? CommentIds { get; set; }
    }
}
