using Application.Interfaces;
using Application.Models;
using Application.Validation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

        public async Task<TokenApiModel> Refresh(TokenApiModel tokenApiModel)
        {
            Validation(tokenApiModel);

            var accessToken = tokenApiModel.AccessToken;

            var refreshToken = tokenApiModel.RefreshToken;

            var principal = token.GetPrincipalFromExpiredToken(accessToken);

            var username = principal.Identity.Name;

            var user = (await unitOfWork.PersonRepository.GetAllAsync())
                .FirstOrDefault(t => t.Login == username);

            if (user is null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
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

        public async Task Revoke(TokenApiModel tokenApiModel)
        {
            Validation(tokenApiModel);

            var principal = token.GetPrincipalFromExpiredToken(tokenApiModel.AccessToken);

            var username = principal.Identity.Name;

            var user = (await unitOfWork.PersonRepository.GetAllAsync())
                .FirstOrDefault(t => t.Login == username);

            if (user == null)
                throw new BlogException("User not found.");

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
