namespace Application.Models
{
    public class PostModel
    {
        public string? Title { get; set; }
        public string? Body { get; set; }
        public DateTime? DateCreated { get; set; }
        public int? PersonId { get; set; }
        public ICollection<int>? CommentIds { get; set; }
    }
}
