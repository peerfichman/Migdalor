using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using WebApplication1.MailService;
using Quartz;
using Quartz.Spi;
using WebApplication1.SchedualerService;

namespace WebApplication1
{
    
    public class Startup
    {
        private IScheduler _scheduler;
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            _scheduler = SchedualerConfigurations.ConfigureSchedualer();
        }
        public IConfiguration Configuration { get; }


        public void ConfigureServices(IServiceCollection services)
        {

            // Add JWT authentication
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = Configuration["Jwt:Issuer"],
                        ValidAudience = Configuration["Jwt:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Secret"]))
                    };
                });

            // Configure JWT authentication options
            // This includes specifying the token validation parameters, such as issuer, audience, and signing key
            // See Microsoft documentation for detailed configuration options
            //});

            services.AddMvc();
            services.AddControllers();
            services.AddRazorPages();

            // Add authorization policies
            services.AddAuthorization(options =>
            {
                options.AddPolicy("CreateUserPolicy", policy =>
                {
                    policy.RequireAuthenticatedUser(); // Require authenticated user
                    policy.RequireClaim("RoleName", "SuperAdmin"); // Allow only certain usernames
                });
            });

            services.AddSingleton(provider => _scheduler);

            // Add other services...

   
        }


        public void Configure(IApplicationBuilder app)
        {
            // Use authentication and authorization middleware
            app.UseAuthentication();
            app.UseAuthorization();

            // Configure routes, endpoints, etc.
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }


    }
}
