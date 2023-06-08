
namespace BookStore.Exceptions;
using System.Net;

class BadRequestException : BaseAppException
{
    public BadRequestException(string message) : base(message, HttpStatusCode.BadRequest)
    {
    }
}