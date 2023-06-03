using System.Text.RegularExpressions;

namespace BookStore.Utils;

public static class SlugExtension
{
    public static string GenerateSlug(this string text)
    {
        for (int i = 32; i < 48; i++)
        {

            text = text.Replace(((char)i).ToString(), " ");

        }
        text = text.Replace(".", "-");

        text = text.Replace(" ", "-");

        text = text.Replace(",", "-");

        text = text.Replace(";", "-");

        text = text.Replace(":", "-");

        Regex regex = new Regex(@"\p{IsCombiningDiacriticalMarks}+");

        string strFormD = text.Normalize(System.Text.NormalizationForm.FormD);

        return regex.Replace(strFormD, String.Empty).Replace('\u0111', 'd').Replace('\u0110', 'D');

    }

}