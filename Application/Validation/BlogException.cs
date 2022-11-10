using System.Runtime.Serialization;

namespace Application.Validation
{
    [Serializable]
    public class BlogException : Exception
    {
        public BlogException() : base() { }

        public BlogException(string message) : base(message) { }

        public BlogException(string message, Exception innerException) : base(message, innerException) { }

        protected BlogException(SerializationInfo info, StreamingContext context) : base(info, context) { }

    }
}
