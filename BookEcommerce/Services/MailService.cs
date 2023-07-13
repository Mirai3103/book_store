
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Text.Json;
using BookStore.Dto;
using BookStore.Services.Interfaces;
using Microsoft.Extensions.Options;

namespace BookStore.Services;
public class MailService : IMailService
{
    private readonly MailSetting _mailSetting;
    public MailService(IOptions<MailSetting> mailSetting)
    {
        _mailSetting = mailSetting.Value;
    }

    public Task<bool> SendEmailAsync(MailRequest mailRequest)
    {

        MailMessage message = new()
        {
            From = new MailAddress(_mailSetting.From, _mailSetting.DisplayName),
            Subject = mailRequest.Subject,
            Body = mailRequest.Body,
            IsBodyHtml = true,
            Priority = mailRequest.Priority,
            BodyEncoding = Encoding.UTF8,
            SubjectEncoding = Encoding.UTF8,
            To = { mailRequest.ToEmail }
        };
        SmtpClient client = new(_mailSetting.Host, _mailSetting.Port)
        {
            Credentials = new NetworkCredential(_mailSetting.From, _mailSetting.Password),
            EnableSsl = true,
            TargetName = "STARTTLS/" + _mailSetting.Host

        };
        try
        {
            client.Send(message);
            return Task.FromResult(true);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return Task.FromResult(false);
        }
    }
}