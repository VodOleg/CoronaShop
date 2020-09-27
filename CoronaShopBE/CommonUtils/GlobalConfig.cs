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
        public static string databaseKey;
        public static int connectionTimeout;
        public static void Load(IConfiguration configuration)
        {
            databaseURL = configuration.GetValue<string>("databaseURL");
            databaseKey = configuration.GetValue<string>("databaseKey");
            logPath = configuration.GetValue<string>("logPath");
            connectionTimeout = configuration.GetValue<int>("connectionTimeout");
        }
    }
}
