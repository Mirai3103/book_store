

using System.Net.Mail;

namespace BookStore.Dto;
public class MailRequest
{
    public string ToEmail { get; set; } = null!;
    public string Subject { get; set; }
    public string Body { get; set; }
    public MailPriority Priority { get; set; } = MailPriority.Normal;
}
public class MailSetting
{
    public string From { get; set; } = null!;
    public string DisplayName { get; set; } = null!;
    public string Host { get; set; } = null!;
    public int Port { get; set; }
    public string Password { get; set; } = null!;
}
