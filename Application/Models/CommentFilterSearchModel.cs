namespace Application.Models
{
    public class CommentFilterSearchModel
    {
        public int? PostId { get; set; }
        public int? PersonId { get; set; }
        public int? Page { get; set; }
        public int? Limit { get; set; }
    }
}
