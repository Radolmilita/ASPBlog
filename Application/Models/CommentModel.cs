using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models
{
    public class CommentModel
    {
        public int Id { get; set; }
        public string? Content { get; set; }
        public DateTime? DateCreated { get; set; }
        public int PersonId { get; set; }
        public int PostId { get; set; }
    }
}
