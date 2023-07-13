namespace BookStore.Services.Interfaces;
using BookStore.Dto;


public interface IMailService
{
    Task<bool> SendEmailAsync(MailRequest mailRequest);

}