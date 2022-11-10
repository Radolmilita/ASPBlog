using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models
{
    public class PostFilterSearchModel
    {
        public int? PersonId { get; set; }

        public int? Page { get; set; }

        public int? Limit { get; set; }

        public bool Order { get; set; } = false;

        public bool Date { get; set; } = false;

        public string? Title { get; set; }

        public string? PersonName { get; set; }
    }
}
