using Application.Interfaces;
using Application.Models;
using Application.Validation;
using System.Security.Claims;

namespace Application.Services
{
    public class LoginService : ILoginService
    {
        readonly IUnitOfWork unitOfWork;

        readonly IToken token;

        public LoginService(IUnitOfWork unitOfWork, IToken token)
        {
            this.unitOfWork = unitOfWork;
            this.token = token;
        }

        public async Task<TokenApiModel> Login(LoginModel model)
        {
            Validation(model);

            var user = (await unitOfWork.PersonRepository.GetAllAsync())
                .FirstOrDefault(t => t.Login == model.Login && t.Password == model.Password);

            if (user is null)
                throw new BlogException("User not found.");

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, model.Login)
            };

            var accessToken = token.GenerateAccessToken(claims);

            var refreshToken = token.GenerateRefreshToken();

            user.RefreshToken = refreshToken;

            user.RefreshTokenExpiryTime = DateTime.Now.AddDays(7);

            await unitOfWork.SaveAsync();

            return new TokenApiModel
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken
            };
        }

        static void Validation(LoginModel model)
        {
            if (model is null)
                throw new BlogException("Model is null.");

            if (model.Login == string.Empty || model.Password == string.Empty)
                throw new BlogException("Login or password is empty.");
        }
    }
}
