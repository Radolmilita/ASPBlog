using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models
{
    public class PersonModel
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public DateTime? BirthDate { get; set; }
        public string? Bio { get; set; }
        public ICollection<int>? PostIds { get; set; }
        public ICollection<int>? CommentIds { get; set; }
    }
}
