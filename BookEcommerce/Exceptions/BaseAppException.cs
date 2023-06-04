

using System.Net;
using System.Text.Json;

namespace BookStore.Exceptions
{
    public class BaseAppException : Exception
    {
        public HttpStatusCode StatusCode { get; set; }
        public BaseAppException(string message, HttpStatusCode statusCode) : base(message)
        {
            StatusCode = statusCode;
        }
        public override string ToString()
        {
            return JsonSerializer.Serialize(new
            {
                StatusCode,
                Message
            });
        }
    }
}