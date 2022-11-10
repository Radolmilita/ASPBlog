using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ILoginService loginService;

        public AuthController(ILoginService loginService)
        {
            this.loginService = loginService;
        }

        [HttpPost]
        public async Task<ActionResult<TokenApiModel>> Login([FromBody] LoginModel loginModel)
        {
            try
            {
                var model = await loginService.Login(loginModel);

                return Ok(model);
            }
            catch (BlogException ex)
            {
                return Unauthorized(ex);
            }
        }
    }
}
