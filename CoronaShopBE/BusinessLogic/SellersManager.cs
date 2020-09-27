using CoronaShopBE.Database;
using CoronaShopBE.Database.restdb_implementation;
using CoronaShopBE.Dto;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoronaShopBE.BusinessLogic
{
    public class SellersManager
    {
        //private readonly ILogger m_pLogger;
        public SellersManager()
        {
        }

        DatabaseAccess m_pDB = new DatabaseAccess();
        public bool handleNewSeller(Credentials credentials)
        {
            //TODO: check if user already exists
            //Console.WriteLine(credentials.ToString());
            //DatabaseInterface DB = new restDB();
            //m_pLogger.LogInformation(credentials.ToString());
            return true;
        }
    }
}
