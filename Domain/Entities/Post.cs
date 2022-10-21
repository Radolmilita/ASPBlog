using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Post : BaseEntity
    {
        public string? Title { get; set; }
        public string? Body { get; set; }
        public DateTime? DateCreated { get; set; }
        public int? PersonId { get; set; }
        public Person? Person { get; set; }
        public ICollection<Comment>? Comments { get; set; }

    }
}
