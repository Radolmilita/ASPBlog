using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
