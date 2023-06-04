
namespace BookStore.Exceptions;
using System.Net;

class NotFoundException : BaseAppException
{
    public NotFoundException(string message) : base(message, HttpStatusCode.NotFound)
    {
    }
}