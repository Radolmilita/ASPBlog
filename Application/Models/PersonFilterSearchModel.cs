using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models
{
    public class PersonFilterSearchModel
    {
        public string? PersonName { get; set; }

        public int? Page { get; set; }

        public int? Limit { get; set; }

        public bool Order { get; set; } = false;
    }
}
