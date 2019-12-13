using AdminUI.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Owin.Security.OAuth;
using OAuth.AspNet.AuthServer;
using Owin;
using System;
using System.Text;
using TokenAuthenticationInWebAPI.Models;

namespace AdminUI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }




        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();

            //services.AddAuthentication().AddIdentityServerJwt();
            //services.AddAuthentication().AddCookie();


            // services.UseOAuthAuthorizationServer(options);
            //services.AddAuthentication("BasicAuthentication")
            //   .AddScheme<AuthenticationSchemeOptions, BasicAuthenticationHandler>("BasicAuthentication", null);



 services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options =>
{
    options.Authority = "https://localhost:44385/api/Account/token";
    options.Audience = "https://localhost:44385";
});




            //app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());

            services.AddDbContext<OrganizationDBContext>(option =>
            option.UseSqlServer("Data Source=DESKTOP-6DE6O1L\\SQLEXPRESS;Initial Catalog=OrganizationDB; User ID=sa; Password=Mechlin_123;"));
        
        // In production, the Angular files will be served from this directory
        services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
         
            //Token Generations
            //app.UseOAuthAuthorizationServer();
            //app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());
            app.UseAuthentication();
           app.UseAuthorization();

            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });
         
            //app.Run(async (context) =>
            //{
            //    if (await obj.ValidateClientAuth())
            //    {
            //    }
            //    else
            //    {
            //       new UnauthorizedAccessException();
            //    }
            //});

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
