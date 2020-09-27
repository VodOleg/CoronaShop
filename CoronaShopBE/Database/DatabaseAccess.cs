using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoronaShopBE.Dto;
using Microsoft.Extensions.Configuration;

namespace CoronaShopBE.Database.restdb_implementation
{
    public class DatabaseAccess : DatabaseInterface
    {
        private string m_sDatabaseUrl;
        public DatabaseAccess()
        {
            m_sDatabaseUrl = GlobalConfig.databaseURL;
            Console.WriteLine(m_sDatabaseUrl);
        }
        public bool AddNewSeller(Seller seller)
        {
            throw new NotImplementedException();
        }
    }
}
