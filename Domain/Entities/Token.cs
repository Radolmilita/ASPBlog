using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Token : BaseEntity
    {
        public string? RefreshToken { get; set; }
        public DateTime? TokenExireTime { get; set; }
        public string? PersonId { get; set; }
        public Person? Person { get; set; }
    }
}
