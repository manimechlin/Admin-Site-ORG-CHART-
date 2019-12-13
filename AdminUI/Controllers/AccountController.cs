using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AdminUI.Models;
using AdminUI.ViewModel;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
namespace AdminUI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        // GET: api/Account
        [Authorize]
        [HttpGet]
        public IEnumerable<string> Get()
        {
            var login = HttpContext.User.Identity.IsAuthenticated;
            //var list = HttpContext.User.Claims.ToList();
            var list=HttpContext.Request?.Headers["Authorization"].ToString().Split(' ');
            var code = HttpContext.User.Claims.ToList();
            var handler = new JwtSecurityTokenHandler();
            var tokenS = handler.ReadToken(list[1]) as JwtSecurityToken;
          
    var jti = tokenS.Claims.First(claim => claim.Type == "issuer").Value;
            return new string[] { "value1", "value2" };
        }
        [Route("token")]
        public async Task<IActionResult> TokenBased()
        {
            var test = "dsfdsfs";
            OrganizationDBContext db = new OrganizationDBContext();
            var list = await db.Users.ToListAsync(); ;
            return Unauthorized();
        }
        [HttpPost, Route("login")]
        public async Task<IActionResult> Login([FromBody]LoginModel user)
        {


            if (user.UserName == "aryan" && user.Password == "abc@123")
            {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("KeyForSignInSecret@1234"));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                var tokeOptions = new JwtSecurityToken(
                    issuer: user.UserName,
                    audience: "",
                    claims: new List<Claim>(),
                    expires: DateTime.Now.AddMinutes(20),
                    signingCredentials: signinCredentials
                );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);

                var identity = new ClaimsIdentity(new[] {
                    new Claim(ClaimTypes.Name, user.UserName)
                }, CookieAuthenticationDefaults.AuthenticationScheme);

                //identity.AddClaim(new Claim("email", ));
                var principal = new ClaimsPrincipal(identity);

                //await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal, new AuthenticationProperties
                //{
                //    IsPersistent = true,
                //    ExpiresUtc = DateTime.UtcNow.AddMinutes(20)
                //});

                return Ok(new { Token = tokenString });

            }
            else
            {
                return Unauthorized();
            }


        }

        public async Task Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            
        }


        // GET: api/Account/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Account
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Account/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
