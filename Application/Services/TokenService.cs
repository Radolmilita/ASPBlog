using Application.Interfaces;
using Application.Models;
using Application.Validation;

namespace Application.Services
{
    public class TokenService : ITokenService
    {
        readonly IUnitOfWork unitOfWork;

        readonly IToken token;

        public TokenService(IUnitOfWork unitOfWork, IToken token)
        {
            this.unitOfWork = unitOfWork;
            this.token = token;
        }

        public async Task<TokenApiModel> Refresh(TokenApiModel model)
        {
            Validation(model);

            var accessToken = model.AccessToken;

            var refreshToken = model.RefreshToken;

            var principal = token.GetPrincipalFromExpiredToken(accessToken);

            var username = principal.Identity.Name;

            var user = (await unitOfWork.PersonRepository.GetAllAsync())
                .FirstOrDefault(t => t.Login == username);

            if (user is null || user.RefreshToken != refreshToken || user.TokenExireTime <= DateTime.Now)
                throw new BlogException("Invalid request.");

            var newAccessToken = token.GenerateAccessToken(principal.Claims);

            var newRefreshToken = token.GenerateRefreshToken();

            user.RefreshToken = newRefreshToken;

            await unitOfWork.SaveAsync();

            return new TokenApiModel()
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken
            };
        }

        public async Task Revoke(TokenApiModel model)
        {
            Validation(model);

            var principal = token.GetPrincipalFromExpiredToken(model.AccessToken);

            var username = principal.Identity.Name;

            var user = (await unitOfWork.PersonRepository.GetAllAsync())
                .FirstOrDefault(t => t.Login == username);

            if (user == null)
                throw new BlogException("User haven't been found.");

            user.RefreshToken = null;

            await unitOfWork.SaveAsync();
        }

        static void Validation(TokenApiModel model)
        {
            if (model is null)
                throw new BlogException("Model is null.");

            if (model.AccessToken == string.Empty || model.RefreshToken == string.Empty)
                throw new BlogException("Access token or refresh token is empty.");
        }
    }
}
