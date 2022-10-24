﻿namespace Domain.Entities
{
    public class Person : BaseEntity
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public DateTime BirthDate { get; set; }
        public string? Bio { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime? TokenExireTime { get; set; }
        public string? Login { get; set; }
        public string? Password { get; set; }

        public ICollection<Post>? Posts { get; set; }
        public ICollection<Comment>? Comments { get; set; }
    }
}
