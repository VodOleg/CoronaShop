using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoronaShopBE
{
    public static class GlobalConfig
    {
        private static IConfiguration m_pConfig;
        public static string databaseURL = "";
        public static string logPath = "";
        public static string databaseKey = "";
        public static int connectionTimeout = 0;
        public static string databaseProvider = "";
        public static string databaseName = "";

        public static void Load(IConfiguration configuration)
        {
            m_pConfig = configuration;
            databaseProvider = configuration["database:provider"];
            databaseURL = configuration[$"database:databases:{databaseProvider}:databaseURL"];
            databaseKey = configuration[$"database:databases:{databaseProvider}:databaseKey"];
            databaseName = configuration[$"database:databases:{databaseProvider}:databaseName"];
            logPath = configuration.GetValue<string>("logPath");
            connectionTimeout = configuration.GetValue<int>("connectionTimeout");
        }

        public static string getValue(string key)
        {
            return m_pConfig[key];
        }
    }
}
