namespace Domain.Entities
{
    public class Comment : BaseEntity
    {
        public string? Content { get; set; }

        public DateTime? DateCreated { get; set; }

        public int? PersonId { get; set; }

        public int? PostId { get; set; }

        public Person? Person { get; set; }

        public Post? Post { get; set; }
    }
}
