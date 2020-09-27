using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoronaShopBE
{
    public static class GlobalConfig
    {
        public static string databaseURL;
        public static string logPath;
        public static void Load(IConfiguration configuration)
        {
            databaseURL = configuration.GetValue<string>("databaseURL");
            logPath = configuration.GetValue<string>("logPath");
        }
    }
}
