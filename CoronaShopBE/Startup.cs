using System.IO;
using CoronaShopBE.BusinessLogic;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;

namespace CoronaShopBE
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            GlobalConfig.Load(configuration);
            Log.Start();
            CoronaShopService.Init();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();                
            }
            else
            {
                app.UseHsts();
            }

            app.UseFileServer(new FileServerOptions
            {
                FileProvider = new PhysicalFileProvider(
                    Path.Combine(Directory.GetCurrentDirectory(), "FrontEnd")
                    ),
                EnableDefaultFiles = true
            });
            app.UseHttpsRedirection();
            app.UseMvc();

            //var fileProvider = new PhysicalFileProvider(Configuration.GetValue<string>("FrontEndStaticPath"));
            //app.UseDefaultFiles(new DefaultFilesOptions()
            //{
            //    DefaultFileNames = new List<string>() { "index.html" },//or whatever your react app page is
            //    FileProvider = fileProvider
            //});
            //app.UseStaticFiles(new StaticFileOptions()
            //{
            //    FileProvider = fileProvider,
            //});
        }
    }
}
