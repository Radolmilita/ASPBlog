using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Infrastructure.Tokens
{
    public static class TokenParameters
    {
        public const string SEKRET_KEY = "valeriy`sSekretKey";

        public const string ISSUER = "MyServer";

        public const string AUDIENCE = "MyClient";
    }
}
