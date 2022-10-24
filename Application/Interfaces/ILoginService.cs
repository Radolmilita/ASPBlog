using Application.Models;

namespace Application.Interfaces
{
    public interface ILoginService
    {
        Task<TokenApiModel> Login(LoginModel model);
    }
}
